"use client";

import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
import { createPegawai, listPegawai } from "@/app/services/pegawai";
import Toast from "@/app/components/Toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [listDataPegawai, setListDataPegawai] = useState<any[]>([]);
  const [toastState, setToastState] = useState<boolean>(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const router = useRouter();

  const getListPegawai = async () => {
    try {
      const response = await listPegawai();

      setListDataPegawai(response);
    } catch (error) {
      console.log(error);
    }
  };

  const pegawaiUsername = listDataPegawai?.map((item) => {
    return item.username;
  });
  // const pegawaiPassword = listDataPegawai.map((item) => {
  //   return item.password;
  // });

  const formik = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      tanggal_lahir: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const isUsername = pegawaiUsername.find((item) => {
        return item === values.username;
      });

      const handleCreate = async () => {
        const data = {
          nama: values.nama,
          alamat: values.alamat,
          tanggal_lahir: values.tanggal_lahir,
          username: values.username,
          password: values.password,
        };
        try {
          await createPegawai(data);
        } catch (error) {
          console.log(error);
        }
      };

      // const isPassword = pegawaiPassword.find((item) => {
      //   return item === values.password;
      // });

      if (!isUsername) {
        setIsLoginSuccess(true);
        setText("Register Berhasil");
        handleCreate();
      } else {
        setIsLoginSuccess(false);
        setText("Akun sudah terdaftar");
      }
      setToastState(true);
      router.push("/");
    },
  });

  useEffect(() => {
    getListPegawai();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20 relative">
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
        className="w-80"
      />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full h-[600px] gap-10 items-center justify-center rounded-[50px]"
      >
        <div className="flex flex-col gap-3 w-1/2 px-20">
          <label className="text-2xl text-primary font-semibold">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-xl"
            name="nama"
            onChange={formik.handleChange}
            value={formik.values.nama}
            autoFocus
          />
        </div>
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
        <div className="flex flex-col gap-3 w-1/2 px-20">
          <label className="text-2xl text-primary font-semibold">
            Alamat Lengkap
          </label>
          <input
            type="text"
            placeholder="Alamat Lengkap"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-xl"
            name="alamat"
            onChange={formik.handleChange}
            value={formik.values.alamat}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2 px-20">
          <label className="text-2xl text-primary font-semibold">
            Tanggal Lahir
          </label>
          <input
            type="text"
            placeholder="Tanggal Lahir"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-xl"
            name="tanggal_lahir"
            onChange={formik.handleChange}
            value={formik.values.tanggal_lahir}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2 px-20 relative">
          <label className="text-2xl text-primary font-semibold">
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
