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
import { useGetBusinessInfo, useGetBusinessTags } from "@/lib/http"
import ImageUploader from "./ui/image-uploader"
import { Switch } from "./ui/switch"
import { MultiSelect } from "./ui/multi-select"
import MultiImageGrid from "./multi-image-uploader"
import { FormBusinessCreateSchema } from "@/lib/dto"
import slugify from "slugify"
import { toast, useToast } from "./ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Textarea } from "./ui/textarea"





export function UpdateBusinessForm({ businessId }: { businessId?: string }) {

    // const { data } = useGetBusinessInfo(businessId);

    const form = useForm({
        resolver: zodResolver(FormBusinessCreateSchema),
        defaultValues: async () => {
            const response = await fetch(`/api/business/${businessId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json())


            return {
                ...response,
                description: response?.description ?? '',
                tags: response.tags?.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
            }

        }
    })
    const { toast } = useToast();



    const { data: businessTags } = useGetBusinessTags();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormBusinessCreateSchema>) {
        let formattedValues = {
            ...values,
            slug: slugify(values.title, { lower: true, replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
            tags: values?.tags?.map(item => ({
                id: item.value
            }))
        }

        setIsLoading(true)
        try {
            let res = await fetch(`/api/business/${businessId}`, {
                method: "POST",
                body: JSON.stringify(formattedValues),
                redirect: "manual",
            })

            if (res.ok) {
                toast({
                    title: "Chỉnh sửa thành công",
                    variant: "default"
                })
            }
        } catch (e) {
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
        setIsLoading(false)
    }

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">

                <FormField
                    control={form.control}

                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên trang</FormLabel>
                            <FormControl>
                                <Input placeholder="Homestay Lagi..." {...field} />
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Giới thiệu về kinh doanh của bạn..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Thêm một vài dòng giới thiệu, mô tả
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
                                <MultiSelect
                                    defaultValue={field.value}
                                    items={businessTags?.map(item => ({
                                        value: item.id,
                                        label: item.name
                                    }))} placeholder="chọn danh mục" max={3} onChange={field.onChange}

                                />
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
                                Tối đa 2 danh mục
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
                            <Input
                                // defaultValue={data?.address}
                                placeholder="42 Thống Nhất ..."
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='banner'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ảnh bìa</FormLabel>
                            <br />
                            <ImageUploader
                                defaultValue={field.value}
                                onChange={field.onChange}
                                style={{ display: "inline-flex", objectFit: "cover" }}
                                className="min-w-[200px] min-h-[200px] aspect-square"
                            />
                            <FormDescription>
                                Ảnh hiển thị tốt nhất với tỉ lệ 1:1, bạn có thể thay đổi bất cứ lúc nào.
                            </FormDescription>
                        </FormItem>
                    )}

                />

                <FormField
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
                                    defaultValue={field.value}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />








                <Button size='sm' type="submit" className={isLoading ? "pointer-events-none" : ""}>
                    Cập nhật
                    {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                </Button>
            </form>
        </Form>
    )
}
