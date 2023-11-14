import db from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Minus, Plus, SheetIcon, ShoppingBag, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { vndFormat } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import Checkout from "@/components/checkout"

interface PageProps {
    params: { id: string }
}





// function getHost(){
//     const host = headers().get("host");
//     const protocal = process?.env.NODE_ENV === "development"?"http":"https"
//     return `${protocal}://${host}`
// }



export default async function Page({ params }) {
    const user: any = await getCurrentUser()



    return <div className="relative space-y-5 max-w-screen-xl w-full gap-2">
        <Checkout user={user}/>
    </div>
}