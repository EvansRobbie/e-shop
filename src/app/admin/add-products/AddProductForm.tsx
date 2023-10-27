"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import CategoryInput from "@/components/input/CategoryInput";
import CustomCheckbox from "@/components/input/CustomCheckbox";
import Input from "@/components/input/Input";
import SelectColor from "@/components/input/SelectColor";
import TextArea from "@/components/input/TextArea";
import { Categories } from "@/data/Categories";
import { Colors } from "@/data/Colors";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};
const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductedCreated] = useState(false);
  const router = useRouter();
  // console.log("images", images);
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
      images: [],
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
  useEffect(() => {
    setCustomValue("images", images);
  }, [setCustomValue, images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductedCreated(false);
    }
  }, [isProductCreated, reset]);

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filterImages = prev.filter((item) => item.color !== value.color);
        return filterImages;
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // upload images to firebase
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Please select a category");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Please select atleast one image");
    }
    const handleImageUpload = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error Uploading image", error);
                  toast.error("Error Uploading image");
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image upload", error);
        toast.error("Error handling image upload");
      }
    };

    await handleImageUpload();
    const productData = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Created");
        setIsProductedCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Creating Product");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // console.log(productData);
  };
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
        id="description"
        label="Description"
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
        <div className="grid grid-cols-2 gap-3">
          {Colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading" : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
