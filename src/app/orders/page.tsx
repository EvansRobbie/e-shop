import React from "react";
import Container from "@/components/Container";
import { getOrders } from "@/actions/getOrders";
import OrdersClient from "./OrdersClient";
import { getOrdersByUserId } from "@/actions/getOrdersbyUserId";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Orders = async () => {
  const currentUser: any = await getCurrentUser();

  const orders = await getOrdersByUserId(currentUser?.id);

  return (
    <div className="pt-8">
      <Container>{orders && <OrdersClient orders={orders} />}</Container>
    </div>
  );
};

export default Orders;
