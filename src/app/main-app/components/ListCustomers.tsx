"use client";

import { FormatNumeric } from "@/app/components/FormatNumeric";
import { insertBiaya } from "@/app/services/users";
import { format, differenceInHours } from "date-fns";
import { id } from "date-fns/locale";

interface TableCustomersProps {
  index: number;
  licensePlate: string;
  timeIn: any;
  timeOut: any;
  cost: string;
}

export default function TableCustomers({
  index,
  licensePlate,
  timeIn,
  timeOut,
  cost,
}: TableCustomersProps) {
  return (
    <tr className="w-full">
      <td className="pb-1 pt-3 text-center">{index}</td>
      <td className="pb-1 pt-3 text-center">{licensePlate}</td>
      <td className="pb-1 pt-3 text-center">{timeIn}</td>
      <td className="pb-1 pt-3 text-center">
        {timeOut === undefined ? "NULL" : timeOut}
      </td>
      <td className="pb-1 pt-3 text-center">
        <FormatNumeric value={Number(cost)} />
      </td>
    </tr>
  );
}
