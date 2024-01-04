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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Link from "next/link"
import { useGetBusinessTags } from "@/lib/http"
import ImageUploader from "./ui/image-uploader"
import { Switch } from "./ui/switch"
import { MultiSelect } from "./ui/multi-select"
import MultiImageGrid from "./multi-image-uploader"
import { FormBusinessCreateSchema } from "@/lib/dto"
import slugify from "slugify"
import { toast, useToast } from "./ui/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {  useRouter, useSearchParams } from "next/navigation"





export function CreateBusinessForm() {

    const form = useForm({
        resolver: zodResolver(FormBusinessCreateSchema),
    })



    const { toast } = useToast()
    let { data: businessTags } = useGetBusinessTags();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormBusinessCreateSchema>) {
        let formattedValues = {
            ...values,
            slug: slugify(values.title, { lower: true, replacement: '-', locale:'vi', remove: /[^a-zA-Z0-9\s]/g  }),
            tags: values?.tags?.map(item => ({
                id: item.value
            }))
        }

        setIsLoading(true)
        try {
            let res = await fetch('/api/business', {
                method: "POST",
                body: JSON.stringify(formattedValues),
                redirect: "manual",
            })


            if (res.ok) {
                toast({
                    title: "Tạo thành công",
                    variant: "default"
                })

                let page = await res.json()
                

                router.push(`/dashboard/pages`)

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
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-8">
                {/* <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="gap-1 w-full sm:space-y-0 space-y-2 flex-wrap flex justify-between items-center">
                            <div>
                                <FormLabel>Tên trang</FormLabel>
                                <FormDescription>
                                    Chọn tên cho trang kinh doanh của bạn
                                </FormDescription>
                            </div>

                            <div className="flex-1 min-w-[100px] mt-0">
                                <FormControl className="mt-0 float-right">
                                    <Input className="max-w-md" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>


                        </FormItem>
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên trang (*)</FormLabel>
                            <FormControl>
                                <Input placeholder="vd: Cửa hàng A" {...field} />
                            </FormControl>
                            <FormDescription>
                                Tên của trang, không quá 264 kí tự.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Danh mục (*)</FormLabel>
                            <FormControl>
                                <MultiSelect items={businessTags?.map(item => ({
                                    value: item.id,
                                    label: item.name,
                                    slug: item?.slug
                                }))} placeholder="chọn danh mục" max={2} onChange={field.onChange} defaultValue={field.value}></MultiSelect>
                            </FormControl>
                            {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn doanh mục kinh doanh" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data?.map((item: { id: any, name: any }) => {
                                        return <SelectItem value={item.id}>{item?.name}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select> */}
                            <FormDescription>
                                Tối đa 2 danh mục, bạn có thể thay đổi bất cứ lúc nào.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <Input placeholder="42 Thống Nhất..." {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    name='banner'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ảnh logo</FormLabel>
                            <ImageUploader value={field.value} onChange={field.onChange} className="w-full md:w-[220px]  h-auto aspect-square" />
                            <FormDescription>
                                Ảnh hiển thị tốt nhất với tỉ lệ 1:1, bạn có thể thay đổi bất cứ lúc nào.
                            </FormDescription>
                        </FormItem>
                    )}

                />

                {/* <FormField
                    control={form.control}
                    name="displayBanner"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Hiển thị ảnh bìa</FormLabel>
                                <FormDescription>
                                    Tắt hiển thị nếu bạn chưa có ảnh bìa
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                /> */}


                {/* <MultiImageGrid 
                getId={(item) => item.fileId}
                items={[
                    {fileId: "64edd08c88c257da33da3e99", url: "https://ik.imagekit.io/laginow4/Yellow_Creative_Noodle_Food_Promotion_Banner_-3_F8qhDjtJq.jpg", thumbnailUrl: "https://ik.imagekit.io/laginow4/tr:n-ik_ml_thumbna…ive_Noodle_Food_Promotion_Banner_-3_F8qhDjtJq.jpg", name: "Yellow_Creative_Noodle_Food_Promotion_Banner_-3_F8qhDjtJq.jpg", width: 6912,},
                    // {id:"2"}
                ]} /> */}









                <Button type="submit" size='sm' disabled={isLoading} className={isLoading ? "pointer-events-none" : ""}>
                    Xác nhận
                    {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                </Button>
            </form>
        </Form>
    )
}
