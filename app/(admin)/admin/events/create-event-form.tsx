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





export function CreateEventForm() {

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
            time: z.any()
        })),
        defaultValues: {
            title: "",
            image: undefined,
            description: "",
            visible: true,
            multiChoice: false,
            questions: [],
            answerText: '',
            date: undefined,
            time: '18:00'
        }
    })

    // const {fetch: authFetch} = useRequestAuthenticated()



    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    // 2. Define a submit handler.
    async function onSubmit(values) {
        const { date, time, ...others} = values

        if(!date || !time){
            form.setError('date', {  message: 'Ngày và giờ bắt buộc'})
            return
        }
        if(!values.multiChoice && !values.answerText){
            form.setError('answerText', {  message: 'Bắt buộc'})
            return
        }

        let formattedValues = {
            ...others,
            time,
            date: format(new Date(date), 'dd/MM/yyyy'),
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
                    variant:"destructive"
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
        <div className="relative w-full scrollbar-hide">
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
                        form.watch('multiChoice') ? <FormField
                            control={form.control}
                            name="questions"
                            render={({ field }) => (
                                <FormItem className="p-2 px-3 bg-secondary/20 border rounded-sm">
                                    <FormLabel>Lựa chọn trả lời</FormLabel>
                                    <FormDescription>Bật ✅ nếu là lựa chọn hợp lệ</FormDescription>
                                    <FormControl>
                                        <DynamicQuestion defaultValue={field.value} onChange={field?.onChange} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        /> :
                            <FormField
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
                            />
                    }






                    <br />
                    <Button type="submit"  className={"sticky gap-2 rounded-sm bottom-0 w-full left-0"}>
                        Xác nhận <CheckCircle className="w-4 h-4" />
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
