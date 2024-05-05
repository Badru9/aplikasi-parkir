"use client";

import { FormatNumeric } from "@/app/components/FormatNumeric";
import { insertBiaya } from "@/app/services/users";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";

interface TableCustomersProps {
  index: number;
  plat_no: string;
  jam_masuk: string;
  jam_keluar: string;
  biaya: string;
}

export default function TableCustomers({
  index,
  plat_no,
  jam_masuk,
  jam_keluar,
  biaya,
}: TableCustomersProps) {
  const getTime = (jam_masuk: string, jam_keluar: string) => {
    console.log(jam_masuk);
    console.log(jam_keluar);
    const result = differenceInHours(jam_keluar, jam_masuk);
    console.log(result);

    let biaya: number = 2000;

    if (result > 1) {
      return (biaya *= result);
    }

    return biaya;
  };

  //   const waktu_masuk = format(jam_masuk, "yyyy-MM-dd HH:mm", { locale: id });
  //   const waktu_keluar = format(jam_keluar, "yyyy-MM-dd HH:mm", { locale: id });

  //   console.log(waktu_masuk);
  //   console.log(waktu_keluar);

  //   const today = new Date();
  //   const waktu_masuk = format(today, "yyyy-MM-dd HH:mm", { locale: id });
  //   const waktu_keluar = format(
  //     today.setDate(today.getDate() + 1),
  //     "yyyy-MM-dd HH:mm",
  //     { locale: id }
  //   );

  const waktu_masuk = format(jam_masuk, "yyyy-MM-dd HH:mm", { locale: id });
  const waktu_keluar = format(jam_keluar, "yyyy-MM-dd HH:mm", { locale: id });

  const biayaParkir = getTime(waktu_masuk, waktu_keluar);

  const insertBiayaByPlatNo = async () => {
    const data = {
      id: 5,
      biaya: 10000,
    };

    try {
      const response = await insertBiaya(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr onClick={() => insertBiayaByPlatNo()}>
      <td className="pb-1 pt-3">{index}</td>
      <td className="pb-1 pt-3">{plat_no}</td>
      <td className="pb-1 pt-3">{jam_masuk}</td>
      <td className="pb-1 pt-3">{jam_keluar}</td>
      <td className="pb-1 pt-3">{biaya}</td>
    </tr>
  );
}
