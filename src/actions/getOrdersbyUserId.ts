import prisma from "@/libs/prismadb";

export const getOrdersByUserId = async (userId: string) => {
  try {
    const order = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
      },
    });
    if (!order) return null;
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
};
