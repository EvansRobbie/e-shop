"use client";
import Heading from "@/components/Heading";
import CategoryInput from "@/components/input/CategoryInput";
import CustomCheckbox from "@/components/input/CustomCheckbox";
import Input from "@/components/input/Input";
import TextArea from "@/components/input/TextArea";
import { Categories } from "@/data/Categories";
import React, { useCallback, useState } from "react";
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
  const category = watch("category");
  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );
  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This Product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3  max-h-[50vh] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span w-full justify-center">
                <CategoryInput
                  onClick={(e) => setCustomValue("category", e)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4 ">
        <div className="">
          <div className="font-bold">
            Select Available product colors and upload their images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default AddProductForm;
