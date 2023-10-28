import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const PUT = async (req: Request) => {
  const currentUser: any = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }

  const { id, deliveryStatus: delivery } = await req.json();

  const order = await prisma.order.update({
    where: { id },
    data: { delivery },
  });
  return NextResponse.json(order, { status: 200 });
};
