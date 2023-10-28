import prisma from "@/libs/prismadb";
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err: any) {
    throw new Error(err);
  }
};
