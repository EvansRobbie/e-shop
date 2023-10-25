import React, { FC } from "react";

interface BackDropProps {
  onClick: () => void;
}
const BackDrop: FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-slate-200 opacity-50 w-screen h-screen fixed inset-0"
    />
  );
};

export default BackDrop;
