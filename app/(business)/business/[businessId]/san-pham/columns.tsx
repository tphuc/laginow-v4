'use client';

import Image from "next/image";
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
    accessorKey:'images',
    cell: ({ row }) => {
      console.log(row)
    return <Image width={100} height={100} className="w-[50px] border border-input bg-gray-200 rounded-sm h-[50px]" alt='' src={row?.original?.images?.url || '/placeholder.webp'} />
  },
    header: 'Ảnh'
  },
  {
    accessorKey:'name',
    header: 'Tên'
  },
  {
    accessorKey:'price',
    header: 'Giá'
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  
]