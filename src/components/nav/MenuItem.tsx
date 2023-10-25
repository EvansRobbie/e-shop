import React, { FC, ReactNode } from "react";
interface MenuItemProp {
  children: ReactNode;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProp> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-neutral-100 px-4 py-3 transition "
    >
      {children}
    </div>
  );
};

export default MenuItem;
