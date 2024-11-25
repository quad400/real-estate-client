"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { bannerHouses } from "@/constants/data";
import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Star } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const [house, setHouse] = useState(bannerHouses[0]);
  // const { users } = useUser();

  // console.log(users);

  useGSAP(() => {
    gsap.fromTo(
      ".carousel-item-text",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.5 }
    );
  }, []);

  return (
    <div className="w-full h-full py-[75px] container">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
      >
        <CarouselContent className="w-full">
          {bannerHouses.map((house, index) => (
            <CarouselItem
              key={index}
              className="flex flex-col w-full md:flex-row justify-start items-start gap-4"
            >
              <div className=" w-full group basis-1/2 flex flex-1 relative">
                <div className="relative w-full lg:h-screen md:h-[500px] h-[300px]">
                  <Image
                    src={house.image}
                    alt={house.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full py-4 bg-gradient-to-t from-neutral-950/90 to-neutral-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in">
                    <div className="px-4 py-6">
                      <h1 className="carousel-item-text text-2xl md:text-3xl font-semibold text-white">
                        {house.title}
                      </h1>
                      <p className="text-lg font-medium carousel-item-text text-neutral-200">
                        {house.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-full md:p-6 gap-3 basis-1/3 flex flex-col w-full md:mt-0">
                <div className="flex flex-wrap justify-start items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Category
                  </h3>
                  <h3 className="text-base sm:text-lg md:text-2xl font-medium text-neutral-800">
                    {house.category}
                  </h3>
                </div>
                <div className="flex justify-start flex-wrap items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Location
                  </h3>
                  <h3 className="text-base sm:text-lg md:text-2xl font-medium text-neutral-800">
                    {house.location}
                  </h3>
                </div>
                <div className="flex justify-start flex-wrap items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Agent Info
                  </h3>
                  <h3 className="text-base sm:text-lg md:text-2xl font-medium text-neutral-800">
                    08139737334
                  </h3>
                </div>
                <div className="flex justify-start flex-wrap items-center space-x-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-500">
                    Ratings
                  </h3>
                  <div className="flex justify-center items-center space-x-1">
                    <span className="text-base sm:text-lg md:text-2xl font-medium text-neutral-800">
                      4
                    </span>
                    <Star
                      className="text-[#f2dd1d] h-7 w-7"
                      fill="#f2dd1d"
                      stroke="currentColor"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
                  <button className="py-3 px-7 flex transition-all hover:bg-neutral-700 shadow-lg duration-400 ease-in bg-neutral-800">
                    <Link
                      href="/"
                      className="w-full text-neutral-200 text-center font-medium "
                    >
                      View Details
                    </Link>
                  </button>
                  <button className="py-3 px-7 flex transition-all hover:bg-neutral-300 shadow-lg duration-400 ease-in bg-neutral-200">
                    <Link
                      href="/"
                      className="w-full text-neutral-900 text-center font-medium "
                    >
                      Buy Now
                    </Link>
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-10">
        <div className="flex my-5">
          <h1 className="text-2xl md:text-3xl justify-start items-start font-semibold">
            Available Properties
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bannerHouses.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
