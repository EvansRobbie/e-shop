import React from "react";

const HomeBanner = () => {
  return (
    <div className=" relative bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-700">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div>
          <h1>Summer Sale</h1>
          <p>Enjoy discounts on selected items</p>
          <p>GET 50% OFF</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomeBanner;
