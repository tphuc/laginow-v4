'use client';

import { VNTimezoneFormat, formatDate, getDayVN } from "@/lib/utils";
import { DataTableRowActions } from "./table/data-table-row-actions";




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
       
        <p className="truncate text-ellipsis">{row?.original.title}</p>
        <p className="text-muted-foreground">{VNTimezoneFormat(row?.original?.tzDatetime)} {row?.orignal?.tzDatetime}</p>
      </div>
    }
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

]