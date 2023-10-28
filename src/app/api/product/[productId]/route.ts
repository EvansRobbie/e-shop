import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const DELETE = async (
  { params: { productId } }: { params: { productId: string } },
  request: Request
) => {
  const currentUser: any = await getCurrentUser();

  if (!currentUser || currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }

  const product = await prisma?.product.delete({
    where: { id: productId },
  });
  return NextResponse.json(product, { status: 200 });
};
