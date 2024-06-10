"use client";

// import BackButton from "@/app/components/BackButton";
import { useRouter } from "next/navigation";
// import Sidebar from "../components/Sidebar";
import { listPegawai } from "@/app/services/pegawai";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserCircle } from "@phosphor-icons/react";
// import Button from "@/app/components/Button";
// import Image from "next/image";
import dynamic from "next/dynamic";

// const Button = dynamic(() => import("@/app/components/Button"), { ssr: false });
const Sidebar = dynamic(() => import("@/app/main-app/components/Sidebar"), {
  ssr: false,
});
const BackButton = dynamic(() => import("@/app/components/BackButton"), {
  ssr: false,
});

export default function Profile() {
  // const [image, setImage] = useState<string>("");
  const [user, setUser] = useState<any[]>([]);

  // console.log(image);

  const router = useRouter();

  useEffect(() => {
    const cookies = Cookies.get("userData");
    const data = JSON.parse(cookies as string);
    setUser(data);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-primary overflow-x-hidden">
      <BackButton onClick={() => router.back()} />
      <Sidebar />
      <div className="w-full ml-80 flex gap-20">
        <div className="w-fit items-center flex flex-col">
          {/* {image ? (
            <Image src={image} width={250} height={250} alt="image" />
          ) : (
            <> */}
          <UserCircle size={250} />
          {/* </>
          )} */}
          <button
            className="w-fit bg-primary text-white px-5 py-1 rounded-full"
            onClick={() => console.log("Edit Profile")}
          >
            {/* <input
              type="file"
              name="prolie-picture"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            /> */}
            Edit Profile
          </button>
        </div>
        <div className="w-fit h-fit p-10">
          {user.length > 0 &&
            user?.map((item: any, index: number) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-4xl font-semibold">{item?.nama}</p>
                <p className="text-lg font-medium text-primary/60">
                  {item?.username} | {item?.email}
                </p>
                {/* <p className="text-xl font-semibold">{item?.username}</p> */}
                <div className="flex flex-col my-5">
                  <h3 className="text-primary/60">Alamat</h3>
                  <p className="text-xl font-semibold">{item?.alamat}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-primary/60">Tanggal Lahir</h3>
                  <p className="text-xl font-semibold">{item?.tanggal_lahir}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
