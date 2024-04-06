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
import { useGetBusinessTags, useRequestAuthenticated } from "@/lib/http"
import ImageUploader from "@/components/ui/image-uploader"
import { Switch } from "@/components/ui/switch"
import { toast, useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import DynamicQuestion from "@/components/dynamic-question"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { VNDatetimeToISO, cn } from "@/lib/utils"
import { vi } from "date-fns/locale"





export function CreateVoucherForm({businessId}) {

    const form = useForm({
        resolver: zodResolver(z.object({
            code: z.any(),
            description: z.any().optional(),
            availableFrom: z.any(),
            availableTo: z.any(),
        })),
        defaultValues: {
            code: "",
            description: "",
            availableFrom: new Date(),
            availableTo: undefined,
        }
    })

    // const {fetch: authFetch} = useRequestAuthenticated()



    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    // 2. Define a submit handler.
    async function onSubmit(values) {
    

      

        let formattedValues = {
            ...values
        }


        setIsLoading(true)
        try {
            console.log(formattedValues)

            let res = await fetch(`/api/business/${businessId}/voucher`, {
                method: "POST",
                body: JSON.stringify(formattedValues),
            })

            if (res.ok) {
                toast({
                    title: "Tạo thành công",
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
        <div className="relative w-full scrollbar-hide space-y-2">
            <h1 className="text-xl font-heading">Tạo Voucher (Mã giảm giá)</h1>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mã voucher / coupon (*)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập mã" {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả nếu có </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="mô tả" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

<FormField
                        control={form.control}
                        name="availableFrom"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ngày bắt đầu</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}

                                                className={cn(
                                                    "w-full text-left font-normal rounded-sm",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PP", { locale: vi })
                                                ) : (
                                                    <span>Chọn ngày</span>
                                                )}

                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        // style={{ zIndex: 100 }}
                                        align="start"
                                    >
                                        <Calendar
                                            locale={vi}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                        // initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="availableTo"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ngày hết hạn</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}

                                                className={cn(
                                                    "w-full text-left font-normal rounded-sm",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PP", { locale: vi })
                                                ) : (
                                                    <span>Chọn ngày</span>
                                                )}

                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        // style={{ zIndex: 100 }}
                                        align="start"
                                    >
                                        <Calendar
                                            locale={vi}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                        // initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



                  

                    <br />
                    <Button type="submit" className={"sticky gap-2 rounded-sm bottom-0 w-full left-0"}>
                        Xác nhận <CheckCircle className="w-4 h-4" />
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
