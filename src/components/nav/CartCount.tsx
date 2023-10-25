"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  return (
    <Link href={"/cart"} className="relative">
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute -top-[10px] -right-[10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </Link>
  );
};

export default CartCount;
