'use client';

import { VNTimezoneFormat, cn, formatDate, getDayVN } from "@/lib/utils";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { format } from "date-fns";




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
    accessorKey: 'title',
    header: 'Tên',
    cell: ({ row }) => {

      return <div className="space-y-1">
       
        <p className={cn("truncate text-ellipsis", new Date(row?.original?.tzDatetime) > new Date() ? "text-primary" : "text-muted-foreground")}>{row?.original.title}</p>
        {/* <p className="text-muted-foreground">{VNTimezoneFormat(row?.original?.tzDatetime)} {row?.orignal?.tzDatetime}</p> */}
      </div>
    }
  },
  {
    accessorKey: 'date',
    header: 'Ngày',
    cell: ({ row }) => {

      return <div className="space-y-1">
      
        <p className="">{format(new Date(row?.original?.tzDatetime), 'dd/MM/yyyy HH:mm')}</p>
      </div>
    }
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

]