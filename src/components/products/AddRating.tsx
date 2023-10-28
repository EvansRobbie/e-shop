"use client";
import { SafeUser } from "@/types/type";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import { Rating } from "@mui/material";
import Input from "../input/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product:
    | (Product & {
        reviews: Review[];
      })
    | any;
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null
    | any;
}

const AddRating: FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsloading(true);
    if (data.rating === 0) {
      setIsloading(false);
      return toast.error("No rating select");
    }
    const ratingData = { ...data, userId: user?.id, product: product };
    console.log(ratingData);
    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rate submitted");
        router.refresh();
        reset;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  if (!user || !product) return null;
  const deliveredOrder = user.orders.some(
    (order: any) =>
      order.products.find((item: any) => item.id === product) &&
      order.delivery === "delivered"
  );
  const userReview = product?.reviews.find(
    (review: Review) => review.userId === user.id
  );

  if (userReview || !deliveredOrder) return null;
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(e, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
