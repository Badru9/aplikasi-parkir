"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Image from "next/image";
import logo from "@/../public/logo-new.svg";
import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col gap-20 items-center justify-center bg-lightGrey">
      {loading ? (
        <Loading color="black" />
      ) : (
        <>
          <Image
            src={logo}
            alt="logo"
            width={500}
            height={500}
            className="w-28 text-primary"
          />
          <div className="flex gap-5">
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
