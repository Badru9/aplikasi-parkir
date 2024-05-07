"use client";

import { useEffect } from "react";
import { listUsers } from "../services/users";
import TableCustomers from "./components/ListCustomers";
import Sidebar from "./components/Sidebar";
import { FormatNumeric } from "@/app/components/FormatNumeric";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import FormCustomers from "./components/FormCustomers";

export default function Main() {
  const [customers, setCustomers] = useState<any[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await listUsers();
      console.log(response);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (data: any) => {
    if (data) {
      return format(data, "yyyy-MM-dd HH:mm", { locale: id });
    }

    console.log(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between relative p-10">
      <Sidebar />
      <div className="flex w-full pl-40 py-10 text-xl gap-x-10">
        <div className="p-8 bg-primary text-white rounded-2xl w-1/2">
          <table className="w-full">
            <thead>
              <tr className="border-y border-white">
                <th className="py-1">No</th>
                <th className="py-1">ID</th>
                <th className="py-1">Plat Nomor</th>
                <th className="py-1">Jam Masuk</th>
                <th className="py-1">Jam Keluar</th>
                <th className="py-1">Biaya</th>
              </tr>
            </thead>
            <tbody className="w-full text-center">
              {customers.map((data, index) => (
                <TableCustomers
                  key={index}
                  index={index + 1}
                  ID={data.id}
                  plat_no={data.plat_no}
                  jam_masuk={formatDate(data.jam_masuk)}
                  jam_keluar={formatDate(data.jam_keluar)}
                  biaya={FormatNumeric(data.biaya)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 p-8 ">
          <FormCustomers />
        </div>
      </div>
    </main>
  );
}
