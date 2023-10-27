import prisma from "@/libs/prismadb";

export const getOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
};
