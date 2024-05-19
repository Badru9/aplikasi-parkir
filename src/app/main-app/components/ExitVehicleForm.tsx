"use client";

import { useFormik } from "formik";
import { getUserByPlatNo, insertBiaya, listUsers } from "@/app/services/users";
import { differenceInHours, format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ExitVehicleFormProps {
  onSubmit: (plat_no: string) => void;
}

export default function ExitVehicleForm({ onSubmit }: ExitVehicleFormProps) {
  const [customer, setCustomer] = useState<any[]>([]);

  const router = useRouter();

  const today = new Date();
  const now = format(today, "yyyy-MM-dd HH:mm", { locale: id });

  const fetchCustomers = async () => {
    try {
      const response = await listUsers();
      console.log(response);
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTime = (jam_masuk: string, jam_keluar: string) => {
    if (jam_keluar) {
      const result = differenceInHours(jam_keluar, jam_masuk);
      console.log(result);

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

  const formik = useFormik({
    initialValues: {
      platNo: "",
      biaya: "",
      jam_keluar: now,
    },
    onSubmit: async (values) => {
      console.log(values.platNo);

      const response = await getUserByPlatNo({ plat_no: values.platNo });
      setCustomer(response.data);
      console.log(customer);

      const [{ jam_masuk }] = customer;
      const newJamMasuk = format(jam_masuk, "yyyy-MM-dd HH:mm", { locale: id });

      console.log(newJamMasuk);

      const data = {
        plat_no: values.platNo,
        biaya: getTime(newJamMasuk, values.jam_keluar),
        jam_keluar: values.jam_keluar,
      };

      console.log(data);

      if (values.platNo !== "") {
        try {
          await insertBiaya(data);
          fetchCustomers();
          onSubmit(values.platNo);
          // if (window !== undefined) {
          //   window.location.reload();
          // }
        } catch (error) {
          console.log(error);
        }
      }

      formik.resetForm();
    },
  });

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
      >
        Submit
      </button>
    </form>
  );
}
