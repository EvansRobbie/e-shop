import Container from "@/components/Container";
import ListRating from "@/components/products/ListRating";
import ProductDetails from "@/components/products/ProductDetails";
import { singleProduct } from "@/data/singleProduct";
import React, { FC } from "react";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

const ProductId: FC<ProductIdProps> = ({ params: { productId } }) => {
  // console.log(productId);
  return (
    <div className="mt-8">
      <Container>
        <ProductDetails product={singleProduct} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <ListRating product={singleProduct} />
        </div>
      </Container>
    </div>
  );
};

export default ProductId;
