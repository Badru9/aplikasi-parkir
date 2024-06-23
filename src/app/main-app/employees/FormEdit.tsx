"use client";

import { updatePegawai } from "@/app/services/pegawai";
import { useState } from "react";

export default function FormEdit({ data, setFormEdit }: any) {
  const [name, setName] = useState<string>(data.name || "");
  const [username, setUsername] = useState<string>(data.username || "");
  const [email, setEmail] = useState<string>(data.email || "");
  const [role, setRole] = useState<any>(data.role || "");
  const [password, setPassword] = useState<string>(data.password || "");

  const handleEdit = async () => {
    const newData = {
      // id: data.id,
      name: name || data.name,
      username: username || data.username,
      password: password || data.password,
      email: email || data.email,
      role: role || data.role.name,
    };

    console.log(newData);

    setFormEdit(false);

    await updatePegawai(data.id, newData);

    if (window !== undefined) window.location.reload();
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full h-full bg-black/30 fixed overflow-hidden">
      <div className="flex flex-col w-1/2 items-center justify-center gap-3 bg-white p-10 rounded-2xl shadow-md">
        <div className="space-y-5 w-full">
          <p className="text-xl text-black">
            Edit{" "}
            <span className="text-primary font-semibold">{data.nama} </span>
            Data
          </p>
          <form className="flex flex-col gap-3 w-full">
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <select
              name="role"
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black appearance-none"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="Select Role" disabled>
                Select Role
              </option>
              <option value="Super Visor">Super Visor</option>
              <option value="Operator">Operator</option>
            </select> */}
            <input
              className="w-full border-2 border-gray-300 rounded-full py-1 px-3 text-black"
              type="text"
              placeholder="Role"
              value={role.name || data.role.name}
              // onChange={(e) => setRole(e.target.value)}
              disabled
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
