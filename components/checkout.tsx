'use client';

import Image from "next/image"
import { cn, startOfDayVN, vndFormat } from "@/lib/utils"
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface PageProps {
    params: { id: string }
}





// function getHost(){
//     const host = headers().get("host");
//     const protocal = process?.env.NODE_ENV === "development"?"http":"https"
//     return `${protocal}://${host}`
// }

function calculateTotal(cart) {
    let total = 0
    Object.values(cart ?? {})?.map((item: any) => {
        total += item?.price * item?.quantity
    })
    return total
}




export default function Checkout({ user }) {
    // const user: any = useSession()?.data?.user
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        defaultValues: async () => {
            // const response = await fetch(`/api/users/${user?.id}`, {
            //     method: "GET",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            // }).then(res => res.json())

          
            return {
                deliveryAddress: user?.deliveryAddress,
                deliveryPhone: user?.deliveryPhone,
            }
            
        }
    })

    async function onSubmit(values) {
        let {deliveryAddress, deliveryPhone} = values;
        console.log(values)
        
        let tzTimestamp = startOfDayVN(new Date())
        setIsLoading(true)
        
        const response = await fetch(`/api/order`, {
            method: "POST",
            body: JSON.stringify({
                cart: user?.cart,
                deliveryAddress,
                deliveryPhone,
                tzTimestamp
            }),
            headers: {
              "Content-Type": "application/json",
            },
        })

        setIsLoading(false)

        if(response.status == 200){
            toast({
                title:'Tạo đơn hàng thành công'
            })
            let data: any = await response?.json()
            console.log(data)
            router.push(`/dat-hang-thanh-cong/${data?.id}`)
        }
        else{
            toast({
                title:'Có lỗi xảy ra',
                variant:"destructive"
            })
        }

      
    }


    return <div className="w-full flex gap-8 flex-wrap-reverse">
        <div className="w-full md:w-[600px]">
            <Form {...form}>
                <p className="font-heading text-xl pb-2"> Thông tin giao hàng </p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">

                    <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại (*)</FormLabel>
                                <FormControl aria-required>
                                    <Input placeholder="+84 " {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nhập sđt của người nhận
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                    
                        control={form.control}
                        name="deliveryPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ giao đến (*)</FormLabel>
                                <FormControl aria-required>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Vui lòng nhập đúng địa chỉ
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-muted-foreground text-sm">Thông báo đặt hàng sẽ gửi về email của chủ trang</p>
                    <br/>
                    <Button type="submit" disabled={!Object.keys(user?.cart ?? {})?.length}  className={cn("w-full gap-2", isLoading ? "pointer-events-none" : "")}>
                        Xác nhận đặt hàng
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-4 h-4" />}
                    </Button>
                </form>
            </Form>
        </div>
        <div className="flex-1">
            <p className="font-heading font-xl">Đơn hàng</p>
            <div className="divide-y divide-solid">
                {
                    Object.values(user?.cart ?? {}).map(((item: any) => <div key={item?.id} className="flex gap-1 justify-between flex-wrap py-3">
                        <Image width={100} height={100} className="w-12 h-12 rounded-md" alt='' src={item?.images?.[`url`]} />
                        <div className="px-2 flex-1 whitespace-nowrap overflow-hidden">
                            <p className="font-heading text-eclipsis">{item?.name}</p>
                            <div className="flex items-center gap-2">

                                <span>x {item?.quantity}</span>

                            </div>
                        </div>
                        <p className="min-w-[100px]">{vndFormat(item?.price)}</p>
                    </div>))
                }
            </div>
            <div className="pt-2">
                <p className="font-heading">Tạm tính</p>
                <p>{vndFormat(calculateTotal(user?.cart ?? {}))}</p>
            </div>
        </div>
    </div>

}