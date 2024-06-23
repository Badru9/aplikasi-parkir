"use client";

import {
  House,
  Gear,
  User,
  UsersFour,
  ListChecks,
  SignOut,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Sidebar() {
  const [selected, setSelected] = useState<string>("");
  const [menu, setMenu] = useState<any[]>([]);
  // const [role, setRole] = useState<string>("");

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
      name: "profile",
      link: "/main-app/profile",
      icon: <User size={32} />,
    },
    {
      name: "logout",
      link: "/",
      icon: <SignOut size={32} />,
    },
  ];
  const adminMenus = [
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
      name: "employees",
      link: "/main-app/profile",
      icon: <User size={32} />,
    },
    {
      name: "profile",
      link: "/main-app/employees",
      icon: <UsersFour size={32} />,
    },
    {
      name: "logout",
      link: "/",
      icon: <SignOut size={32} />,
    },
  ];

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("userData") as string);

    console.log(userData);

    if (userData) {
      // setRole(userData.role.name);

      if (
        userData.role.name === "Super Admin" ||
        userData.role.name === "Owner"
      ) {
        setMenu(adminMenus);
      } else {
        setMenu(menus);
      }
    }

    //   console.log(user);
  }, []);

  return (
    <div className="flex flex-col bg-primary text-white rounded-full h-fit w-[100px] items-center justify-center absolute left-10 top-20">
      <div className="flex flex-col h-full py-10 justify-between">
        <div className="flex flex-col h-full gap-5">
          {menu.map((menu) => (
            <Link
              key={menu.name}
              href={menu.link}
              className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
              onClick={() => {
                setSelected(menu.name);
                if (menu.name === "logout") {
                  Cookies.set("isLogin", "false");
                }
              }}
            >
              {menu.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
