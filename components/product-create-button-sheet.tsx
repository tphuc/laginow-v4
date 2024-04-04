"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { ProductCreateSchema } from "@/lib/dto"
import { z } from "zod"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UpdateBusinessProductForm } from "./update-business-product-form"
import { Pen, Plus } from "lucide-react"
import { CreateBusinessProductForm } from "./create-business-product-form"
interface Props extends ButtonProps {

  businessId: string
}

export function ProductCreateButtonSheet({
  className,
  variant,
  children,
  ...props
}: Props) {


  return (
    <Sheet key={'right'}>
            <SheetTrigger asChild>
                <Button size='sm' className="gap-2 " >Thêm <Plus className="w-4 h-4"/> </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll" side={'right'}>
                

            <CreateBusinessProductForm businessId={props.businessId}/>
            </SheetContent>
        </Sheet>
  )
}
