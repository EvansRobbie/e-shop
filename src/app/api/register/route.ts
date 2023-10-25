import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma?.user.create({
    data: { name, email, hashedPassword },
  });

  return NextResponse.json(user);
};
