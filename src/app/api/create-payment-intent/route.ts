import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { CartProductType } from "@/components/products/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.qty!;
    return acc + itemTotal;
  }, 0);

  return totalPrice;
};

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    delivery: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
    // address: {
    //   city: "",
    //   country: "",
    //   line1: "",
    //   line2: "",
    //   postal_code: "",
    // },
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      //update order
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: {
            paymentIntentId: payment_intent_id,
          },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid payment Intent" },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    // console.log(paymentIntent);
    //create order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json(paymentIntent);
  }
};
