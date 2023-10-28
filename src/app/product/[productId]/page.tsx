import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProductsById } from "@/actions/getProductsById";
import Container from "@/components/Container";
import AddRating from "@/components/products/AddRating";
import ListRating from "@/components/products/ListRating";
import ProductDetails from "@/components/products/ProductDetails";
import React, { FC } from "react";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

const ProductId: FC<ProductIdProps> = async ({ params: { productId } }) => {
  // console.log(productId);
  const product = await getProductsById({ productId });
  const user = await getCurrentUser();
  return (
    <div className="mt-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductId;
