"use client";

import { listUsers } from "../../services/users";
import { useEffect, useState } from "react";
import { Vehicle } from "../../services/types";
import { FormatNumeric } from "../../components/FormatNumeric";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  const router = useRouter();

  const fetchUsers = async () => {
    const response = await listUsers();
    console.log(response);
    setUsers(response.data);
  };

  const formatDate = (data: any) => {
    if (data) {
      return format(data, "EEEE, dd MM yyyy HH:mm", { locale: id });
    } else {
      return "NULL";
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <BackButton onClick={() => router.back()} />
      <Sidebar />
      <div className="flex flex-col gap-5 items-center w-full p-10 pl-44">
        <h1 className="text-3xl font-semibold text-black">Data Customers</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-1 border border-primary text-primary">ID</th>
              <th className="py-1 border border-primary text-primary">
                Plat Nomor
              </th>
              <th className="py-1 border border-primary text-primary">
                Jam Masuk
              </th>
              <th className="py-1 border border-primary text-primary">
                Jam Keluar
              </th>
              <th className="py-1 border border-primary text-primary">Biaya</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: Vehicle) => (
              <tr key={user.id}>
                <td className="text-primary text-center border border-primary text-lg py-1">
                  {user.id}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-1">
                  {user.plat_no}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-1">
                  {formatDate(user.jam_masuk)}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-1">
                  {formatDate(user.jam_keluar)}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-1">
                  <FormatNumeric value={user.biaya || 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
