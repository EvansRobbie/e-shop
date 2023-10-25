"use client";
import { formatPrice } from "@/data/formatPrice";
import { truncateText } from "@/data/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface ProductCardProps {
  data: any;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const productRating =
    data.reviews.reduce(
      (accu: number, item: { rating: number }) => item.rating + accu,
      0
    ) / data.reviews.length;
  return (
    <Link
      href={`/product/${data.id}`}
      className="cols-span-1 cursor-pointer border-[1.2px] border-slate-200
     bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
