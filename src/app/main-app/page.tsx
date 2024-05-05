"use client";

import { useEffect } from "react";
import { listUsers } from "../services/users";
import TableCustomers from "./components/ListCustomers";
import Sidebar from "./components/Sidebar";
import { FormatNumeric } from "@/app/components/FormatNumeric";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

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
    return format(data, "yyyy-MM-dd HH:mm", { locale: id });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between relative p-10">
      <Sidebar />
      <div className="flex w-full pl-40 py-10 bg-teal-500 text-xl">
        <div className="bg-white p-10 w-1/2">
          <table className="w-full">
            <thead>
              <tr className="border-y border-primary">
                <th className="py-1">No</th>
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
                  index={data.id}
                  plat_no={data.plat_no}
                  jam_masuk={formatDate(data.jam_masuk)}
                  jam_keluar={formatDate(data.jam_keluar)}
                  biaya={FormatNumeric(data.biaya)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
