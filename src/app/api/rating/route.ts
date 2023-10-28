import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { comment, rating, product, userId } = await req.json();

  const deliveredOrder = currentUser.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.delivery === "delivered"
  );
  const userReview = product?.reviews.find(
    (review: Review) => review.userId === currentUser.id
  );
  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }
  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });
  return NextResponse.json(review);
};
