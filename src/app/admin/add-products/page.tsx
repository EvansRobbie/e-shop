import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import React from "react";
import AddProductForm from "./AddProductForm";

const AddProducts = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
