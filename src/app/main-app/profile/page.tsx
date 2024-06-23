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
import { updateImage } from "@/app/services/image";
import Image from "next/image";

// const Button = dynamic(() => import("@/app/components/Button"), { ssr: false });
const Sidebar = dynamic(() => import("@/app/main-app/components/Sidebar"), {
  ssr: false,
});
const BackButton = dynamic(() => import("@/app/components/BackButton"), {
  ssr: false,
});

export default function Profile() {
  const [user, setUser] = useState<any[]>([]);
  const [image, setImage] = useState<boolean>(true);
  // const [form, setForm] = useState<any[]>([]);

  console.log(user);

  // console.log(image);

  const router = useRouter();

  const handleClick = async (e: any, id: string) => {
    // const handleClick = (e: any) => {
    console.log(e.target.files);

    const formData = new FormData();
    const file = e.target.files[0];

    // setForm(file);

    formData.append("image", file);

    console.log(file);

    // if (form) {
    await updateImage(formData, id);
    setImage(true);
    // console.log(response);
    // }
  };

  // console.log(form);
  useEffect(() => {
    const cookies = Cookies.get("userData");
    const data = JSON.parse(cookies as string);
    setUser([data]);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-primary overflow-x-hidden">
      <BackButton onClick={() => router.back()} />
      <Sidebar />
      <div className="w-full ml-80">
        <div className="w-fit h-fit p-10">
          {user.length > 0 &&
            user?.map((item: any, index: number) => (
              <div className="w-full flex gap-20">
                <div className="w-fit items-center flex flex-col">
                  {item?.image ? (
                    <Image
                      src={"https://iili.io/dJSnjKg.jpg"}
                      width={500}
                      height={500}
                      alt="image"
                      className="w-40 bg-teal-500"
                      quality={100}
                    />
                  ) : (
                    <UserCircle size={250} />
                  )}
                  <button
                    className="w-fit bg-primary text-white px-5 py-1 rounded-full"
                    // onClick={() => console.log("Edit Profile")}
                  >
                    <input
                      type="file"
                      multiple={false}
                      name="image"
                      accept="image/png, image/jpeg, image/*"
                      onChange={(e) => handleClick(e, item.id)}
                      // onChange={handleClick}
                      // value={image}
                    />
                    Edit Profile
                  </button>
                </div>
                <div key={index} className="flex flex-col gap-2 mt-10">
                  <p className="text-4xl font-semibold">{item?.name}</p>
                  <p className="text-lg font-medium text-primary/60">
                    {item?.username} | {item?.email}
                  </p>
                  <div className="flex flex-col my-5">
                    <h3 className="text-primary/60">Role</h3>
                    <p className="text-xl font-semibold">{item?.role.name}</p>
                  </div>
                  <div className="flex flex-col my-5">
                    <h3 className="text-primary/60">Phone Number</h3>
                    <p className="text-xl font-semibold">{item?.phone}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
