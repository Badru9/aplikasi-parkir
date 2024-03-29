"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, easings: "easeInOut" }}
      className="w-full min-h-screen flex items-center justify-center"
    >
      <h1 className="text-4xl font-semibold">Welcome to our Parking App</h1>
    </motion.main>
  );
}
