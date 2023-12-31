"use client";
import { Rating } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "../Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";

interface ProductDetailProp {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  qty?: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: FC<ProductDetailProp> = ({ product }) => {
  const { handleAddToCart, cartProducts } = useCart();
  const [inCart, setIncart] = useState(false);
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.image[0] },
    qty: 1,
    price: product.price,
  });
  useEffect(() => {
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex !== -1) {
        setIncart(true);
      }
    }
  }, [cartProducts, product]);
  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [setCartProduct]
  );
  const productRating =
    product.reviews.reduce(
      (accu: number, item: { rating: number }) => item.rating + accu,
      0
    ) / product.reviews.length;

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.qty === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, qty: prev.qty - 1 };
    });
  }, [setCartProduct, cartProduct.qty]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.qty === 20) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, qty: prev.qty + 1 };
    });
  }, [setCartProduct, cartProduct.qty]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        {/* Derails */}
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold uppercase">category:</span>{" "}
          {product.category}
        </div>
        <div>
          <span className="font-semibold uppercase">brand:</span>{" "}
          {product.brand}
        </div>
        <div
          className={`${product.inStock ? "text-teal-400" : "text-red-400"}`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {inCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product Added to Cart</span>
            </p>
            <Link href="/cart" className="max-w-[300px]">
              <Button label="View Cart" outline />
            </Link>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.image}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <div className="mt-4 max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
