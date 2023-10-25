import React, { FC } from "react";
import { CartProductType } from "./ProductDetails";
interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded cursor-pointer";

const SetQuantity: FC<SetQtyProps> = ({
  cartProduct,
  cartCounter,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : (
        <div className="uppercase font-semibold">quantity:</div>
      )}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyles} onClick={handleQtyDecrease}>
          -
        </button>
        <div>{cartProduct.qty}</div>
        <div className={btnStyles} onClick={handleQtyIncrease}>
          +
        </div>
      </div>
    </div>
  );
};

export default SetQuantity;
