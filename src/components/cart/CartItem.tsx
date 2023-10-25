"use client";
import React, { FC } from "react";
import { CartProductType } from "../products/ProductDetails";
import { formatPrice } from "@/data/formatPrice";
import Link from "next/link";
import { truncateText } from "@/data/truncateText";
import Image from "next/image";
import SetQuantity from "../products/SetQuantity";
import { useCart } from "@/hooks/useCart";
interface ItemProp {
  item: CartProductType;
}

const CartItem: FC<ItemProp> = ({ item }) => {
  const { handleRemoveFromCart, handleQtyDecrease, handleQtyIncrease } =
    useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200  py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              fill
              priority
              src={item.selectedImg.image}
              alt={item.name}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="text-slate-500 underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyDecrease={() => handleQtyDecrease(item)}
          handleQtyIncrease={() => handleQtyIncrease(item)}
        />
      </div>
      <div className=" justify-self-end">
        {formatPrice(item.price * item.qty!)}
      </div>
    </div>
  );
};

export default CartItem;
