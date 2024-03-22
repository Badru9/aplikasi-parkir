"use client";

import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20">
      <Image
        src={logo}
        alt="logo"
        width={1000}
        height={1000}
        className="w-80"
      />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full h-[600px] gap-10 items-center justify-center rounded-[50px]"
      >
        <div className="flex flex-col gap-3 w-1/2 px-20">
          <label className="text-2xl text-primary font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-xl"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2 px-20 relative">
          <label className="text-2xl text-primary font-semibold">
            Password
          </label>
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-xl"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            type="button"
            className="absolute right-24 top-[47px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye size={20} color="white" />
            ) : (
              <FaEyeSlash size={20} color="white" />
            )}
          </button>
        </div>
        <div className="text-xl font-medium mt-5">
          <p>
            Already have an account?{" "}
            <Link href={"/"} className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
        <Button children="Register" type="submit" />
      </form>
    </main>
  );
}
