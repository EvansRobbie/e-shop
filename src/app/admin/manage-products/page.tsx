import { getProducts } from "@/actions/getProducts";
import Container from "@/components/Container";
import React from "react";
import ManageProductsClient from "./ManageProductsClient";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
