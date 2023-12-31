'use client';

import Image from "next/image";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { timeAgo } from "@/lib/utils";
import { BadgeCheck, CheckCircle, CheckCircle2, Circle } from "lucide-react";




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
    accessorKey: 'title',
    header: 'Tên',
    cell: ({ row }) => {
      return <div className="flex items-center gap-1">
        <Image alt='' width={60} height={60} className="w-[60px] rounded-md aspect-square" style={{objectFit:"cover"}} src={row?.original?.banner?.url}></Image>
        <p>{row?.original.title}</p>
      </div>
    }
  },
  {
    accessorKey: 'verified',
    header: 'Xác thực',
    cell: ({ row }) => {
      return <div>
        <p>{row?.original?.verified ? <BadgeCheck className="w-6 h-6 fill-sky-600 stroke-white"/> : <Circle className="w-5 h-5 text-muted-foreground"/>}</p>
      </div>
    }
  },
  {
    accessorKey: 'phone',
    header: 'SDT'
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

]