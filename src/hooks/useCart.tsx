import { CartProductType } from "@/components/products/ProductDetails";
import { truncateText } from "@/data/truncateText";
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
  totalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
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
  const [totalAmount, setTotalAmount] = useState(0);
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

  const handleRemoveFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProduct);
        toast.success(`${truncateText(product.name)} Removed from Cart`);
        localStorage.setItem("eShopCart", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts]
  );

  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.qty === 1) {
        return toast.error("Oops! minimum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex !== -1) {
          updatedCart[existingIndex].qty = updatedCart[existingIndex].qty! - 1;
          setCartProducts(updatedCart);
          localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
        }
      }
    },
    [setCartProducts, cartProducts]
  );

  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.qty === 20) {
        return toast.error("Oops! Maximam reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex !== -1) {
          updatedCart[existingIndex].qty = updatedCart[existingIndex].qty! + 1;
          setCartProducts(updatedCart);
          localStorage.setItem("eShopCart", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("eShopCart");
  }, [setCartProducts, setCartTotalQty]);
  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCart");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item: CartProductType) => {
            const itemTotal = item.price * item.qty!;
            acc.total += itemTotal;
            acc.qty += item.qty!;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);
  return (
    <CartContext.Provider
      value={{
        cartTotalQty,
        totalAmount,
        cartProducts,
        handleAddToCart,
        handleRemoveFromCart,
        handleQtyDecrease,
        handleQtyIncrease,
        handleClearCart,
      }}
      {...props}
    />
  );
};

export const useCart = () => useContext(CartContext);
