"use client";

import { updatePegawai } from "@/app/services/pegawai";
import { useState } from "react";

export default function FormEdit({ data, setFormEdit }: any) {
  const [name, setName] = useState<string>(data.nama || "");
  const [username, setUsername] = useState<string>(data.username || "");
  const [email, setEmail] = useState<string>(data.email || "");
  const [role, setRole] = useState<string>(data.role || "");
  const [alamat, setAlamat] = useState<string>(data.alamat || "");
  const [tanggalLahir, setTanggalLahir] = useState<string>(
    data.tanggal_lahir || ""
  );
  const [password, setPassword] = useState<string>(data.password || "");

  const handleEdit = async () => {
    const newData = {
      id: data.id,
      role: role || data.role,
      nama: name || data.nama,
      username: username || data.username,
      password: password || data.password,
      alamat: alamat || data.alamat,
      email: email || data.email,
      tanggal_lahir: tanggalLahir || data.tanggal_lahir,
    };

    setFormEdit(false);

    await updatePegawai(newData);

    if (window !== undefined) window.location.reload();
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full h-full bg-black/30 fixed overflow-hidden">
      <div className="flex flex-col w-1/2 items-center justify-center gap-3 bg-white p-10 rounded-2xl shadow-md">
        <div className="space-y-5 w-full">
          <h1>
            Edit{" "}
            <span className="text-primary font-semibold">{data.nama} </span>
            Data
          </h1>
          <form className="flex flex-col gap-3 w-full">
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3"
              type="text"
              placeholder="Tanggal Lahir"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </form>
        </div>
        <div className="flex gap-2 self-end">
          <button
            onClick={handleEdit}
            className="text-black px-5 py-1 rounded-full"
          >
            Yes
          </button>
          <button
            onClick={() => setFormEdit(false)}
            className="bg-primary text-white px-5 py-1 rounded-full"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
