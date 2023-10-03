"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { ProductCreateSchema } from "@/lib/dto"
import { z } from "zod"

interface ProductCreateButtonProps extends ButtonProps {
  bussinessId: string;
}

export function ProductCreateButton({
  className,
  variant,
  children,
  ...props
}: ProductCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)


    const response = await fetch(`/api/business/${props?.bussinessId}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId: props.bussinessId,
        name: "",
      }),
    })



    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Lỗi xảy ra",
        description: "Sản phẩm của bạn chưa được tạo",
        variant: "destructive",
      })
    }

    const res = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/business/${props.bussinessId}/product/${res?.id}`)
  }

  return (
    <Button
      size={'sm'}
      onClick={onClick}
      className={className}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      {children}
    </Button>
  )
}
