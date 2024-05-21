import logo from "@/../public/logo-new.svg";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Props {
  data: any;
}

export default function Ticket({ data }: Props) {
  console.log(data);

  const formatDate = (date: any) => {
    return format(date, "EEEE, dd MMMM yyyy", { locale: id });
  };

  return (
    <div className="flex min-h-screen w-full fixed flex-col items-center justify-center bg-black/30 text-primary -mt-10 text-lg">
      <div className="w-fit h-fit py-5 px-10 flex items-center justify-center flex-col rounded-lg bg-teal-500">
        <Image src={logo} alt="logo" className="w-28 mb-10" />
        <h1>Tiket Parkir</h1>
        <div className="bg-red-500">
          {data.map((data: any) => (
            <>
              <p>Plat No: {data.plat_no}</p>
              <p>Jam Masuk: {formatDate(data.jam_masuk)}</p>
              <p>Jam Keluar: {formatDate(data.jam_keluar)}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
