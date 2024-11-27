"use client";

import React, { useEffect } from "react";

import { Naira } from "@/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { useEstatesPages } from "@/hooks/use-estates";
import { IEstate } from "@/lib/interfaces/estate";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "./ui/skeleton";
import { Star } from "lucide-react";

const EstateId = ({ estateId }: { estateId: string }) => {
  console.log(estateId);

  const { getEstate, loading, estates } = useEstatesPages();
  const [estate, setEstate] = React.useState<IEstate>();

  useEffect(() => {
    (async () => {
      const house = await getEstate(estateId);
      console.log(house);
      setEstate(house);
    })();
  }, [estateId]);

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
    <div>
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
                  <CarouselItem key={index} className="w-full">
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
                <span className="text-2xl font-medium text-neutral-800">
                  {parseFloat(estate.ratings.toFixed(1))}
                </span>
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
    </div>
  );
};

export default EstateId;
