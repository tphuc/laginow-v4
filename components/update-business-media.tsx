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
import { Suspense, useCallback, useEffect, useState } from "react"
import { CardSkeleton } from "./card-skeleton"




export function UpdateBusinessMedia({ businessId }: { businessId?: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [preloading, setIsPreloading] = useState<boolean>(false);

    const form = useForm({
        // resolver: zodResolver(FormBusinessCreateSchema),
        defaultValues: async () => {
            setIsPreloading(true)
            const response = await fetch(`/api/business/${businessId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json())
            setIsPreloading(false)
            return response

        }
    })
    const { toast } = useToast();




    async function update(values){

         try {
            let res = await fetch(`/api/business/${businessId}`, {
                method: "POST",
                body: JSON.stringify({
                    images: values
                }),
                redirect: "manual",
            })

            if (res.ok) {
                toast({
                    title: "Cập nhật thành công",
                    variant: "default"
                })
            }
        } catch (e) {
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
    }

    if (preloading) {
        return <CardSkeleton />
    }

    return (

        <Form  {...form}>
           
                
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                               
                                <MultiImageGrid
                                    defaultValue={field.value}
                                    getId={(item) => item?.fileId}
                                    onChange={async (value) => {
                                        console.log(value)
                                        await update(value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <br />
             
        </Form>

    )
}
