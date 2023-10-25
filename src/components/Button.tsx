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
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
