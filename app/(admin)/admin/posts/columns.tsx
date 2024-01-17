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
        <p>{row?.original.title}</p>
      </div>
    }
  },
  {
    accessorKey: 'Tạo',
    header: 'Tạo',
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="flex items-center gap-1">
        <p>{timeAgo(row?.original?.createdAt)}</p>
      </div>
    }
  },
  
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

]