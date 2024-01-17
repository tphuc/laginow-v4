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
        {/* <DropdownMenuItem asChild>
          <Sheet key={'right'}>
            <SheetTrigger asChild>
              <Button size={'sm'} className="w-full gap-2 justify-between" variant={'ghost'}>
                TT cơ bản <Pen className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll" side={'right'}>

              <UpdateBusinessForm businessId={row?.original?.['id']} />
            </SheetContent>
          </Sheet>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Sheet key={'right'}>
            <SheetTrigger asChild>
              <Button size={'sm'} className="w-full gap-2 justify-between" variant={'ghost'}>
                TT liên lạc <Globe className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll" side={'right'}>

              <UpdateBusinessContactVerified businessId={row?.original?.['id']} />
            </SheetContent>
          </Sheet>
        </DropdownMenuItem> */}

        {/* <DropdownMenuItem asChild>
          <Button onClick={async () => {
            try {


              let res = await fetch(`/api/business/${row?.original?.['id']}/verified`, {
                method: "POST",
                body: JSON.stringify({
                  verified: true
                })
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
        
          }} size={'sm'} className="w-full gap-2 text-sm justify-between" variant={'ghost'}>
            Tích xanh <BadgeCheck className="w-4 h-4" />
          </Button>
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          <Link href={`/p/${row?.original?.['id']}`}>Xem </Link>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  )
}