"use client";

import { SignInButton, SignUpButton, useAuth, useOrganization, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

const navItenm = [
  {
    label: "Become Agent",
    href: "/",
  },
];

const Navbar = () => {
  const { isSignedIn, isLoaded, orgId } = useAuth();


  console.log(orgId)
  const { onOpen } = useModal();
  return (
    <div className="flex shadow justify-center backdrop-filter backdrop-blur-md bg-opacity-60 w-full fixed z-50 bg-white items-center pt-2">
      <div className="justify-between items-center flex z-50 container py-2">
        <Link href="/" className="flex flex-shrink-0">
          <h3 className="text-neutral-700 font-semibold text-lg">
            Real Estate.
          </h3>
        </Link>

        <div className="flex flex-1 mx-6 max-sm:mx-2 justify-start items-center w-full">
          <Link
            onClick={() => isSignedIn && !orgId && onOpen("becomeAgent")}
            href={!isSignedIn ? "/auth/sign-in" : orgId ? "/dashboard" : ""}
            className={cn(
              "text-neutral-500 group py-2 transition-all px-4 rounded-lg  font-medium text-sm  delay-150 ease-in-out text-center"
            )}
          >
            <span className="text-neutral-500 transition-all max-sm:text-xs group-hover:text-neutral-600 font-medium text-sm text-center">
              {isSignedIn && orgId  ? "Dashboard" : "Become Agent"}
            </span>

            <div className="bg-transparent transition-all h-[1px] w-10 rounded-sm ease-in-out duration-500 group-hover:bg-neutral-700 font-medium text-sm text-center" />
          </Link>
        </div>

        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="flex justify-between items-center space-x-3">
              <SignInButton>
                <Button>
                  <p className="text-sm font-medium text-neutral-100">
                    Sign In
                  </p>
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="ghost" className="shadow max-sm:hidden">
                  <p className="text-sm font-medium text-neutral-800">
                    Sign Up
                  </p>
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
