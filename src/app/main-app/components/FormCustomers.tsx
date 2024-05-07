import React from "react";
import { useFormik } from "formik";
import { insertCustomer } from "@/app/services/users";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function FormCustomers() {
  const formik = useFormik({
    initialValues: {
      platNo: "",
      jamMasuk: "",
    },
    onSubmit: async (values) => {
      console.log(values.platNo);

      try {
        const data = {
          plat_no: values.platNo,
          jam_masuk: "2024-08-05 16:20",
          jam_keluar: null,
        };

        const response = await insertCustomer(data);

        console.log(response);
      } catch (error) {
        console.log(error);
      }

      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="platNo"
          className="block text-sm font-medium text-gray-700"
        >
          Plat Nomor
        </label>
        <input
          type="text"
          name="platNo"
          id="platNo"
          value={formik.values.platNo}
          onChange={formik.handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="jamMasuk"
          className="block text-sm font-medium text-gray-700"
        >
          Jam Masuk
        </label>
        <input
          type="time"
          name="jamMasuk"
          id="jamMasuk"
          value={formik.values.jamMasuk}
          onChange={formik.handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Submit
      </button>
    </form>
  );
}
