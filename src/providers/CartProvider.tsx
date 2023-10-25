"use client";
import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
