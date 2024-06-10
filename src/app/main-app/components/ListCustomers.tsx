"use client";

import { FormatNumeric } from "@/app/components/FormatNumeric";
import { insertBiaya } from "@/app/services/users";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";

interface TableCustomersProps {
  index: number;
  ID: any;
  plat_no: string;
  jam_masuk: any;
  jam_keluar: any;
  biaya: string;
}

export default function TableCustomers({
  index,
  ID,
  plat_no,
  jam_masuk,
  jam_keluar,
  biaya,
}: TableCustomersProps) {
  return (
    <tr className="w-full">
      <td className="pb-1 pt-3 text-center">{index}</td>
      <td className="pb-1 pt-3 text-center">{ID}</td>
      <td className="pb-1 pt-3 text-center">{plat_no}</td>
      <td className="pb-1 pt-3 text-center">{jam_masuk}</td>
      <td className="pb-1 pt-3 text-center">
        {jam_keluar === undefined ? "NULL" : jam_keluar}
      </td>
      <td className="pb-1 pt-3 text-center">
        <FormatNumeric value={Number(biaya)} />
      </td>
    </tr>
  );
}
