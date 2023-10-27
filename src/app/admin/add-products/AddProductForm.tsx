"use client";
import Heading from "@/components/Heading";
import Input from "@/components/input/Input";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      image: [],
    },
  });
  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </>
  );
};

export default AddProductForm;
