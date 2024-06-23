import React, { useState } from "react";
import { useFormik } from "formik";
import { insertCustomer } from "@/app/services/users";
import Toast from "@/app/components/Toast";

export default function VehicleEntryForm() {
  const [entrySuccess, setEntrySuccess] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      licensePlate: "",
      timeIn: "",
    },
    onSubmit: async (values) => {
      console.log(values.licensePlate);

      console.log(values.timeIn);

      try {
        const data = {
          licensePlate: values.licensePlate,
          timeIn: new Date(values.timeIn).toISOString(),
        };

        console.log("jalan");

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
        <label className="block text-xl font-medium text-white">
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
      <div>
        <label
          htmlFor="jamMasuk"
          className="block text-xl font-medium text-white"
        >
          Jam Masuk
        </label>
        <input
          type="datetime-local"
          name="timeIn"
          value={formik.values.timeIn}
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
