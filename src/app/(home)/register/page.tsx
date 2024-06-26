"use client";

import logo from "@/../public/logo-new.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Link from "next/link";
import { createPegawai, listPegawai } from "@/app/services/pegawai";
import Toast from "@/app/components/Toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import Cookies from "js-cookie";
import { CaretDown } from "@phosphor-icons/react";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [listDataPegawai, setListDataPegawai] = useState<any[]>([]);
  const [toastState, setToastState] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [role, setRole] = useState<string>("");

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

  const formik = useFormik({
    initialValues: {
      nama: "",
      email: "",
      alamat: "",
      tanggal_lahir: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const isUsername = pegawaiUsername.find((item) => {
        return item === values.username;
      });

      if (
        role === "" ||
        values.nama === "" ||
        values.email === "" ||
        values.alamat === "" ||
        values.tanggal_lahir === "" ||
        values.username === "" ||
        values.password === ""
      ) {
        setToastState(true);
        setIsRegisterSuccess(false);
        setText("Data tidak boleh kosong");
        return;
      }

      const handleCreate = async () => {
        const data = {
          role,
          nama: values.nama,
          alamat: values.alamat,
          email: values.email,
          tanggal_lahir: values.tanggal_lahir,
          username: values.username,
          password: values.password,
        };
        try {
          setLoading(true);
          await createPegawai(data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      };

      if (!isUsername) {
        setIsRegisterSuccess(true);
        setText("Register Berhasil");
        handleCreate();
      } else {
        setIsRegisterSuccess(false);
        setText("Akun sudah terdaftar");
      }
      setToastState(true);
      router.push("/login");
    },
  });

  useEffect(() => {
    getListPegawai();
    const isLogin = Cookies.get("isLogin") === "true";
    if (isLogin) {
      router.push("/main-app");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-0 py-10 relative bg-lightGrey">
      {toastState && (
        <Toast
          text={text || "Gagal Register"}
          state={isRegisterSuccess}
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
        className="flex flex-col w-full min-h-[600px] gap-10 items-center justify-center"
      >
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">Role</label>
          {/* <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="nama"
            onChange={formik.handleChange}
            value={formik.values.nama}
            autoFocus
          /> */}
          <div className="w-full relative">
            <select
              name="role"
              className="w-full appearance-none py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Select Role" disabled>
                Select Role
              </option>
              <option value="Operator">Operator</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            <CaretDown
              size={24}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="nama"
            onChange={formik.handleChange}
            value={formik.values.nama}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
            Alamat Lengkap
          </label>
          <input
            type="text"
            placeholder="Alamat Lengkap"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="alamat"
            onChange={formik.handleChange}
            value={formik.values.alamat}
          />
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20">
          <label className="text-2xl text-lightBlack font-semibold">
            Tanggal Lahir
          </label>
          <input
            type="text"
            placeholder="Tanggal Lahir"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="tanggal_lahir"
            onChange={formik.handleChange}
            value={formik.values.tanggal_lahir}
          />
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-1/2 px-20 relative">
          <label className="text-2xl text-lightBlack font-semibold">
            Password
          </label>
          <input
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            className="w-full py-2 px-5 ml-3 rounded-full ring-0 outline-none bg-primary text-white hover:bg-primary/90 focus:bg-primary/90 text-lg lg:text-xl"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            type="button"
            className="absolute right-24 top-[55px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash size={20} color="white" />
            ) : (
              <FaEye size={20} color="white" />
            )}
          </button>
        </div>

        <div className="text-lg lg:text-xl font-medium mt-5 text-black">
          <p>
            Already have an account?{" "}
            <Link href={"/login"} className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>

        {loading ? <Loading /> : <Button type="submit">Register</Button>}
      </form>
    </main>
  );
}
