import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";

export const useEstates = (estateId?: string) => {
  const [product, setProduct] = useState<IEstate | null>(null);
  const [products, setProducts] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const getProducts = async (page: number) => {
    console.log(page);
    const url = qs.stringifyUrl({
      url: "/api/products",
      query: {
        page: page,
      },
    });
    try {
      setLoading(true);
      const res = await axios.get(url);
      setTotalPages(res.data.data.totalPages);
      setProducts(res.data.data.results);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts(1);
    }
  }, []);

  const loadNext = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getProducts(nextPage);
    }
  };

  const loadPrev = () => {
    if (currentPage > 1 && !loading) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      getProducts(prevPage);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const getProduct = async (productId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data.data);
    } catch (error: any) {
      toast.error("Error Fetching Product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/products/${productId}`);
      await getProducts(currentPage);
      toast.success("Product deleted sucessfully");
    } catch (error: any) {
      toast.error("Error Deleting Product");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (estateId) {
      getProduct(estateId);
    }
  }, [estateId]);

  return {
    products,
    setProducts,
    loadNext,
    loadPrev,
    loading,
    hasNextPage,
    hasPrevPage,
    product,
    isDeleting,
    deleteProduct,
  };
};
