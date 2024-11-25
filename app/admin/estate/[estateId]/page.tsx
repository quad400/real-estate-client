"use client";

import Image from "next/image";
import React from "react";
import { Naira } from "../../../../utils";
import Link from "next/link";
import { Edit } from "lucide-react";
import { useProducts } from "@/hooks/use-product";
import { Skeleton } from "@/components/ui/skeleton";



const Page = ({ params }: { params: { productId: string } }) => {
  const { product, loading } = useProducts(params.productId);

  if (!product && loading) {
    return (
      <div className="w-full">
        <div className="flex container flex-col justify-start space-y-2 items-start">
          <Skeleton className="h-[200px] w-[200px]" />
          <Skeleton className="h-[50px] w-[300px]" />
          <div className="flex space-x-4 items-center justify-between">
            <Skeleton className="h-[50px] w-[150px]" />
            <Skeleton className="h-[50px] w-[150px]" />
          </div>
          <Skeleton className="h-[150px] w-[300px]" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-3 justify-start items-start container">
      <div className="flex justify-end w-full items-start -mt-8">
        <Link
          href={`/admin/product/${product._id}/edit`}
          className="bg-primary-light/10 shadow-md text-center space-x-2 px-4 py-3 text-primary-dark hover:bg-white/90 flex rounded-xl font-medium transition-all"
        >
          <Edit className="text-primary-dark h-4 w-4" />
          <p className="text-primary-dark font-medium text-sm">
            Update Product
          </p>
        </Link>
      </div>
      <div className="relative w-[200px] h-[200px]">
        <Image
          src={product.image}
          alt="Product"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-xl font-bold text-neutral-800">{product.name}</h2>
      </div>
      <div className="flex space-x-3 justify-start items-start">
        <p className="text-neutral-800 font-normal text-sm">{product.size}</p>
        <p className="text-neutral-800 font-normal text-sm">
          {Naira.format(product.price)}
        </p>
      </div>
      <p className="text-sm font-normal text-neutral-700 max-w-2xl">
        {product.details}
      </p>
    </div>
  );
};

export default Page;
