"use client";
import { Order, Product, User } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import Heading from "../Heading";
import { formatPrice } from "@/data/formatPrice";
import { formatNumbers } from "@/data/formatNumbers";

interface SummaryProps {
  orders: Order[];
  users: User[];
  products: Product[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: FC<SummaryProps> = ({ orders, products, users }) => {
  const [summarydata, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sales",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unPaidOrders: {
      label: "Unpaid orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc;
      }, 0);
      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });
      const unPaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });
      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unPaidOrders.digit = unPaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;
      return tempData;
    });
  }, [orders, products, users]);

  const sumaryDataKeys = Object.keys(summarydata);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" />
      </div>
      <div className=" grid grid-cols-2 gap-3  overflow-y-auto">
        {sumaryDataKeys &&
          sumaryDataKeys.map((key) => {
            return (
              <div
                key={key}
                className=" rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summarydata[key].label === "Total sales" ? (
                    <>{formatPrice(summarydata[key].digit)}</>
                  ) : (
                    <>{formatNumbers(summarydata[key].digit)}</>
                  )}
                </div>
                <div>{summarydata[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
