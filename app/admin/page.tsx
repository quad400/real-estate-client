"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useProducts } from "@/hooks/use-product";
import { Naira } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Page = () => {
  const {
    hasNextPage,
    hasPrevPage,
    deleteProduct,
    loading,
    loadNext,
    loadPrev,
    products,
    isDeleting,
  } = useProducts();

  function handleDelete(productId: string) {
    deleteProduct(productId);
  }

  return (
    <div className="w-full container">
      <div className="flex justify-end w-full items-start -mt-10">
        <Link
          href="/admin/product/create"
          className="bg-primary-light/10 shadow-md text-center text-sm px-4 py-3 text-primary-dark hover:bg-white/90 flex rounded-xl space-x-2 transition-all"
        >
          <Plus className="text-primary-dark h-4 w-4" />
          <p className="text-primary-dark font-medium text-sm">Add Product</p>
        </Link>
      </div>
      <Table className="w-full border-collapse mt-2 mb-5 border rounded-2xl">
        <TableHeader className="bg-neutral-200 w-full rounded-t-3xl">
          <TableRow>
            <TableHead className="">Product(s)</TableHead>
            <TableHead className="">Size</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className=""></TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading &&
            products.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link
                    href={`/admin/product/${item._id}`}
                    className="flex flex-col md:flex-row justify-start space-x-1 items-start flex-1"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={60}
                      width={60}
                      className="rounded-2xl object-cover aspect-square"
                    />

                    <h3 className="text-primary-dark uppercase text-xs sm:text-sm  font-semibold">
                      {item.name}
                    </h3>
                  </Link>
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{Naira.format(item.price)}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/product/${item._id}/edit`}
                    className="bg-primary h-8 w-8 rounded-full flex justify-center items-center"
                  >
                    <Edit className="text-white h-4 w-4" />
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-rose-200 h-8 w-8 rounded-full flex justify-center items-center"
                  >
                    <Trash className="h-4 w-4 text-rose-700" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableBody>
          {loading &&
            !isDeleting &&
            [1, 2].map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton className="h-20 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {products.length > 0 && (
        <div className="mt-4 mb-8 w-full justify-center items-center flex">
          <Pagination>
            <PaginationContent className="max-w-2xl flex justify-between items-center space-x-8">
              <PaginationItem>
                <PaginationPrevious
                  onClick={loadPrev}
                  disabled={!hasPrevPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={loadNext} disabled={!hasNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {products.length === 0 && (
        <div className="flex w-full justify-center items-center mt-8">
          <p className="text-base sm:text-lg font-semibold text-neutral-800 text-center">
            No product in this dashboard
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
