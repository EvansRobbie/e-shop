import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser: any = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }
  const { name, price, description, brand, category, inStock, images } =
    await req.json();

  try {
    const product = await prisma?.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        brand,
        category,
        inStock,
        images,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", { status: 500 });
  }
};
