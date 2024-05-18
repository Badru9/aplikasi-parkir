"use client";

import { House, Gear, UserCircle, ListChecks } from "@phosphor-icons/react";
import logo from "@/app/assets/logo-new.svg";
import Image from "next/image";
import Link from "next/link";
export default function Sidebar() {
  const handlePage = (name: any) => {
    console.log("clicked");
    console.log(name);
  };

  return (
    <div className="flex flex-col bg-primary text-white rounded-full h-[800px] w-[100px] items-center justify-center absolute left-10 top-20">
      <div className="flex flex-col h-full py-10 justify-between">
        <div className="flex flex-col gap-5">
          {/* <Image
          src={logo}
          alt="logo"
          width={1000}
          height={1000}
          className="w-32"
        /> */}
          <Link href={""} onClick={() => handlePage("Home")}>
            <House
              size={44}
              className=" p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
            />
          </Link>
          <Link href={""} onClick={() => handlePage("Success List")}>
            <ListChecks
              size={44}
              className=" p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={""} onClick={() => handlePage("Option")}>
            <Gear
              size={44}
              className=" p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
            />
          </Link>
          <Link href={""} onClick={() => handlePage("Account")}>
            <UserCircle
              size={44}
              className=" p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
