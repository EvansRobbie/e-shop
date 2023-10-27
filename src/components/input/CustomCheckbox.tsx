import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        type="checkbox"
        className="cursor-pointer"
      />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
