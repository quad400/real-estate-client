import { useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";
import { get } from "@/lib/endpoints";

export const useEstatesPages = (estateId?: string) => {
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [estate, setEstate] = useState<IEstate>();

  const getEstates = async (page: number) => {
    console.log(page);
    const url = qs.stringifyUrl({
      url: `estates`,
      query: {
        page: page,
      },
    });

    try {
      setLoading(true);
      const res = await get(url);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setEstates(res.data.items);
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
  }, [estates.length]);

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

      const res = await get(`estates/${estateId}`);
      return res.data;
    } catch (error: any) {
      toast.error("Error Fetching Product");
    } finally {
      setLoading(false);
    }
  };

  return {
    estates,
    setEstates,
    estate,
    setEstate,
    loadNext,
    loadPrev,
    loading,
    getEstate,
    hasNextPage,
    hasPrevPage,
  };
};
