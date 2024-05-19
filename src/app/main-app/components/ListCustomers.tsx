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
    <tr>
      <td className="pb-1 pt-3">{index}</td>
      <td className="pb-1 pt-3">{ID}</td>
      <td className="pb-1 pt-3">{plat_no}</td>
      <td className="pb-1 pt-3">{jam_masuk}</td>
      <td className="pb-1 pt-3">
        {jam_keluar === undefined ? "NULL" : jam_keluar}
      </td>
      <td className="pb-1 pt-3">
        <FormatNumeric value={Number(biaya)} />
      </td>
    </tr>
  );
}
