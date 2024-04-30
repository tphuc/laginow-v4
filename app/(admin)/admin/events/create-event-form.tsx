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
import { cn, startOfDayVN } from "@/lib/utils"
import { vi } from "date-fns/locale"
import { useGetResource } from "@/lib/http"
import CollectionList from "@/components/collection-list"
import { MultiSelect2 } from "@/components/ui/multi-select-2"





export function CreateEventForm({ availableVouchers }) {

    const form = useForm({
        resolver: zodResolver(z.object({
            title: z.any(),
            image: z.any().optional(),
            description: z.any().optional(),
            visible: z.boolean().optional(),
            multiChoice: z.boolean().optional(),
            questions: z.any().optional(),
            answerText: z.any().optional(),
            date: z.any(),
            time: z.any(),
            adsPosts: z.any().optional(),
            adsPages: z.any().optional(),
            adsFB: z.any().optional(),
            vouchers: z.any()
        })),
        defaultValues: {
            title: "",
            image: undefined,
            description: "",
            visible: true,
            multiChoice: false,
            questions: null,
            answerText: '',
            date: undefined,
            time: '18:00',
            vouchers: []
        }
    })
    const {data: posts} = useGetResource('/api/posts')
    const {data: pages} = useGetResource('/api/business')

    // const {fetch: authFetch} = useRequestAuthenticated()



    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    // 2. Define a submit handler.
    async function onSubmit(values) {
        const { date, time, vouchers, adsPages, adsPosts, ...others } = values

        if (!date || !time) {
            form.setError('date', { message: 'Ngày và giờ bắt buộc' })
            return
        }
        if (!values.multiChoice && !values.answerText) {
            form.setError('answerText', { message: 'Bắt buộc' })
            return
        }

        let formattedValues = {
            ...others,
            time,
            date: format(new Date(date), 'dd/MM/yyyy'),
            vouchers: vouchers?.map?.(item => ({
                id: item.value
            })),
            adsPages: adsPages?.map?.(item => ({
                id: item.value
            })),
            adsPosts: adsPosts?.map?.(item => ({
                id: item.value
            }))
            // tzDatetime: VNDatetimeToISO( format(new Date(date), 'dd/MM/yyyy'), time)
        }

        setIsLoading(true)
        try {
            console.log(formattedValues)

            let res = await fetch('/api/admin/event-questions', {
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
        <div className="relative w-full  h-[96vh] scrollbar-hide overflow-scroll">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên câu hỏi (*)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên câu hỏi" {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh câu hỏi đính kèm nếu có</FormLabel>
                                <ImageUploader value={field.value} onChange={field.onChange} imageClassName="w-full max-w-none max-h-none" className="w-full h-auto" />
                                <FormDescription>

                                </FormDescription>
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

                    <div className="grid grid-cols-12 gap-2">

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col col-span-8">
                                    <FormLabel>Ngày</FormLabel>
                                    <Popover modal={true}>
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
                                            style={{ zIndex: 500 }}
                                            align="start"
                                        >
                                            <Calendar
                                                locale={vi}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < startOfDayVN(new Date())
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
                            name="time"
                            render={({ field }) => (
                                <FormItem className="col-span-4 flex flex-col">
                                    <FormLabel>
                                        Giờ
                                    </FormLabel>
                                    <FormControl aria-required>
                                        <Input
                                            type="time"
                                            className="h-9"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={form.control}
                        name="multiChoice"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2 px-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Loại câu hỏi nhiều lựa chọn</FormLabel>
                                    <FormDescription>Bạn sẽ liệt kê các lựa chọn</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        defaultChecked={field.value}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {
                        !!form.watch('multiChoice') && <FormField
                            // control={form.control}
                            name="questions"
                            render={({ field }) => (
                                <FormItem className="p-2 px-3 bg-secondary/20 border rounded-sm">
                                    <FormLabel>Lựa chọn trả lời</FormLabel>
                                    <FormDescription>Bật ✅ nếu là lựa chọn hợp lệ</FormDescription>
                                    <FormControl>
                                        <DynamicQuestion defaultValue={field.value ?? []} onChange={field?.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }

                    {!form.watch('multiChoice') && <FormField
                        control={form.control}
                        name="answerText"
                        render={({ field }) => (
                            <FormItem className="p-2 space-y-1 px-3 bg-secondary/20 border rounded-sm">
                                <FormLabel>Điền câu trả lời hợp lệ</FormLabel>
                                <FormDescription>Hệ thống sẽ kiểm tra đáp án trùng khớp</FormDescription>
                                <FormControl>
                                    <Input placeholder="Đáp án đúng" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}

                    <FormField
                        control={form.control}
                        name="vouchers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mã Voucher Thưởng</FormLabel>
                                <FormControl>
                                    <MultiSelect2
                                        defaultValue={field.value}
                                        items={availableVouchers?.map?.(item => ({
                                            value: item.id,
                                            label: `${item.code} (${item?.business?.title})`
                                        }))} placeholder="chọn mã" max={10} onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Phần thưởng cho người được chọn
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <br />

                    <p className="font-heading text-lg">Quảng cáo</p>


                    <FormField
                        name="adsPages"
                        render={({ field }) => (
                            <FormItem className="p-2 px-3 bg-secondary/20 border rounded-sm">
                                <FormLabel>Trang được QC</FormLabel>
                                <FormDescription>  </FormDescription>
                                <FormControl>
                                    <MultiSelect2
                                        defaultValue={field.value}
                                        items={pages?.map?.(item => ({
                                            value: item.id,
                                            label: `${item?.title}`
                                        }))} 
                                        placeholder="chọn" max={3} onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="adsPosts"
                        render={({ field }) => (
                            <FormItem className="p-2 px-3 bg-secondary/20 border rounded-sm">
                                <FormLabel>Bài viết được QC</FormLabel>
                                <FormDescription>  </FormDescription>
                                <FormControl>
                                    <MultiSelect2
                                        defaultValue={field.value}
                                        items={posts?.map?.(item => ({
                                            value: item.id,
                                            label: `${item?.title}`
                                        }))} 
                                        placeholder="chọn" max={3} onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="adsFB"
                        render={({ field }) => (
                            <FormItem className="p-2 px-3 bg-secondary/20 border rounded-sm">
                                <FormLabel>Bài viết FB QC</FormLabel>
                                <FormDescription> Dán link FB vào dưới </FormDescription>
                                <FormControl>
                                    <CollectionList defaultValue={field.value ?? []} onChange={field?.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className={"sticky gap-2 rounded-sm bottom-0 w-full left-0"}>
                        Xác nhận <CheckCircle className="w-4 h-4" />
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
