import Container from "@/components/Container";
import ProductDetails from "@/components/products/ProductDetails";
import { singleProduct } from "@/data/singleProduct";
import React, { FC } from "react";

interface ProductIdProps {
  params: {
    productId: string;
  };
}

const ProductId: FC<ProductIdProps> = ({ params: { productId } }) => {
  console.log(productId);
  return (
    <div className="mt-8">
      <Container>
        <ProductDetails product={singleProduct} />
      </Container>
    </div>
  );
};

export default ProductId;
