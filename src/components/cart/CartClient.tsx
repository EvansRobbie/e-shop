"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../Heading";
import Image from "next/image";
import Button from "../Button";
import CartItem from "./CartItem";
import { formatPrice } from "@/data/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, totalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className=" text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts?.map((product) => (
          <CartItem key={product.id} item={product} />
        ))}
      </div>
      <div className="border-t-[1.5px] border-s-slate-200 py-4 flex justify-between gap-4">
        <div className="max-w-max">
          <Button
            label="Clear Cart"
            small
            outline
            onClick={() => handleClearCart()}
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>SubTotal</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping calculated at Checkout
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <Link
            href={"/"}
            className=" text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
