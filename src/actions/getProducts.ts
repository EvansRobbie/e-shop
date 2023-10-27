import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
  page?: number;
}

export const getProducts = async (params: IProductParams) => {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }
    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
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
    return products;
  } catch (err: any) {
    throw new Error(err);
  }
};
