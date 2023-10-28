import { formatPrice } from "@/data/formatPrice";
import { truncateText } from "@/data/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
interface OrderItemProps {
  product: CartProductType;
}
const OrderItem: FC<OrderItemProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200  py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            fill
            priority
            src={product.selectedImg.image}
            alt={product.name}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(product.name)}</div>
          <div>{product.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">{product.qty}</div>
      <div className="justify-self-end">
        {formatPrice(product.price * product.qty)}
      </div>
      <div></div>
    </div>
  );
};

export default OrderItem;
