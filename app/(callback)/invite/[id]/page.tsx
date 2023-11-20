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
import { redirect } from "next/navigation"




async function setAccepted(id) {
    try {

        let res = await db?.invite?.update({
            where: { id },
            data: {
                accepted: true
            }
        })

        return res
    }
    catch (e) {
        return
    }
}




export default async function Page({ params }) {
    let res = await setAccepted(params?.id)
    redirect('/login')


    return <div className="relative space-y-2 flex flex-col items-center max-w-screen-xl w-full gap-2">
        <p>Đang chuyển trang</p>
    </div>
}