import { getGraphData } from "@/actions/getGraphData";
import { getOrders } from "@/actions/getOrders";
import { getProducts } from "@/actions/getProducts";
import { getUsers } from "@/actions/getUsers";
import BarGraph from "@/components/admin/BarGraph";
import Summary from "@/components/admin/Summary";
import React from "react";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const users = await getUsers();
  const orders = await getOrders();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Summary products={products} orders={orders} users={users} />
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph data={graphData} />
      </div>
    </div>
  );
};

export default Admin;
