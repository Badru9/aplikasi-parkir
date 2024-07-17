"use client";

import { useFormik } from "formik";
import {
  deleteCustomer,
  getUserByLicensePlate,
  insertBiaya,
  listUsers,
} from "@/app/services/users";
import { differenceInHours, format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTransaction } from "@/app/services/midtrans";

export default function ExitVehicleForm() {
  const [customer, setCustomer] = useState<any>();
  const [inPayment, setInPayment] = useState<boolean>(false);

  console.log(customer);

  const today = new Date();
  const now = format(today, "yyyy-MM-dd HH:mm", { locale: id });

  const fetchCustomers = async () => {
    try {
      const response = await listUsers(0);
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

    const midtransData = {
      name: "Biaya Parkir",
      price: data.cost,
      quantity: 1,
    };

    const response = await createTransaction(midtransData);

    if (response.status === 200) {
      // Cookies.set("token", response.data.token);

      if (window !== undefined) {
        window.snap.pay(response.data.token);
      }

      // if (!inPayment) {
      //   deleteCustomer(data);
      // }
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
      licensePlate: "",
      cost: "",
      timeOut: now,
    },
    onSubmit: async (values) => {
      const response = await getUserByLicensePlate({
        licensePlate: values.licensePlate,
      });
      setCustomer(response);

      // if (biaya !== 0 || biaya !== null) {
      //   console.log("biaya sudah ada", biaya);
      // }

      const newJamMasuk = format(customer.timeIn, "yyyy-MM-dd HH:mm", {
        locale: id,
      });

      // const biayaBaru = getTime(newJamMasuk, values.jam_keluar);
      // console.log(biayaBaru);

      const data = {
        licensePlate: values.licensePlate,
        cost: getTime(newJamMasuk, values.timeOut),
        timeOut: new Date(values.timeOut).toISOString(),
      };

      if (values.licensePlate !== "") {
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
          htmlFor="licensePlate"
          className="block text-xl font-medium text-white"
        >
          Plat Nomor
        </label>
        <input
          type="text"
          name="licensePlate"
          value={formik.values.licensePlate}
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
