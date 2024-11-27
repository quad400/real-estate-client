import { useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";
import { deleteMethod, get } from "@/lib/endpoints";

export const useEstates = (estateId?: string) => {
  const [estate, setEstate] = useState<IEstate | null>(null);
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getEstates = async (page: number) => {
    const url = qs.stringifyUrl({
      url: `estates/user/my-estates`,
      query: {
        page: page,
        limit: 10
      },
    });
    
    try {
      setLoading(true);
      const res = await get(url);
      console.log(res)
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
      console.log(res);
      setEstate(res.data);
    } catch (error: any) {
      toast.error("Error Fetching Product");
    } finally {
      setLoading(false);
    }
  };

  const deleteEstate = async (estateId: string) => {
    try {
      setIsDeleting(true);
      await deleteMethod(`estates/${estateId}`);
      await getEstates(currentPage);
      toast.success("Estate deleted sucessfully");
    } catch (error: any) {
      toast.error("Error Deleting Estate");
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
