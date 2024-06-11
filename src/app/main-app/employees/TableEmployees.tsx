"use client";

interface TableEmployeesProps {
  nama: string;
  role: string;
  email: string;
  alamat: string;
  tanggal_lahir: string;
  username: string;
  password: string;
}

export default function TableEmployees({
  nama,
  role,
  email,
  alamat,
  tanggal_lahir,
  username,
  password,
}: TableEmployeesProps) {
  return (
    <tr className="w-full">
      <td className="pb-1 pt-3 text-center">{nama}</td>
      <td className="pb-1 pt-3 text-center">{role}</td>
      <td className="pb-1 pt-3 text-center">{email}</td>
      <td className="pb-1 pt-3 text-center">{username}</td>
      <td className="pb-1 pt-3 text-center">{password}</td>
      <td className="pb-1 pt-3 text-center">{tanggal_lahir}</td>
      <td className="pb-1 pt-3 text-center">{alamat}</td>
    </tr>
  );
}
