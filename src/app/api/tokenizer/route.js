import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const SERVER_KEY = process.env.NEXT_PUBLIC_SERVER_KEY;
// const url = process.env.MIDTRANS_API;

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: SERVER_KEY,
});

export async function POST(request) {
  const { id, name, price, quantity } = await request.json();

  console.log(id, name, price, quantity);

  let parameter = {
    item_details: [
      {
        name: name,
        price: price,
        quantity: quantity,
      },
    ],

    transaction_details: {
      order_id: id.trim(),
      gross_amount: price,
      // order_id: id,
      // gross_amount: price * quantity,
    },
  };

  const transaction = await snap
    .createTransaction(parameter)
    .then(async (response) => {
      return response;
    });

  return NextResponse.json(transaction);
}
