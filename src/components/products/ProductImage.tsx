"use client";
import React, { FC } from "react";
import { CartProductType, SelectedImgType } from "./ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div
        className="flex flex-col items-center justify-center gap-4 cursor-pointer border 
      h-full  max-h-[500px] min-h-[300px] sm:min-h-[400px]"
      >
        {product.image.map((img: SelectedImgType, idx: number) => (
          <div
            key={idx}
            className={`relative w-[80%] aspect-square border-teal-300 ${
              cartProduct.selectedImg.color === img.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
            onClick={() => handleColorSelect(img)}
          >
            <Image
              src={img.image}
              alt={img.color}
              fill
              priority
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          fill
          priority
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
