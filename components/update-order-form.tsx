"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast, useToast } from "./ui/use-toast"
import { Suspense, useCallback, useEffect, useState } from "react"
import { CardSkeleton } from "./card-skeleton"
import { DialogContent, Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import ImageUploader from "./ui/image-uploader"
import { Textarea } from "./ui/textarea"
import Link from "next/link"
import { Switch } from "./ui/switch"
import { ProductCreateSchema } from "@/lib/dto"
import { useRouter } from "next/navigation"
import { timeAgo, vndFormat } from "@/lib/utils"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { format } from "date-fns"




export function UpdateOrderForm({ orderId }: { orderId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [preloading, setIsPreloading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const router = useRouter()
    const form = useForm({
        // resolver: zodResolver(FormBusinessCreateSchema),
        defaultValues: async () => {
            setIsPreloading(true)
            const response = await fetch(`/api/order/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json())
            setData(response)
            setIsPreloading(false)
            return response

        }
    })

    const { toast } = useToast();

    async function update(values) {
        setIsLoading(true)


        try {
            console.log(values)
         
        } catch (e) {
            console.log(e)
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
        setIsLoading(false)
    }

    if (preloading) {
        return <CardSkeleton />
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(update)} className="space-y-2 md:space-y-4">

                <h1 className="text-lg font-heading">Đơn đặt hàng</h1>
                <Separator />
                {/* <p>{format(new Date(data?.timestamp || ''), 'yyyy-MM-dd HH:mm')}</p> */}
                <p>{data?.user?.name}</p>
                <p>{data?.deliveryPhone}</p>
                <p>{data?.deliveryAddress}</p>
                <Separator />
                {form?.getValues('items')?.map(((item: any) => <div key={item?.id} className="flex gap-1 justify-between flex-wrap py-3">
                    <Image width={100} height={100} className="w-12 h-12 rounded-md" alt='' src={item?.product?.images?.[`url`]} />
                    <div className="px-2 flex-1 whitespace-nowrap overflow-hidden">
                        <p className="font-heading text-eclipsis">{item?.product?.name}</p>
                        <div className="flex items-center gap-2">
                            <span>SL: {item?.quantity}</span>
                        </div>
                    </div>
                    <p className="min-w-[100px]">{vndFormat(item?.price)}</p>
                </div>))}

                <Separator/>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Trạng thái </FormLabel>
                             <Select  onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                   <SelectItem hideIndicator value='REQUESTED' className="pl-2"> Đã đặt </SelectItem>
                                   <SelectItem hideIndicator value='DONE' className="pl-2"> Hoàn Thành </SelectItem>

                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />



                <div className="pb-8">
                    <Button size='sm' type="submit" className={isLoading ? "pointer-events-none" : ""}>
                       Cập nhật
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>

                  
                </div>
            </form>
        </Form>

    )
}
