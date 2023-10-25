import { CartProductType } from "@/components/products/ProductDetails";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

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
      toast.success("Product Added to Cart");
      localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCart");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartTotalQty, cartProducts, handleAddToCart }}
      {...props}
    />
  );
};

export const useCart = () => useContext(CartContext);
