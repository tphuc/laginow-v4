"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductEditButtonSheet } from "@/components/product-edit-button-sheet"
import { DeleteProductFormButton } from "@/components/delete-product-form"
import { OrderEditButtonSheet } from "@/components/order-edit-button-sheet"
import { Separator } from "@/components/ui/separator"
import { BadgeCheck, Check, Globe, Pen, PenTool, Trash } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UpdateBusinessContactVerified } from "@/components/update-business-contact-verified"
import { UpdateBusinessForm } from "@/components/update-business-form"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EditEventForm } from "../edit-event-form"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}


export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()

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
          <Sheet key={'right'}>
            <SheetTrigger asChild>
              <Button size={'sm'} className="w-full rounded-sm gap-2 px-2 justify-between" variant={'ghost'}>
                Cập nhật <Pen className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll" side={'right'}>

              <EditEventForm data={row?.original} />
            </SheetContent>
          </Sheet>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button onClick={async () => {
            try {


              let res = await fetch(`/api/admin/event-questions/${row?.original?.['id']}`, {
                method: "DELETE",

              })
              toast({
                title: "Thành công",
              })
              router?.refresh()

            } catch (e) {
              toast({
                title: "Lỗi xảy ra",
                variant: "destructive"
              })
            }

          }} size={'sm'} className="w-full rounded-sm text-sm gap-2 justify-between" variant={'ghost'}>
            Xoá <Trash className="w-4 h-4" />
          </Button>
        </DropdownMenuItem>





      </DropdownMenuContent>
    </DropdownMenu>
  )
}