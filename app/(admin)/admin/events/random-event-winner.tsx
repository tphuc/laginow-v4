"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { useGetBusinessTags, useGetResource, useRequestAuthenticated } from "@/lib/http"
import ImageUploader from "@/components/ui/image-uploader"
import { Switch } from "@/components/ui/switch"
import { toast, useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { CheckCircle, Dice1, Dice2, Dice5, Loader2, User2, Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import DynamicQuestion from "@/components/dynamic-question"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, startOfDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { VNDatetimeToISO, cn, startOfDayVN } from "@/lib/utils"
import { vi } from "date-fns/locale"
import CollectionList from "@/components/collection-list"
import { MultiSelect2 } from "@/components/ui/multi-select-2"
import { MultiSelectAsync } from "@/components/ui/multi-select-async"
const { parse } = require('date-fns');





export function RandomizeEventWinner({ data }) {
    const form = useForm({

    })



    const { data: availableVouchers } = useGetResource('/api/admin/vouchers')
    const { data: posts } = useGetResource('/api/posts')
    const { data: pages } = useGetResource('/api/business')

    console.log(83, pages?.length)
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    // 2. Define a submit handler.
    async function onSubmit(values) {

        setIsLoading(true)
        try {

            let res = await fetch(`/api/admin/event-questions/${data?.id}/generate-winner`, {
                method: "POST",

            })

            if (res.ok) {
                let data = await res.json()
                console.log(73, data)
                toast({
                    title: "Cập nhật thành công",
                    variant: "default"
                })
                router.refresh()
            }
            else {
                toast({
                    title: "Có lỗi xảy ra",
                    variant: "destructive"
                })

            }
        } catch (e) {
            console.log(e);
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
        setIsLoading(false)
    }

    return (
        <div className="relative w-full h-[96vh] scrollbar-hide overflow-scroll">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <p className="text-xl font-heading">Câu hỏi</p>
                    <p>{data?.title}</p>

                    <p className="text-xl font-heading">Phần thưởng</p>
                    <div className="space-y-1">
                        {data?.prizeSnapshot?.map?.((item, id) => <p key={id}>
                            <p>{item?.code}</p>
                            <p className="text-muted-foreground">HSD: { item?.availableTo && format(new Date(item?.availableTo), 'PP', {locale:vi})}</p>
                        </p>)}
                    </div>

                    <p className="text-xl font-heading">Thống kê</p>
                    <p className="flex items-center gap-2">{data?.UserAnswer?.length} <Users className="w-4 h-4" /> đã tham gia</p>
                    <div className="max-h-[500px] bg-secondary/50 cursor-pointer rounded-sm p-4 border border-input overflow-y-scroll scrollbar-hide">
                        {data?.UserAnswer?.map?.((item, id) => <div key={id} className="space-y-1">
                            <p>{item?.user?.email}</p>
                            <p className="text-muted-foreground">{item?.answerText ?? 'ABC'}</p>
                        </div>)}
                    </div>
                    <p className="text-xl font-heading">Người thắng</p>
                    <div className="flex items-center gap-2">{data?.winners?.map?.(item => <span key={item?.email}>{item?.email}</span>)} </div>

                    <Button type="submit" 
                        // disabled={data?.winners?.length} 
                        className={"sticky gap-2 rounded-sm bottom-0 w-full left-0"}>
                        Chọn ngẫu nhiên người thắng <Dice5 className="w-4 h-4" />
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
