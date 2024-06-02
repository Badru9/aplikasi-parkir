import React, { useState } from "react";
import { useFormik } from "formik";
import { insertCustomer } from "@/app/services/users";
import Toast from "@/app/components/Toast";

export default function VehicleEntryForm() {
  const [entrySuccess, setEntrySuccess] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      platNo: "",
      jamMasuk: "",
    },
    onSubmit: async (values) => {
      console.log(values.platNo);

      console.log(values.jamMasuk);

      try {
        const data = {
          plat_no: values.platNo,
          jam_masuk: values.jamMasuk,
        };

        const response = await insertCustomer(data);
        console.log(response);

        if (response.success) {
          if (window !== undefined) {
            window.location.reload();
          }
        } else {
          console.log(response.message);
        }

        setEntrySuccess(true);
      } catch (error) {
        console.log(error);
      }
      setEntrySuccess(false);
      formik.resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 bg-primary p-8 rounded-2xl w-full"
    >
      <h1 className="text-white text-2xl font-semibold">
        Form Kendaraan Masuk
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
      <div>
        <label
          htmlFor="jamMasuk"
          className="block text-xl font-medium text-white"
        >
          Jam Masuk
        </label>
        <input
          type="datetime-local"
          name="jamMasuk"
          id="jamMasuk"
          value={formik.values.jamMasuk}
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
      {entrySuccess && (
        <Toast
          onShow={entrySuccess}
          text={"Berhasil"}
          onClose={() => {
            setEntrySuccess(false);
          }}
        />
      )}
    </form>
  );
}
