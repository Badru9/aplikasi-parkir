"use client";

import { useFormik } from "formik";
import { getUserByPlatNo, insertBiaya, listUsers } from "@/app/services/users";
import { differenceInHours, format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTransaction } from "@/app/services/midtrans";

export default function ExitVehicleForm() {
  // TODO : Ketika insert biaya berhasil, fetch data customer kembali
  const [customer, setCustomer] = useState<any[]>([]);
  const [inPayment, setInPayment] = useState<boolean>(false);

  const today = new Date();
  const now = format(today, "yyyy-MM-dd HH:mm", { locale: id });

  const fetchCustomers = async () => {
    try {
      const response = await listUsers();
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTime = (jam_masuk: string, jam_keluar: string) => {
    if (jam_keluar) {
      const result = differenceInHours(jam_keluar, jam_masuk);

      let biaya: number = 2000;

      if (result > 1) {
        return (biaya *= result);
      }

      return biaya;
    } else {
      console.log("error");
    }

    console.log(jam_keluar);
  };

  const handleSubmit = async (data: any) => {
    setInPayment(true);

    // console.log("data customer", data);

    const midtransData = {
      name: "Biaya Parkir",
      price: data.biaya,
      quantity: 1,
    };

    // console.log("midtransData", midtransData);

    const response = await createTransaction(midtransData);

    console.log("response from midtrans", response);
    if (response.status === 200) {
      // Cookies.set("token", response.data.token);

      if (window !== undefined) {
        window.snap.pay(response.data.token);
      }
    }

    // if (response.ok) {
    //   const result = await response.json();
    //   console.log(result);

    //   Cookies.set("token", result.token);
    // }

    setInPayment(false);
  };

  const formik = useFormik({
    initialValues: {
      platNo: "",
      biaya: "",
      jam_keluar: now,
    },
    onSubmit: async (values) => {
      const response = await getUserByPlatNo({ plat_no: values.platNo });
      setCustomer(response.data);

      const [{ jam_masuk, biaya }] = customer;

      // if (biaya !== 0 || biaya !== null) {
      //   console.log("biaya sudah ada", biaya);
      // }

      const newJamMasuk = format(jam_masuk, "yyyy-MM-dd HH:mm", { locale: id });

      // const biayaBaru = getTime(newJamMasuk, values.jam_keluar);
      // console.log(biayaBaru);

      const data = {
        plat_no: values.platNo,
        biaya: getTime(newJamMasuk, values.jam_keluar),
        jam_keluar: values.jam_keluar,
      };

      // console.log("formik", data);

      if (values.platNo !== "") {
        try {
          await insertBiaya(data);
          handleSubmit(data);
          if (inPayment) {
            fetchCustomers();
            // if (!inPayment) {
            //   if (window !== undefined) {
            //     window.location.reload();
            //   }
            // }
          }
        } catch (error) {
          console.log(error);
        }
      }

      // formik.resetForm();
    },
  });

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";

    script.async = true;
    script.setAttribute(
      "data-client-key",
      `${process.env.NEXT_PUBLIC_CLIENT_KEY}`
    );

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 w-full bg-primary p-8 rounded-2xl"
    >
      <h1 className="text-white text-2xl font-semibold">
        Form Kendaraan Keluar
      </h1>
      <div>
        <label
          htmlFor="platNo"
          className="block text-xl font-medium text-white"
        >
          Plat Nomor
        </label>
        <input
          type="text"
          name="platNo"
          id="platNo"
          value={formik.values.platNo}
          onChange={formik.handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-xl text-primary"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border-2 border-primary text-xl font-medium rounded-md text-primary bg-white hover:bg-primary hover:text-white hover:border-white"
        // onClick={() => handleSubmit(formik.values)}
      >
        Submit
      </button>
    </form>
  );
}
