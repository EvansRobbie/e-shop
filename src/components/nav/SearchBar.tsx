"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const urlSearch = useCallback((data: any) => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );
    return url;
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      return router.push("/");
    }

    router.push(urlSearch(data));
    reset;
    // console.log(data);
  };

  return (
    <div className="flex  items-center gap-">
      <input
        {...register("searchTerm")}
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] fcus:border-slate-500 w-80 "
        placeholder="Explore E~Shop"
        type="text"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-500 hover:opacity-80 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
