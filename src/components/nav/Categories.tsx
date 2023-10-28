"use client";
import React from "react";
import Container from "../Container";
import { Categories } from "@/data/Categories";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categorie = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) return null;
  return (
    <div className="bg-white w-full">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {/* <Categories /> */}
          {Categories.map((item, idx) => (
            <Category
              key={idx}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categorie;
