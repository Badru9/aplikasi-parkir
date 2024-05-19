import logo from "@/../public/logo-new.svg";
import Image from "next/image";

interface Props {
  plat_no: string;
}

export default function Ticket({ plat_no }: Props) {
  return (
    <div className="flex min-h-screen w-full fixed flex-col items-center justify-center bg-black/30 text-primary -mt-10 text-lg">
      <div className="w-fit h-fit py-5 px-10 flex items-center justify-center flex-col rounded-lg bg-teal-500">
        <Image src={logo} alt="logo" className="w-28 mb-10" />
        <h1>Tiket Parkir</h1>
        <p>Plat No: {plat_no}</p>
      </div>
    </div>
  );
}
