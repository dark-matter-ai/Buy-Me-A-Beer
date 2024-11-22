import { ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { sendDonationEmail } from "@/app/utils/emailService";
import { getUserData } from "@/app/firebase/store";
import { updateDoc, doc, arrayUnion } from "firebase/firestore"; // Added missing imports
import { db } from "@/app/firebase/config";

export const GET = async (req, { params }) => {
  const { userid } = params; // Removed unnecessary await

  const { userData, error } = await getUserData(userid);

  if (!userData || error) {
    return Response.json(
      { error: "User data not found" },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }

  const payload = {
    icon:
      userData.profileImage ||
      "https://ryuzen6.github.io/assets/img/profile-img.jpg",
    label: `Buy ${userData.name} a beer`,
    description: `Buy ${userData.name} a beer with SOL using this power of blinks`,
    title: `${userData.name} - Buy Me A Beer`,
    links: {
      actions: [
        {
          label: "Send Beer",
          href: `/api/actions/${userid}?name={name}&message={message}&amount={amount}&customAmount={CustomAmount}`,
          parameters: [
            {
              type: "text",
              name: "name",
              label: "Enter your name or @social",
              required: true,
            },
            {
              type: "text",
              name: "message",
              label: "Say something nice",
              required: true,
            },
            {
              type: "select",
              name: "amount",
              label: "Select amount to donate",
              options: [
                { label: "1 Beer  (0.01 SOL)", value: "0.01" },
                { label: "5 Beer  (0.05 SOL)", value: "0.05" },
                { label: "10 Beer (0.1 SOL)", value: "0.1" },
              ],
              required: false,
            },
            {
              type: "text",
              name: "CustomAmount",
              label: "Or enter custom amount (SOL)",
              required: false,
            },
          ],
          type: "transaction",
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req, { params }) => {
  try {
    const { userid } = params;

    const { userData, error } = await getUserData(userid);

    if (!userData || error) {
      throw new Error("User data not found");
    }

    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const message = url.searchParams.get("message");
    const amount =
      url.searchParams.get("amount") || url.searchParams.get("customAmount");

    if (!amount) {
      throw new Error("Amount is required");
    }

    const body = await req.json();
    let account;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw new Error("Invalid 'account' provided. It's not a real pubkey");
    }

    const connection = new Connection(clusterApiUrl("devnet"));
    const TO_PUBKEY = new PublicKey(userData.walletAddress);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        toPubkey: TO_PUBKEY,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    // Send email
    if (userData.email) {
      await sendDonationEmail(userData.email, amount, name, message);
    }

    // Update Firestore with new supporter
    if (userid) {
      const userRef = doc(db, "users", userid);
      await updateDoc(userRef, {
        supporters: arrayUnion({
          name,
          beers: parseFloat(amount).toFixed(2),
          timestamp: new Date().toISOString(),
        }),
      });
    }

    const thankYouMessage = name
      ? `Thanks for the beer, ${name}!`
      : "Thanks for the beer!";

    const payload = await createPostResponse({
      fields: {
        transaction,
        message: thankYouMessage,
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.error("Error in POST:", err);
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    return Response.json(
      { message },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
