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
import { Check } from "lucide-react"

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
      {/* <DropdownMenuItem asChild>
        <Button variant={'ghost'} className="w-full gap-2" >Hoàn tất <Check className="w-4 h-4"/></Button>
        </DropdownMenuItem> */}
        {/* <Separator/> */}
        <DropdownMenuItem asChild>
          <OrderEditButtonSheet orderId={row?.original?.['id']}></OrderEditButtonSheet>
        </DropdownMenuItem>
     
        <DropdownMenuItem asChild>
          <DeleteProductFormButton productId={row?.original?.['id']}/>
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}