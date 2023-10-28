"use client";
import ActionBtn from "@/components/ActionBtn";
import Heading from "@/components/Heading";
import Status from "@/components/Status";
import { formatPrice } from "@/data/formatPrice";
import firebaseApp from "@/libs/firebase";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: FC<ManageProductsClientProps> = ({ products }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.image,
        // description: product.description,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock ? (
              <Status
                text="In stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
              isLoading={isLoading}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.image)}
            />
            <ActionBtn icon={MdRemoveRedEye} onClick={() => {}} />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      setIsLoading(true);
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          toast.success("Product status changed");
          router.refresh();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("OOps! Something went wrong");
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Deleting product, please wait..");

      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
              console.log("image deleted", item.image);
            }
          }
        } catch (err) {
          return console.log("Deleting Image error", err);
        }
      };
      await handleImageDelete();
      axios
        .delete(`/api/delete/${id}`)
        .then((res) => {
          toast.success("Product deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Failed to delete");
          console.log(err);
        });
    },
    [storage, router]
  );
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
