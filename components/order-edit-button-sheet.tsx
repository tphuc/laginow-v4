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
import { Eye, Pen } from "lucide-react"
import { UpdateOrderForm } from "./update-order-form"
interface Props extends ButtonProps {

  orderId: string
}

export function OrderEditButtonSheet({
  className,
  variant,
  children,
  ...props
}: Props) {
  // const router = useRouter()
  // const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // async function onClick() {
  //   setIsLoading(true)


  //   const response = await fetch(`/api/business/${props?.bussinessId}/product`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       businessId: props.bussinessId,
  //       name: "",
  //     }),
  //   })



  //   setIsLoading(false)

  //   if (!response?.ok) {
  //     return toast({
  //       title: "Lỗi xảy ra",
  //       description: "Sản phẩm của bạn chưa được tạo",
  //       variant: "destructive",
  //     })
  //   }

  //   const res = await response.json()

  //   // This forces a cache invalidation.
  //   router.refresh()

  //   router.push(`/business/${props.bussinessId}/product/${res?.id}`)
  // }

  return (
    <Sheet key={'right'}>
            <SheetTrigger asChild>
                <Button variant={'ghost'} className="w-full justify-between px-2 rounded-sm" > Xem <Eye className="w-4 h-4"/> </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll" side={'right'}>
                

            <UpdateOrderForm orderId={props.orderId}/>
            </SheetContent>
        </Sheet>
  )
}
