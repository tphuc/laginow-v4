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
import { FormBusinessCreateSchema, FormBusinessReviewCreateSchema } from "@/lib/dto"
import slugify from "slugify"
import { toast, useToast } from "./ui/use-toast"
import { useState } from "react"
import { Loader2, Plus, Star } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Textarea } from "./ui/textarea"
import StarRating from "./ui/stars-rating"





export function AddReviewButton({businessId}) {

    const form = useForm({
        resolver: zodResolver(FormBusinessReviewCreateSchema),
        defaultValues: {
            rating: 5,
            content: '',
            images: null
        }
    })
    const { toast } = useToast()
    let { data: businessTags } = useGetBusinessTags();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 2. Define a submit handler.
    async function onSubmit(values) {

        let formattedValues = {
            ...values,
        }

    
        setIsLoading(true)
        try {
            let res = await fetch(`/api/business/${businessId}/reviews`, {
                method: "POST",
                body: JSON.stringify(formattedValues),
                redirect: "manual",
            })

            if (res.ok) {
                toast({
                    title: "Thêm thành công",
                    variant: "default"
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


        <Sheet key={'right'}>
            <SheetTrigger asChild>
                <Button size='sm' variant={'secondary'} className="inline-flex border border-input rounded-lg gap-2"> <Star className="w-4 h-4" /> Đánh giá </Button>
            </SheetTrigger>
            <SheetContent side={'right'}>
                <SheetHeader>
                    <SheetTitle>Thêm đánh giá</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-8">

                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hài lòng (*)</FormLabel>
                                    <FormControl>
                                        <StarRating changeable {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nôị dụng</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hình ảnh</FormLabel>
                                    <FormControl>
                                        <MultiImageGrid
                                            className="w-[140px] h-[140px] min-w-[140px]"
                                            defaultValue={field?.value ?? []}
                                            getId={(item) => item?.fileId}
                                            onChange={field?.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />







                        <Button type="submit" size='sm' className={isLoading ? "pointer-events-none" : ""}>
                            Xác nhận
                            {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                        </Button>
                    </form>
                </Form>



            </SheetContent>
        </Sheet>


    )
}
