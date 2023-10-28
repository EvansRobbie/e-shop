"use client";
import React, { FC } from "react";
import Heading from "../Heading";
import moment from "moment";
import { Rating } from "@mui/material";
import Avatar from "./Avatar";

interface ListProps {
  product: any;
}

const ListRating: FC<ListProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product review" />
      <div className="text-sm mt-2">
        {product.reviews
          ? product.reviews.map((review: any) => (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex items-center gap-2">
                  <Avatar src={review.user.image} user={review.user.name} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div>{moment(review.createdDate).fromNow()}</div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="my-4" />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ListRating;
