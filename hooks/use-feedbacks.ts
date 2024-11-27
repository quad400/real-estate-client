import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IFeedbacks } from "@/lib/interfaces/estate";
import { get, post } from "@/lib/endpoints";

export const useFeedbacks = (estateId: string) => {
  const [feedbacks, setFeedbacks] = useState<IFeedbacks[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getFeedbacks = useCallback(async (page: number) => {
    const url = qs.stringifyUrl({
      url: `estates/${estateId}/feedbacks`,
      query: {
        page: page,
        limit: 3,
      },
    });

    try {
      setLoading(true);
      const res = await get(url);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setFeedbacks(res.data.items);
      
    } catch (error: any) {
      toast.error("Error fetching feedbacks");
    } finally {
      setLoading(false);
    }
  }, [feedbacks]);

  
  useEffect(() => {
    if (estateId) {
      getFeedbacks(1);
    }
  }, [estateId]);


  const loadNext = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getFeedbacks(nextPage);
    }
  };

  const loadPrev = () => {
    if (currentPage > 1 && !loading) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      getFeedbacks(prevPage);
    }
  };

  const newFeedback = async (estatteId: string, values: any) => {
    await post(`/estates/${estateId}/feedbacks`, values);
    await getFeedbacks(1);
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    loadNext,
    loadPrev,
    getFeedbacks,
    newFeedback,
    loading,
    hasNextPage,
    hasPrevPage,
    feedbacks,
  };
};
