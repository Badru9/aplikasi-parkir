"use client";

import { listUsers } from "../../services/users";
import { useEffect, useState } from "react";
import { Pegawai } from "../../services/types";
import { FormatNumeric } from "../../components/FormatNumeric";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import Sidebar from "../components/Sidebar";
import { listPegawai } from "@/app/services/pegawai";
import ConfirmationDelete from "./ConfirmationDelete";
import FormEdit from "./FormEdit";

export default function Employees() {
  const [users, setUsers] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>();

  const [open, setOpen] = useState<boolean>(false);
  const [formEdit, setFormEdit] = useState<boolean>(false);

  const router = useRouter();

  const fetchEmployees = async () => {
    const response = await listPegawai();
    console.log(response);

    const filteredEmployees = response.filter(
      (employee: any) => employee.role !== "Super Admin"
    );

    console.log(filteredEmployees);

    setUsers(filteredEmployees);
  };

  const handleEdit = (data: any) => {
    console.log(data);
    setEditData(data);
    setFormEdit(true);
  };

  const handleDelete = (data: any) => {
    setEditData(data);
    setOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <BackButton onClick={() => router.back()} />
      <Sidebar />
      {open && <ConfirmationDelete data={editData} setOpen={setOpen} />}
      {formEdit && <FormEdit data={editData} setFormEdit={setFormEdit} />}
      <div className="flex flex-col gap-5 items-center w-full p-10 pl-44">
        <h1 className="text-3xl font-semibold text-black">Data Customers</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-1 border border-primary text-primary">ID</th>
              <th className="py-1 border border-primary text-primary">Nama</th>
              <th className="py-1 border border-primary text-primary">Role</th>
              <th className="py-1 border border-primary text-primary">Email</th>
              <th className="py-1 border border-primary text-primary">
                Username
              </th>
              <th className="py-1 border border-primary text-primary">
                Password
              </th>
              <th className="py-1 border border-primary text-primary">
                Tanggal Lahir
              </th>
              <th className="py-1 border border-primary text-primary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: Pegawai) => (
              <tr key={user.id}>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.id}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.nama}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.role}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.email}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.username}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.password}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  {user.tanggal_lahir}
                </td>
                <td className="text-primary text-center border border-primary text-lg py-2">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      className="bg-green-500 text-white py-0.5 px-5 rounded-full"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-0.5 px-5 rounded-full"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
