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
import { BadgeCheck, Check, Globe, Pen, PenTool } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UpdateBusinessContactVerified } from "@/components/update-business-contact-verified"
import { UpdateBusinessForm } from "@/components/update-business-form"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EditVoucherForm } from "../edit-voucher-form"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}


export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    //     >
    //       <DotsHorizontalIcon className="h-4 w-4" />
    //       <span className="sr-only">Open menu</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-[160px]">
    //     <DropdownMenuItem asChild>

    //     </DropdownMenuItem>





    //   </DropdownMenuContent>
    // </DropdownMenu>

    <Sheet key={'right'}>
      <SheetTrigger asChild>
        <Button size={'sm'} className="rounded-sm p-2 gap-2 justify-between" variant={'outline'}>
          <Pen className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll scrollbar-hide" side={'right'}>
        <EditVoucherForm data={row?.original} />
      </SheetContent>
    </Sheet>

  )
}