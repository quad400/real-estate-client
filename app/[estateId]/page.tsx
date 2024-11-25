"use client";

import React from "react";

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
import { bannerHouses, singleHouses } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ArrowDown, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const house = singleHouses;

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
            {singleHouses.images.map((image) => (
              <CarouselItem className="w-full">
                <div className="relative w-full h-[300px] md:h-[500px] lg:[600px]">
                  <Image
                    src={image.image}
                    alt={`${image.id}`}
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
            {Array.from({ length: singleHouses.images.length }).map(
              (_, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-2 ring-1 ring-neutral-200 transition-all ease-linear duration-700 rounded-full mx-1",
                      index === current - 1 && "bg-neutral-200 w-8 rounded-lg"
                    )}
                  />
                );
              }
            )}
          </div>
        </Carousel>
      </div>
      <div className="w-full container mt-8 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold">{house.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">{house.category}</p>
          <p className="text-2xl md:text-3xl font-bold">{house.price}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-medium">{house.location}</p>
          <div className="flex justify-center items-center space-x-1">
            <span className="text-2xl font-medium text-neutral-800">4</span>
            <Star
              className="text-[#f2dd1d] h-7 w-7"
              fill="#f2dd1d"
              stroke="currentColor"
            />
          </div>{" "}
        </div>
        <div className="mt-4">
          <div className="my-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">
              Details
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-700 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            bibendum, metus sit amet aliquam aliquet, purus tortor dignissim
            purus, nec mollis nunc turpis ac nisl. Nullam bibendum, metus sit
            amet aliquam aliquet, purus tortor dignissim purus, nec mollis nunc
          </p>
        </div>
        <div className="mt-4">
          <div className="my-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">
              Agent Information
            </h2>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-start w-auto flex-wrap items-center space-x-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                Name
              </h3>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-800">
                Adediji Abdulquadri
              </h3>
            </div>
            <div className="flex justify-start w-auto flex-wrap items-center space-x-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                Email
              </h3>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-800">
                adedijiabdulquadri@gmail.com
              </h3>
            </div>
            <div className="flex justify-start w-auto flex-wrap items-center space-x-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                Phone Number
              </h3>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-neutral-800">
                08139737334
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="my-3 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">
              Feedbacks
            </h2>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden flex shadow"
            >
              <Plus className="h-6 w-6 text-neutral-800" />
            </Button>
            <Button variant="ghost" className="max-md:hidden flex shadow">
              <Plus className="h-6 w-6 text-neutral-800" />
              <span className="text-sm text-neutral-800">New Feedback</span>
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 bg-neutral-100/30 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/avatar.png"
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-neutral-800">
                        Adediji Abdulquadri
                      </h3>
                      <p className="text-sm text-neutral-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star
                      className="text-[#f2dd1d] h-5 w-5"
                      fill="#f2dd1d"
                      stroke="currentColor"
                    />
                    <span className="text-sm font-medium text-neutral-800">
                      4.5
                    </span>
                  </div>
                </div>
                <p className="text-sm text-neutral-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam bibendum, metus sit amet aliquam aliquet, purus tortor
                  dignissim purus, nec mollis nunc turpis ac nisl. Nullam
                  bibendum, metus sit amet aliquam aliquet, purus tortor
                  dignissim purus, nec mollis nunc
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="my-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">
              Similar Product
            </h2>
          </div>
          <Carousel
            className="w-full h-full py-5 flex"
          >
            <CarouselContent className="w-full">
              {bannerHouses.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col basis-9/12 h-full pb-4 shadow-lg sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-full md:flex-row justify-start items-start gap-4"
                >
                  <Link
                    href="/"
                    className="w-full group bg-white h-full shadow space-y-2"
                  >
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col group-hover:bg-neutral-100 transition-all duration-500 ease-in-out justify-start items-start space-y-2 mt-2 px-3 w-full py-2">
                      <h2 className="text-neutral-800 font-semibold text-lg md:text-xl line-clamp-2  tracking-tighter">
                        {item.title}
                      </h2>
                      <div className="flex w-full justify-between items-center flex-wrap">
                        <h4 className="text-neutral-700 font-medium text-sm md:text-base">
                          {item.category}
                        </h4>
                        <h2 className="text-neutral-700 font-medium text-lg md:text-xl">
                          {item.price}
                        </h2>
                      </div>
                      <div className="flex w-full justify-between items-center flex-wrap">
                        <h4 className="text-neutral-700 font-medium text-sm md:text-base">
                          {item.location}
                        </h4>
                        <div className="flex space-x-1 justify-center items-center">
                          <span className="text-sm text-neutral-800 font-medium">
                            4
                          </span>

                          <Star
                            className="text-[#f2dd1d]"
                            fill="#f2dd1d"
                            stroke="currentColor"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <button className="fixed bottom-8 right-8 bg-neutral-800 text-white p-2 h-14 w-auto rounded-full shadow-lg flex justify-between items-center space-x-2 hover:bg-neutral-700 transition duration-500 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
        <span className="text-sm font-medium">Buy Now</span>
      </button>
    </div>
  );
};

export default Page;
