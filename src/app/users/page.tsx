"use client";

import Image from "next/image";
import { listUsers } from "../services/users";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const response = await listUsers();
    const result = response;
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl font-semibold">Ini List Users</h1>
        {users.map((user) => (
          <div key={user.id} className="flex gap-5 text-xl">
            <p className="text-black">ID Pengendara : {user.id}</p>
            <p className="text-black">Plat Nomor : {user.plat_no}</p>
            <p className="text-black">Jam Masuk : {user.jam_masuk}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
