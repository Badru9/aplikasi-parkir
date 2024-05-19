"use client";

import logo from "@/../public/logo-new.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Link from "next/link";
import { listPegawai } from "../../services/pegawai";
import Toast from "../../components/Toast";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [listDataPegawai, setListDataPegawai] = useState<any[]>([]);
  const [toastState, setToastState] = useState<boolean>(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  // console.log(listDataPegawai);

  const router = useRouter();

  const getListPegawai = async () => {
    try {
      const response = await listPegawai();

      setListDataPegawai(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(listDataPegawai);

  const pegawaiUsername = listDataPegawai?.map((item) => {
    return item.username;
  });
  const pegawaiPassword = listDataPegawai?.map((item) => {
    return item.password;
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const isUsername = pegawaiUsername.find((item) => {
        console.log(item);
        return item === values.username;
      });

      const isPassword = pegawaiPassword.find((item) => {
        return item === values.password;
      });

      if (isUsername && isPassword) {
        setIsLoginSuccess(true);
        setLoading(true);
        setText("Login Berhasil");
        router.push("/main-app");
        console.log("Login Berhasil");
      } else if (values.username === "" || values.password === "") {
        setText("Username / Password Tidak Boleh Kosong");
        setIsLoginSuccess(false);
      } else {
        setIsLoginSuccess(false);
        setText("Login Gagal");
        console.log("Login Gagal");
      }
      setToastState(true);
      setTimeout(() => {
        setLoading(false);
        setToastState(false);
        router.push("/main-app");
      }, 2000);
    },
  });

  useEffect(() => {
    getListPegawai();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-40 relative  bg-lightGrey text-lightBlack">
      {toastState && (
        <Toast
          text={text}
          state={isLoginSuccess}
          onClose={() => setToastState(false)}
          onShow={toastState}
        />
      )}
      <Image
        src={logo}
        alt="logo"
        width={1000}
        height={1000}
        className="w-40"
      />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full h-[600px] gap-10 items-center justify-center rounded-[50px]"
      >
        <div className="flex flex-col gap-3 w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
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
          <label className="text-2xl text-lightBlack font-semibold">
            Password
          </label>
          <input
            type={!showPassword ? "password" : "text"}
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
              <FaEyeSlash size={20} color="white" />
            ) : (
              <FaEye size={20} color="white" />
            )}
          </button>
        </div>
        <div className="text-xl font-medium mt-5 flex flex-col w-1/2 px-20">
          <Link
            href={"/forgot-password"}
            className="self-end hover:underline hover:font-medium"
          >
            Forgot Password?
          </Link>
          <p className="self-center">
            Doesn't have an account?{" "}
            <Link href={"/register"} className="font-semibold underline">
              Register
            </Link>
          </p>
        </div>
        {loading ? <Loading /> : <Button type="submit">Login</Button>}
      </form>
    </main>
  );
}
