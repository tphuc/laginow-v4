'use client';

import Image from "next/image";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";



export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey:'code',
    header: 'Mã',
    cell: ({row})=>{
      const available = new Date() <= new Date(row?.original?.availableTo) 
      return <div className="text-muted-foreground space-y-1">
        <p>{row?.original?.code}</p>
        <Badge variant={available?'default':'secondary'}>{available ? 'Còn hạn' : "Hết hạn"}</Badge>
      </div>
    }
  },
  {
    accessorKey:'availableTo',
    header: 'Hạn sử dụng',
    cell: ({row})=>{
      return <div className="text-muted-foreground">
        {format(row?.original?.availableTo, 'PP', {locale:vi})}
      </div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  
]