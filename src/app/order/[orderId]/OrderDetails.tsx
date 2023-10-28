"use client";
import Heading from "@/components/Heading";
import Status from "@/components/Status";
import { formatPrice } from "@/data/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetaislProps {
  order: Order;
}

const OrderDetails: FC<OrderDetaislProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>ORDER ID: {order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order.delivery === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.delivery === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.delivery === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Payment Status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdAt).fromNow()}</div>
      <div>
        <h2 className="font-medium">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">Total</div>
        </div>
        {order.products &&
          order.products.map((product) => (
            <OrderItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default OrderDetails;
