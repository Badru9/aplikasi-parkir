"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Image from "next/image";
import logo from "@/../public/logo-new.svg";
import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, easings: "easeInOut" }}
      className="w-full min-h-screen flex flex-col gap-20 items-center justify-center"
    >
      {loading ? (
        <Loading />
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
              <Button children="Register" />
            </Link>
            <Link href={"/login"}>
              <Button children="Login" />
            </Link>
          </div>
        </>
      )}
    </motion.main>
  );
}
