import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";
import { envConfig } from "@/config/env";

export const useEstates = (estateId?: string) => {
  const [estate, setEstate] = useState<IEstate | null>(null);
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const getEstates = async (page: number) => {
    console.log(page);
    const url = qs.stringifyUrl({
      url: `${envConfig.base_url}/estates`,
      query: {
        page: page,
      },
    });
    try {
      setLoading(true);
      const res = await axios.get(url);
      console.log(res.data)
      setTotalPages(res.data.data.totalPages);
      setEstates(res.data.data.results);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (estates.length === 0) {
      getEstates(1);
    }
  }, []);

  const loadNext = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getEstates(nextPage);
    }
  };

  const loadPrev = () => {
    if (currentPage > 1 && !loading) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      getEstates(prevPage);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const getEstate = async (estateId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${envConfig.base_url}/estates/${estateId}`);
      setEstate(res.data.data);
    } catch (error: any) {
      toast.error("Error Fetching Product");
    } finally {
      setLoading(false);
    }
  };

  const deleteEstate = async (productId: string) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/estates/${productId}`);
      await getEstates(currentPage);
      toast.success("Product deleted sucessfully");
    } catch (error: any) {
      toast.error("Error Deleting Product");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (estateId) {
      getEstate(estateId);
    }
  }, [estateId]);

  return {
    estates,
    setEstates,
    loadNext,
    loadPrev,
    loading,
    hasNextPage,
    hasPrevPage,
    estate,
    isDeleting,
    deleteEstate,
  };
};
