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
import Link from "next/link"
import { useGetBusinessInfo, useGetBusinessTags } from "@/lib/http"
import { Switch } from "./ui/switch"
import slugify from "slugify"
import { toast, useToast } from "./ui/use-toast"
import { useEffect, useState } from "react"
import { BadgeCheck, Facebook, Globe, Loader2, MapPin, Phone } from "lucide-react"
import { Badge } from "./ui/badge"



let validationSchema = z.object({
    phone: z.string().optional(),
    website: z.string().optional(),
    facebookUrl: z.string().optional(),
    googleMapsUrl: z.string().optional(),
    displayContact: z.boolean().optional(),
    address: z.string().optional()

})



export function UpdateBusinessContactVerified({ businessId }: { businessId?: string }) {

    // const { data } = useGetBusinessInfo(businessId);

    const form = useForm({
        resolver: zodResolver(z.object({
            phone: z.any().optional(),
            website: z.any().optional(),
            facebookUrl: z.any().optional(),
            displayContact: z.any().optional(),
            googleMapsUrl: z.any().optional(),
        })),
        defaultValues: async () => {
            const response = await fetch(`/api/business/${businessId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json())

            setInitData(response)
            return {
                ...response,

            }

        }
    })
    const { toast } = useToast();



    const { data: businessTags } = useGetBusinessTags();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [initData, setInitData] = useState(null);
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof validationSchema>) {
        let formattedValues = {
            ...values,
        }


        let searchparams = new URLSearchParams();
        searchparams.set('url', formattedValues.googleMapsUrl as string);

        let googleMapsUrlEmbeded: any = null;
        if(formattedValues?.googleMapsUrl){
            let res = await fetch(`/api/google/get-embeded?${searchparams.toString()}`)
            let data = await res.json()
            googleMapsUrlEmbeded = data?.embededUrl;
        }
     
       

        setIsLoading(true)
        try {
            let res = await fetch(`/api/business/${businessId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ...formattedValues,
                    googleMapsUrlEmbeded
                }),
                redirect: "manual",
            })

            if (res.ok) {
                toast({
                    title: "Chỉnh sửa thành công",
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
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">
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

                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">Số điện thoại liên hệ <Phone className="w-4 h-4" /></FormLabel>
                            <FormControl>
                                <Input placeholder="+84" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}

                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">Trang web <Globe className="w-4 h-4" /></FormLabel>
                            <FormControl>
                                <Input placeholder="www" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}

                    name="facebookUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">Link FB <Facebook className="w-4 h-4" /></FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}

                    name="googleMapsUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">Link Google Maps <MapPin className="w-4 h-4" /></FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!!initData?.['googleMapsUrlEmbeded'] ? <div className="relative overflow-hidden w-full min-w-[340px] aspect-video">
                <iframe
                    //   frameborder="0"
                    //   style="border:0"
                    className="w-full h-full absolute rounded-md border border-input top-0 left-0"
                    src={initData?.['googleMapsUrlEmbeded']}

                >
                </iframe>
                </div> : null}
                



                <FormField
                    control={form.control}
                    name="displayContact"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center flex-wrap justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base gap-1">Hiển thị thông tin liên hệ {!form.getValues('verified') && <Badge variant={'secondary'}>Chưa xác minh</Badge>} </FormLabel>

                                {!initData?.['verified'] && <FormDescription className="inline-flex flex-wrap gap-1 items-center">
               
                                    Liên hệ để xác minh trang, mở khoá nhiều tính năng và nhận huy hiệu.
                                    <BadgeCheck className='w-6 h-6 fill-sky-600 stroke-white' />
                                </FormDescription>}

                                {initData?.['verified'] && <FormDescription>

                                    <p className="inline-flex flex-wrap gap-1 items-center">
                                    Trang đã được xác minh. Có thể hiển thị thông tin liên hệ trên hồ sơ trang.  <BadgeCheck className='w-6 h-6 fill-sky-600 stroke-white' /> </p>
                                </FormDescription>}
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


                {/* <Places2/> */}






                <Button size='sm' type="submit" className={isLoading ? "pointer-events-none" : ""}>
                    Cập nhật
                    {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                </Button>
            </form>
        </Form>
    )
}
