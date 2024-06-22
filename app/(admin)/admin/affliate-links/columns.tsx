'use client';

import Image from "next/image";
import { DataTableRowActions } from "./table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { timeAgo } from "@/lib/utils";
import { BadgeCheck, CheckCircle, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";




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
    accessorKey: 'email',
    header: 'Tên',
    cell: ({ row }) => {
      return <div className="space-y-2">
        
        <p>{row?.original.name}</p>
        <p className="text-muted-foreground">{row?.original.email}</p>
      </div>
    }
  },
  {
    enableSorting: true,
    accessorKey: 'isAdmin',
    header: 'Xác thực',
    cell: ({ row }) => {
      return <div className="flex items-center flex-wrap">
        {row?.original?.isAdmin && <Badge>Admin</Badge>}
        {row?.original?.canWriteNews && <Badge variant={'sky'}>Viết Báo</Badge>}
      </div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

]