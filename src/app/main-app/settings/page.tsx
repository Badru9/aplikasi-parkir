"use client";

import BackButton from "@/app/components/BackButton";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-primary">
      <BackButton onClick={() => router.back()} />
      <Sidebar />
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl font-semibold">Ini Settings</h1>
      </div>
    </main>
  );
}
