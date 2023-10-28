import Container from "@/components/Container";
import ListRating from "@/components/products/ListRating";
import ProductDetails from "@/components/products/ProductDetails";
import { products } from "@/data/Product";
import { singleProduct } from "@/data/singleProduct";
import React, { FC } from "react";
import OrderDetails from "./OrderDetails";
import { getOrderById } from "@/actions/getOrderById";

interface OrderIdProps {
  params: {
    orderId: string;
  };
}

const OrderId: FC<OrderIdProps> = async ({ params: { orderId } }) => {
  // console.log(productId);
  const order = await getOrderById({ orderId });

  if (!order)
    return <div className=" text-base font-bold items-center"> No Orders</div>;
  return (
    <div className="mt-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default OrderId;
