import { ACTIONS_CORS_HEADERS } from "@solana/actions";

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export async function GET(request) {
  try {
    const reqBody = {
      icon: new URL("/blue_girl.gif", new URL(request.url).origin).toString(),
      description: "Buy Charles a beer with SOL using the power of Blinks!",
      title: "BUY CHARLES A BEER",
      label: "Send Beer",
      links: {
        actions: [
          {
            label: "Send Beer",
            href: "/api/action",
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
                name: "customAmount",
                label: "Or enter custom amount (SOL)",
                required: false,
              },
            ],
            type: "transaction",
          },
        ],
      },
    };
    return Response.json(reqBody, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const userPubKey = reqBody.account;

    if (!userPubKey) {
      throw new Error("User public key is required");
    }

    const url = new URL(request.url);
    const name = url.searchParams.get("name") ?? "Anonymous";
    const message = url.searchParams.get("message") ?? "";
    const selectedAmount = url.searchParams.get("amount");
    const customAmount = url.searchParams.get("customAmount");

    // Calculate donation amount in SOL
    let donationAmount = 0;
    if (customAmount && !isNaN(parseFloat(customAmount))) {
      donationAmount = parseFloat(customAmount);
    } else if (selectedAmount) {
      donationAmount = parseFloat(selectedAmount);
    }

    // Convert SOL to lamports
    const lamports = donationAmount * LAMPORTS_PER_SOL;

    const user = new PublicKey(userPubKey);
    const connection = new Connection(clusterApiUrl("devnet"));

    const ix = SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: new PublicKey("CdgrRt3cvWok5t1ewt4VGFvwYxhRvbbz4frh9bskiEds"), // Replace with your public key
      lamports,
    });

    const tx = new Transaction();
    tx.add(ix);
    tx.feePayer = user;

    const { blockhash } = await connection.getLatestBlockhash({
      commitment: "finalized",
    });

    tx.recentBlockhash = blockhash;

    const serialTX = tx
      .serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      })
      .toString("base64");

    const response = {
      transaction: serialTX,
      message: `Thanks for the donation, ${name}!`,
    };

    return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error processing transaction:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process transaction",
      },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
