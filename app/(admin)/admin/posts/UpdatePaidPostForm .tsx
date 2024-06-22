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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useGetBusinessInfo, useGetBusinessTags } from "@/lib/http"
import ImageUploader from "@/components/ui/image-uploader"
import { Switch } from "@/components/ui/switch"
import { MultiSelect } from "@/components/ui/multi-select"

import { FormBusinessCreateSchema } from "@/lib/dto"
import slugify from "slugify"
import { toast, useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import {  updatePaidMarketingPosts } from "./actions"





export function UpdatePaidPosts({ defaultValue, allPosts }: { defaultValue?: any[], allPosts: any[] }) {

    // const { data } = useGetBusinessInfo(businessId);

  
    const form = useForm({
        defaultValues: async () => {
           return {
            posts: defaultValue?.map((item) => ({
                label: item?.title,
                value: item?.id
            }))
           }

        }
    })
    const { toast } = useToast();



    const { data: businessTags } = useGetBusinessTags();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 2. Define a submit handler.
    async function onSubmit(values) {
        let formattedValues = {
            ...values,
        }

   
        setIsLoading(true)
        try {
            
            let res = await updatePaidMarketingPosts(values?.posts?.map((item => ({
                id: item?.value
            }))))

            console.log(res)

          
                toast({
                    title: "Chỉnh sửa thành công",
                    variant: "default"
                })
            
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
                    name="posts"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bài viết hiển thị trang đầu được tài trợ (*)</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    defaultValue={field.value}
                                    items={allPosts?.length ? allPosts?.map(item => ({
                                        value: item.id,
                                        label: item.title
                                    })) : []} placeholder="chọn bài" max={3} onChange={field.onChange}

                                />
                            </FormControl>

                            <FormDescription>
                                Tối đa 2 danh mục
                            </FormDescription>
                            <FormMessage />
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
