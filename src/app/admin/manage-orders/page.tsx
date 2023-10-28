import React from "react";
import ManageOrdersClient from "./ManageOrdersCllient";
import Container from "@/components/Container";
import { getOrders } from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
