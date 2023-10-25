import { CartProductType } from "@/components/products/ProductDetails";
import React, { createContext, useCallback, useContext, useState } from "react";

interface CartContextProps {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
}
interface Props {
  [propName: string]: any;
}
export const CartContext = createContext({} as CartContextProps);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const handleAddToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      return updatedCart;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{ cartTotalQty, cartProducts, handleAddToCart }}
      {...props}
    />
  );
};

export const useCart = () => useContext(CartContext);
