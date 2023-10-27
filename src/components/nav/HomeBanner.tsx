import Image from "next/image";
import React from "react";

const HomeBanner = () => {
  return (
    <div className=" relative bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-700 mb-6">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 ">
            Summer <span className="text-red-500">Sale</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-2">
            Enjoy discounts on selected items
          </p>
          <p className="text-yellow-500 text-2xl md:text-5xl font-bold">
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src={"/banner-image.png"}
            alt="Banner Image"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
