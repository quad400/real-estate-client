import React from "react";
import { ArrowDown, Plus, Star } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";
import { useFeedbacks } from "@/hooks/use-feedbacks";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { dateHandler } from "@/utils";
import { Skeleton } from "./ui/skeleton";

const Feedback = ({ estateId }: { estateId: string }) => {
  const { onOpen } = useModal();
  const { isSignedIn } = useAuth();

  const {
    feedbacks,
    hasNextPage,
    hasPrevPage,
    loadNext,
    loadPrev,
    loading: feedbackLoading,
  } = useFeedbacks(estateId);

  return (
    <div className="container mt-8">
      <div className="mt-4">
        <div className="my-3 flex justify-between items-center">
          <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
            Feedbacks
          </h2>

          <Link
            href={!isSignedIn ? "/auth/sign-in" : ""}
            onClick={() => isSignedIn && onOpen("feedback", { data: estateId })}
            className="justify-center items-center gap-2 p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 flex shadow"
          >
            <span className="text-neutral-800 font-medium text-sm hidden md:flex">
              New Feedbak
            </span>
            <Plus className="h-6 w-6 text-neutral-800" />
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {!feedbackLoading &&
            feedbacks.length > 0 &&
            feedbacks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 bg-neutral-100/30 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="https://utfs.io/f/N577hwiKq71cA2WD1YSdZ9UWvDXBNSOCuz3lieE4M7Yykr81"
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-sm md:text-lg font-semibold text-neutral-800">
                        {item.user.name}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-500">
                        {dateHandler(item.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star
                      className="text-[#f2dd1d] h-5 w-5"
                      fill="#f2dd1d"
                      stroke="currentColor"
                    />
                    <span className="text-sm font-medium text-neutral-800">
                      {item.rate}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-neutral-800">
                  {item.comment}
                </p>
              </div>
            ))}
        </div>
        {feedbackLoading && (
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 justify-between items-center">
              <div className="flex space-x-2 justify-start items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-40" />
              </div>
              <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {feedbacks.length > 0 && (
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
      </div>
    </div>
  );
};

export default Feedback;
