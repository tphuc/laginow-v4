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
import { BadgeCheck, Check, Globe, Pen, PenTool, Trash, Trophy } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UpdateBusinessContactVerified } from "@/components/update-business-contact-verified"
import { UpdateBusinessForm } from "@/components/update-business-form"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EditEventForm } from "../edit-event-form"
import { RandomizeEventWinner } from "../random-event-winner"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}


export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-1">


          <Sheet modal={true}>
            <SheetTrigger asChild>
              <Button size={'sm'} className="rounded-sm gap-2 px-2 justify-between" variant={'outline'}>
                <Pen className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <EditEventForm data={row?.original} />
            </SheetContent>
          </Sheet>

          <Sheet modal={true}>
            <SheetTrigger asChild>
              <Button size={'sm'} className="rounded-sm gap-2 px-2 justify-between" variant={'outline'}>
                <Trophy className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <RandomizeEventWinner data={row?.original} />
            </SheetContent>
          </Sheet>

          <Button onClick={async () => {
            try {

              let a = window.confirm("Chắc chắn chứ ?")
              if(a){
                let res = await fetch(`/api/admin/event-questions/${row?.original?.['id']}`, {
                  method: "DELETE",
  
                })
                toast({
                  title: "Thành công",
                })
                router?.refresh()
              }
              

            } catch (e) {
              toast({
                title: "Lỗi xảy ra",
                variant: "destructive"
              })
            }

          }} size={'sm'} className="rounded-sm text-sm gap-1 p-2 justify-between" variant={'ghost'}>
           <Trash className="w-4 h-4" />
          </Button>






    </div>
  )
}