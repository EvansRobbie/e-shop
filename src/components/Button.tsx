"use client";
import React, { FC, MouseEvent } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  label,
  disabled,
  icon: Icon,
  onClick,
  outline,
  small,
  custom,
}) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2
       ${
         outline
           ? "bg-white text-slate-700 border-2"
           : "bg-slate-700 text-white"
       }
        ${
          small
            ? "text-sm py-1 px-2 font-light border-2"
            : "text-base font-semibold py-3 px-4"
        }
        ${custom ? custom : ""}`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
