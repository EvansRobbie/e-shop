"use client";
import React, { FC } from "react";
import { CartProductType, SelectedImgType } from "./ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="uppercase font-semibold">color:</span>
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                cartProduct.selectedImg.color === img.color
                  ? "border-[1.5px]"
                  : " border-none"
              }`}
              onClick={() => handleColorSelect(img)}
            >
              <div
                style={{ backgroundColor: img.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
