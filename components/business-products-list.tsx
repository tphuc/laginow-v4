'use client';

import { siteConfig } from "@/config/site"
import db from "@/lib/prisma"
import { ProductItem } from "./product-item"
import Image from "next/image"
import { formatDate, vndFormat } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"
import { Plus, ShoppingBag, ShoppingCart } from "lucide-react"
import { mutate } from "swr"
import { useSession } from "next-auth/react"
import { toast } from "./ui/use-toast"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import ImageViewable from "./image-viewable";
import { Product } from "@prisma/client";




export function BusinessProductList({ products, ...props }: { products: any }) {
  // let products = await getBusinessProduct(businessId)
  const session = useSession();


  const addToCart = async (product: any) => {


    let user: any = session.data?.user
    if (!user) {
      toast({ title: 'Cần đăng nhập', variant: "default" })
    }

    let cart: Object = user?.cart ?? {}
    let currentBusinessId = Object.values(cart)?.[0]?.businessId ?? null;
    let quantity = 1
    if (product?.businessId !== currentBusinessId) {
      cart = {}
      if (cart[product?.id]) {
        quantity += 1
      }
      cart[product?.id] = { ...product, quantity }
    }
    else {
      if (cart[product?.id]) {
        quantity += 1
      }
      cart[product?.id] = { ...product, quantity }
    }




    let res = await fetch(`/api/users/${session?.data?.user?.id}/update-cart`, {
      method: "POST",
      body: JSON.stringify({
        cart
      })
    })

    mutate(`/api/users/${session?.data?.user?.id}`)

    if (res.ok) {
      toast({
        title: "Thêm vào giỏ hàng thành công"
      })
    }

    // await mutate(`/api/users/${session?.data?.user?.id}`)
  }

  return (

    <div className="w-full items-center flex flex-wrap relative mt-4 gap-2 md:gap-4 ">
      {!products?.length && <p className="text-muted-foreground">Chưa liệt kê sản phẩm / dịch vụ</p>}
      {products.map((product: Product) => (
        <div key={product?.id} className="inline-flex shadow-sm flex-wrap  w-full md:w-[360px] border border-input rounded-lg gap-3 justify-between p-3">
          <div className="aspect-square rounded-md bg-black overflow-hidden h-24 w-24 text-white text-center flex items-center justify-center">
            <ImageViewable alt='' width={100} height={100} className="object-cover" src={product?.images?.['url'] ?? '/placeholder.svg'} />
          </div>

          <div className="flex flex-1 relative h-full">
            <div className="grid gap-2 h-full">
            <Sheet>
              <SheetTrigger asChild>
                <div
                  // href={`/business/${product?.businessId}/product/${product.id}`}
                  className="font-medium cursor-pointer hover:underline text-ellipsis overflow-hidden"
                >
                  {product?.name ? product?.name : "Không có tiêu đề"}
                </div>
              </SheetTrigger>
            
                <SheetContent>
                  <div className="w-full space-y-2">
                <ImageViewable alt='' width={200} height={200} className="object-cover rounded-md" src={product?.images?.['url'] ?? '/placeholder.svg'} />
                  <p className="font-heading">{product?.name}</p>
                  <p className="">{product?.description}</p>
                  <p className="">{vndFormat(product?.price)}</p>
                  {product?.orderable && <Button onClick={() => addToCart(product)} variant={'secondary'} size='sm' className="rounded-md border border-input shadow-sm gap-2"><ShoppingBag className="w-4 h-4" /> Thêm vào giỏ hàng</Button>}
                  </div>
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground">{vndFormat(product.price)}</p>
              <div>
              {product?.orderable && <Button onClick={() => addToCart(product)} variant={'secondary'} size='sm' className="rounded-md inline-flex border border-input shadow-sm gap-2"><ShoppingBag className="w-4 h-4" /> Thêm vào giỏ hàng</Button>}
              </div>
            </div>

          </div>

        </div>
      ))}
    </div>

  )
}