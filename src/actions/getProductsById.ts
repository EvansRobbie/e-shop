import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export const getProductsById = async (params: IParams) => {
  const { productId } = params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!product) return null;
    return product;
  } catch (err: any) {
    throw new Error(err);
  }
};
