import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) => {
  const currentUser: any = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }
  try {
    const product = await prisma?.product.delete({
      where: { id: productId },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
