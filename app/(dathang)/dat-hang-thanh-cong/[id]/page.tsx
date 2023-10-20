import db from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Home, Minus, Plus, SheetIcon, ShoppingBag, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { vndFormat } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import Checkout from "@/components/checkout"
import Link from "next/link"

interface PageProps {
    params: { id: string }
}


async function getOrderInfo(id: string) {
    try {

   
    return await prisma?.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: true,
        business: true
      }
    })
} catch(e){
    return null
}
  }




export default async function Page({ params }) {


    let data = await getOrderInfo(params?.id)


    return <div className="relative space-y-2 flex flex-col items-center max-w-screen-xl w-full gap-2">
        <p className="font-heading text-3xl text-center">Tạo đơn thành công</p>
        <p className="text-center text-2xl">Mã: {data?.id}</p>
        <p className="text-center text-muted-foreground">Shop có thể liên hệ qua số điện thoại bạn cung cấp để xác nhận</p>
        <Link href='/'>
            <Button variant={'secondary'} className="border border-input gap-2"> <Home className="w-4 h-4 stroke-width-1"/> Trở về trang chủ </Button>
        </Link>
    </div>
}