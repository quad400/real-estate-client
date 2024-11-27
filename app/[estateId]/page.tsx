"use client";

import React, { useEffect } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowDown, Plus, Star } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useEstatesPages } from "@/hooks/use-estates";
import { IEstate } from "@/lib/interfaces/estate";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/hooks/use-modal-store";
import { useAuth } from "@clerk/nextjs";
import { dateHandler, Naira } from "@/utils";
import { useFeedbacks } from "@/hooks/use-feedbacks";
import EstateCard from "@/components/estate-card";

const Page = ({ params }: { params: { estateId: string } }) => {
  const { getEstate, loading, estates } = useEstatesPages();
  const { onOpen } = useModal();
  const [estate, setEstate] = React.useState<IEstate>();
  const { isSignedIn } = useAuth();

  const {
    feedbacks,
    hasNextPage,
    hasPrevPage,
    loadNext,
    loadPrev,
    loading: feedbackLoading,
  } = useFeedbacks(params.estateId);

  useEffect(() => {
    (async () => {
      const house = await getEstate(params.estateId);
      console.log(house)
      setEstate(house);
    })();
  }, [params.estateId]);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full h-full py-[75px]">
      {!loading && estate ? (
        <>
          <div className="w-full">
            <Carousel
              setApi={setApi}
              className="w-full group"
              plugins={[
                Autoplay({
                  delay: 7000,
                }),
              ]}
            >
              <CarouselContent className="w-full">
                {estate?.images.map((image, index) => (
                  <CarouselItem className="w-full">
                    <div className="relative w-full h-[300px] md:h-[500px] lg:[600px]">
                      <Image
                        src={image}
                        alt={`${index}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-1/3 w-full max-sm:hidden max-sm:group-hover:hidden group-hover:flex hidden transition-all duration-300 ease-in">
                <div className="flex  justify-between items-center w-full mx-10">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>
              <div className="absolute bottom-0 w-full justify-center items-start flex py-4 px-6 bg-neutral-800/30">
                {Array.from({ length: estate?.images.length || 1 }).map(
                  (_, index) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-3 h-2 ring-1 ring-neutral-200 transition-all ease-linear duration-700 rounded-full mx-1",
                          index === current - 1 &&
                            "bg-neutral-200 w-8 rounded-lg"
                        )}
                      />
                    );
                  }
                )}
              </div>
            </Carousel>
          </div>
          <div className="w-full container mt-8 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold">{estate?.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{estate?.category}</p>
              <p className="text-2xl md:text-3xl font-bold">
                {Naira.format(estate?.price)}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-medium">{estate?.location}</p>
              <div className="flex justify-center items-center space-x-1">
                <span className="text-2xl font-medium text-neutral-800">{estate.ratings}</span>
                <Star
                  className="text-[#f2dd1d] h-7 w-7"
                  fill="#f2dd1d"
                  stroke="currentColor"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="my-3">
                <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
                  Details
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 font-medium">
                {estate?.details}
              </p>
            </div>
            <div className="mt-4">
              <div className="my-3">
                <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
                  Agent Information
                </h2>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-start w-auto flex-wrap items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Name
                  </h3>
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-800">
                    {estate?.agent.organization_name}
                  </h3>
                </div>
                <div className="flex justify-start w-auto flex-wrap items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Phone Number
                  </h3>
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-800">
                    {estate?.agent.organization_phone}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full container">
          <Skeleton className="h-[300px] w-full" />
          <div className="flex flex-col space-y-3 mt-2">
            <Skeleton className="w-full md:w-2/3 h-8" />
            <div className="flex justify-between items-center">
              <Skeleton className="w-1/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="w-1/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2 mt-4">
            <Skeleton className="w-1/3 h-8" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      )}
      <div className="container mt-8">
        <div className="mt-4">
          <div className="my-3 flex justify-between items-center">
            <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
              Feedbacks
            </h2>

            <Link
              href={!isSignedIn ? "/auth/sign-in" : ""}
              onClick={() =>
                isSignedIn && onOpen("feedback", { data: params.estateId })
              }
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
                    <PaginationNext
                      onClick={loadNext}
                      disabled={!hasNextPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 container">
        <div className="my-3">
          <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
            Similar Product
          </h2>
        </div>
        <div>
          {loading && estates.length === 0 && (
            <div className="w-full sm:w-[230px] space-y-2">
              <Skeleton className="w-full h-[200px]" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-4/5" />
                <Skeleton className="h-8 w-4/5" />
              </div>
            </div>
          )}
        </div>
        <Carousel className="w-full h-full py-5 flex">
          <CarouselContent className="w-full">
            {estates.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col h-full pb-4 shadow-lg md:flex-row justify-start items-start gap-4 w-[250px]"
              >
                <EstateCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <button className="fixed bottom-8 right-8 bg-neutral-800 text-white p-2 h-14 w-auto rounded-full shadow-lg flex justify-between items-center space-x-2 hover:bg-neutral-700 transition duration-500 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
        <span className="text-sm font-medium">Buy Now</span>
      </button>
    </div>
  );
};

export default Page;
