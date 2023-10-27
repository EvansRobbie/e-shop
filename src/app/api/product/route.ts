import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser: any = await getCurrentUser();

  if (currentUser || currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }
  const { name, price, description, brand, category, inStock, image } =
    await req.json();

  const product = await prisma?.product.create({
    data: {
      name,
      price: parseFloat(price),
      description,
      brand,
      category,
      inStock,
      image,
    },
  });

  return NextResponse.json(product);
};
