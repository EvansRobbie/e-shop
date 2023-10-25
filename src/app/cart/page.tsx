import Container from "@/components/Container";
import CartClient from "@/components/cart/CartClient";
import React from "react";

const Cart = () => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  );
};

export default Cart;
