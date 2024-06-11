"use client";

import { useEffect } from "react";
import { listUsers } from "../services/users";
import TableCustomers from "./components/ListCustomers";
import Sidebar from "./components/Sidebar";
import { FormatNumeric } from "@/app/components/FormatNumeric";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import VehicleEntryForm from "./components/VehicleEntryForm";
import ExitVehicleForm from "./components/ExitVehicleForm";
import Cookies from "js-cookie";
import Ticket from "./components/Ticket";
import { useRouter } from "next/navigation";

export default function Main() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [vehicleOut, setVehicleOut] = useState<boolean>(false);
  const [dataCustomer, setDataCustomer] = useState<string>("");
  const [user, setUser] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");

  console.log(user);
  console.log(role);

  const router = useRouter();

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
    } else {
      console.log(data);
    }
  };

  const showTicket = (data: any) => {
    console.log("Bisa");
    console.log(data);
    setDataCustomer(data);
    setVehicleOut(true);
  };

  const cookies = Cookies.get("isLogin");
  const userCookies = Cookies.get("userData");

  useEffect(() => {
    fetchCustomers();

    if (cookies !== "true") {
      router.push("/login");
    }

    if (userCookies) {
      const userData = JSON.parse(userCookies as string);
      console.log(userData);
      setUser(userData);

      const user = userData.find((item: any) => {
        return {
          role: item.role,
        };
      });

      setRole(user.role);
    }
  }, []);
  return (
    <main className="flex min-h-screen w-full flex-col bg-lightGrey items-center justify-between relative p-10">
      <Sidebar />
      <div className="flex lg:flex-col w-full pl-40 py-10 text-xl gap-10">
        {role !== "" && role !== "Super Admin" && (
          <div className="gap-10 flex flex-col lg:flex-row w-full">
            <VehicleEntryForm />
            <ExitVehicleForm />
          </div>
        )}
        <div className="p-8 bg-primary text-white rounded-2xl w-1/2 lg:w-full">
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
            <tbody>
              {customers.map((data, index) => (
                <TableCustomers
                  key={index}
                  index={index + 1}
                  ID={data.id}
                  plat_no={data.plat_no}
                  jam_masuk={formatDate(data.jam_masuk)}
                  jam_keluar={formatDate(data.jam_keluar)}
                  biaya={data.biaya}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {vehicleOut && <Ticket data={dataCustomer} />}
    </main>
  );
}
