import { Metadata } from "next";
import React from "react";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "E~Shop Admin",
  description: "E~Shop Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
