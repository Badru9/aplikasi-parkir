"use client";

import { House, Gear, UserCircle, ListChecks } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Sidebar() {
  const [selected, setSelected] = useState<string>("");

  console.log(selected);

  const router = useRouter();

  const menus = [
    {
      name: "home",
      link: "/main-app",
      icon: <House size={32} />,
    },
    {
      name: "users",
      link: "/main-app/users",
      icon: <ListChecks size={32} />,
    },
    {
      name: "settings",
      link: "/main-app/settings",
      icon: <Gear size={32} />,
    },
    {
      name: "profile",
      link: "/main-app/profile",
      icon: <UserCircle size={32} />,
    },
  ];

  return (
    <div className="flex flex-col bg-primary text-white rounded-full h-fit w-[100px] items-center justify-center absolute left-10 top-20">
      <div className="flex flex-col h-full py-10 justify-between">
        <div className="flex flex-col h-full gap-5">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
              onClick={() => setSelected(menu.name)}
            >
              {menu.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
