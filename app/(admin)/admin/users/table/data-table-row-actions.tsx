"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeCheck, Check, Globe, Pen, PenTool, UserCog } from "lucide-react"
import { toast } from "@/components/ui/use-toast"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}


export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">


        <DropdownMenuItem asChild>
          <Button onClick={async () => {
            try {

              let res = await fetch(`/api/admin/user-admin/${row?.original?.['id']}`, {
                method: "POST",
                body: JSON.stringify({
                  isAdmin: true
                })
              })
              toast({
                title: "Thành công",
              })

            } catch (e) {
              toast({
                title: "Lỗi xảy ra",
                variant: "destructive"
              })
            }
          }} size={'sm'} className="w-full gap-2 text-sm justify-between" variant={'ghost'}>
          Cho Quyền Admin <UserCog className="w-4 h-4" />
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button onClick={async () => {
            try {

              let res = await fetch(`/api/admin/user-news/${row?.original?.['id']}`, {
                method: "POST",
                body: JSON.stringify({
                  canWriteNews: true
                })
              })
              toast({
                title: "Thành công",
              })

            } catch (e) {
              toast({
                title: "Lỗi xảy ra",
                variant: "destructive"
              })
            }
          }} size={'sm'} className="w-full gap-2 text-sm justify-between" variant={'ghost'}>
          Cho Quyền Viết Báo <UserCog className="w-4 h-4" />
          </Button>
        </DropdownMenuItem>

        


      </DropdownMenuContent>
    </DropdownMenu>
  )
}