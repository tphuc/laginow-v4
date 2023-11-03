'use client';

import Image from "next/image";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { timeAgo } from "@/lib/utils";




export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey:'information',
    header: 'Thông tin',
    cell: ({ row }) => { 
    return <div>
       <p>{row?.original.user?.name}</p>
      <p>{row?.original?.deliveryPhone}</p>
      <p>{row?.original?.deliveryAddress}</p>
    </div>
    }
  },
  {
    accessorKey:'time',
    header: 'Thời gian trước',
    cell: ({ row }) => { 
    return <div>
       <p>{timeAgo(row?.original.timestamp)}</p>
    </div>
    }
  },
  {
    accessorKey:'status',
    header: 'Trạng thái',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => { 
    return <div>
     {row?.original.status === 'REQUESTED' ? <p className="inline-flex text-xs px-2 py-1 rounded-lg items-center border border-yellow-500 bg-yellow-300/50">  Đã đặt </p> : null}
     {row?.original.status === 'DONE' ? <p className="inline-flex text-xs px-2 py-1 rounded-lg items-center border border-green-500 bg-green-300/50"> Hoàn tất </p> : null}
    </div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  
]