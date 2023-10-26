import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { headers } from "next/headers";

// npm i micro - read rawa data
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Stripe webhook invalid");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      const addressData = {
        city: charge.shipping.address.city,
        country: charge.shipping.address.country,
        line1: charge.shipping.address.line1,
        line2: charge.shipping.address.line2,
        postal_code: charge.shipping.address.postal_code,
      };
      if (typeof charge.payment_intent === "string") {
        await prisma.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "complete",
            address: addressData,
          },
        });
      }
      break;
    case "payment_intent.created":
      break;
    case "payment_intent.succeeded":
      const paymentIntent: any = event.data.object as Stripe.PaymentIntent;
      // console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        await prisma.order.update({
          where: { paymentIntentId: paymentIntent.id },
          data: {
            status: "complete",
            // address: paymentIntent.shipping?.address,
          },
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ recieved: true });
}
