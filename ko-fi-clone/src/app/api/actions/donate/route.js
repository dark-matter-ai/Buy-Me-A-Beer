import { ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const GET = async (req) => {
  const payload = {
    icon: new URL(
      "https://ryuzen6.github.io/assets/img/profile-img.jpg",
      new URL(req.url).origin
    ).toString(),
    label: "Buy me a coffee",
    description:
      "Buy me a coffee with SOL using this super sweet blink of mine :)",
    title: "Nick Frostbutter - Buy Me a Coffee",
    links: {
      actions: [
        {
          label: "Send Beer",
          href: `/api/actions/donate?name={name}&message={message}&amount={amount}&customAmount={CustomAmount}`,
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

export const POST = async (req) => {
  try {
    const url = new URL(req.url);

    const name = url.searchParams.get("name");
    const message = url.searchParams.get("message");
    const urlAmount = url.searchParams.get("amount");
    const customAmount = url.searchParams.get("customAmount");
    console.log("Name:", name);
    console.log("Message:", message);
    console.log("Amount:", urlAmount);
    console.log("Custom Amount:", customAmount);
    const amount = urlAmount ? urlAmount : customAmount;

    const body = await req.json();
    let account;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw "Invalid 'account' provided. Its not a real pubkey";
    }

    const connection = new Connection(clusterApiUrl("devnet"));
    const TO_PUBKEY = new PublicKey(
      "CdgrRt3cvWok5t1ewt4VGFvwYxhRvbbz4frh9bskiEds"
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        toPubkey: TO_PUBKEY,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const thankYouMessage = name
      ? `Thanks for the coffee, ${name}!`
      : "Thanks for the coffee!";

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
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return Response.json(
      {
        message,
      },
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
