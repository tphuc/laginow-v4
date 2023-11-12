/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut, useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { useGetUserInfo } from "@/lib/http"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Minus, Plus, SheetIcon, ShoppingBag, ShoppingCart } from "lucide-react"
import LoaderSkeleton from "./loader-skeleton"
import Image from "next/image"
import { cn, vndFormat } from "@/lib/utils"
import { toast } from "./ui/use-toast"
import { Divider } from "@tremor/react"
import { useState } from "react"
interface UserCartProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any
}

function calculateTotal(cart) {
  let total = 0
  Object.values(cart ?? {})?.map((item: any) => {
    total += item?.price * item?.quantity
  })
  return total
}

export function UserCart({ user }: UserCartProps) {
  const session = useSession();

  let { data, isLoading: isFetchLoading, mutate } = useGetUserInfo(user?.id);
  console.log(Object.values(data?.cart ?? {}))
  let [isLoading, setIsLoading] = useState(false);
  const updateCart = async (product: any, quantity: number) => {

    
    let user: any = session.data?.user
    if (!user) {
      toast({ title: 'Cần đăng nhập', variant: "default" })
    }

    let cart: Object = user?.cart ?? {}


    setIsLoading(true)

    if(quantity <= 0){
      delete cart[product?.id]
      let res = await fetch(`/api/users/${session?.data?.user?.id}/update-cart`, {
        method: "POST",
        body: JSON.stringify({
          cart
        })
      })
  
      if (res.ok) {
        toast({
          title: "Cập nhật giỏ hàng thành công"
        })
      }
      setIsLoading(false)
      await mutate()
      return
     
    }

    cart[product?.id] = { ...product, quantity }

    let res = await fetch(`/api/users/${session?.data?.user?.id}/update-cart`, {
      method: "POST",
      body: JSON.stringify({
        cart
      })
    })

    if (res.ok) {
      toast({
        title: "Cập nhật giỏ hàng thành công"
      })
    }

    setIsLoading(false)
    await mutate()

    // await mutate(`/api/users/${session?.data?.user?.id}`)
  }


  return (
    <Sheet key={'right'}>
      <SheetTrigger asChild>
        <Button size='sm' variant={'ghost'} className="inline-flex relative rounded-lg gap-2 hover:bg-transparent">
          <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          <div className="absolute leading-[0] flex items-center justify-center bottom-0 text-xs rounded-full text-primary-foreground w-4 h-4 right-2 bg-primary">{Object.keys(data?.cart ?? {})?.length}</div>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side={'right'}>
        <SheetHeader>
          {/* <ShoppingBag /> */}
          <SheetTitle className="font-heading">Giỏ hàng</SheetTitle>
          <SheetDescription>
            Tự cập nhật khi bạn thêm sản phẩm từ shop.
          </SheetDescription>
        </SheetHeader>
        {isFetchLoading && <LoaderSkeleton />}
        <div className={cn("divide-y  pb-[200px] overflow-scroll scrollbar-hide divide-solid flex-1", isLoading && "pointer-events-none")}>
          {
            (Object.values(data?.cart ?? {}) ?? []).map(((item: any) => <div key={item?.id} className="flex gap-1 flex-wrap py-3">
              <Image width={100} height={100} className="w-12 h-12 rounded-md" alt='' src={item?.images?.[`url`]} />
              <div className="px-2 max-w-[200px] whitespace-nowrap overflow-hidden">
                <Link href={`t/${item?.businessId}`} className="font-heading text-eclipsis">{item?.name}</Link>
                <div className="flex items-center gap-2">
                  <Button disabled={isLoading} onClick={() => updateCart(item, item?.quantity - 1)} className="w-5 h-5 rounded-full p-0">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span>{item?.quantity}</span>
                  <Button disabled={isLoading} onClick={() => updateCart(item, item?.quantity + 1)} className="w-5 h-5 rounded-full p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="min-w-[100px]">{vndFormat(item?.price)}</p>
            </div>))
          }
          <div className="pt-2">
            <p className="font-heading">Tổng</p>
            <p>{vndFormat(calculateTotal(data?.cart ?? {}))}</p>
          </div>
        </div>

        <div className="absolute pr-2 w-full left-1 bottom-2">
          <Link href='/checkout' className="relative w-full">
            <Button disabled={Object?.keys(data?.cart ?? {})?.length <= 0} className="mx-auto w-full border border-input" >Tạo đơn đặt hàng</Button>
          </Link>
        </div>


      </SheetContent>
    </Sheet>
  )
}
