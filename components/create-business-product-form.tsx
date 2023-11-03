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
import { toast, useToast } from "./ui/use-toast"
import { Suspense, useCallback, useEffect, useState } from "react"
import { CardSkeleton } from "./card-skeleton"
import { DialogContent, Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import ImageUploader from "./ui/image-uploader"
import { Textarea } from "./ui/textarea"
import Link from "next/link"
import { Switch } from "./ui/switch"
import { ProductCreateSchema } from "@/lib/dto"
import { useRouter } from "next/navigation"




export function CreateBusinessProductForm({ businessId, productId }: { businessId?: string; productId?: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [preloading, setIsPreloading] = useState<boolean>(false);
    const router= useRouter()
    const form = useForm({
        // resolver: zodResolver(FormBusinessCreateSchema),
        // defaultValues: async () => {
        //     setIsPreloading(true)
        //     const response = await fetch(`/api/products/${productId}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }).then(res => res.json())
        //     setIsPreloading(false)
        //     return response

        // }
    })

    const { toast } = useToast();

    async function update(values) {
        setIsLoading(true)
        let body = ProductCreateSchema.parse(values);

        try {
            let res = await fetch(`/api/business/${businessId}/product`, {
                method: "POST",
                body: JSON.stringify({
                    ...body
                }),
                redirect: "manual",
            })

            if (res.ok) {
                toast({
                    title: "Cập nhật thành công",
                    variant: "default"
                })
                router.refresh()
            }
        } catch (e) {
            console.log(e)
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
        setIsLoading(false)
    }

    if (preloading) {
        return <CardSkeleton />
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(update)} className="space-y-2 md:space-y-4">
                {/* <div>
                    <Link href={`/business/${businessId}/san-pham`}>
                        <Button size='sm' variant={'outline'} className="gap-2">
                            <ArrowLeft className="w-4 h-4 " strokeWidth={1.5} />
                            Trở về
                        </Button>
                    </Link>
                </div> */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên sản phẩm / dịch vụ (*)</FormLabel>
                            <FormControl>
                                <Input placeholder="Trà dâu 300ml" {...field} />
                            </FormControl>
                            <FormDescription>
                                không quá 264 kí tự.
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
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <Textarea placeholder="nhập mô tả ngắn..." {...field} />
                            </FormControl>
                            <FormDescription>
                                không quá 264 kí tự.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá (VND)</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="22000" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name='images'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ảnh</FormLabel>
                            <br />
                            <ImageUploader
                                defaultValue={field.value}
                                onChange={field.onChange}
                                style={{ display: "inline-flex" }}
                                className="min-w-[200px] min-h-[200px]"
                            />
                            <FormDescription>
                                Ít nhất 200px x 200px
                            </FormDescription>
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="orderable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Có thể đặt qua web</FormLabel>
                                <FormDescription>
                                    Khi khách hàng ấn đặt sẽ gửi thông báo về email của chủ trang
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

                <FormField
                    control={form.control}
                    name="visible"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Hiển thị trên web</FormLabel>
                                <FormDescription>
                                    Có thể tắt hiển thị nếu mặt hàng / dịch vụ hiện đang không khả dụng
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




                {/* <Sheet defaultOpen key={'right'}>
          <SheetTrigger asChild>
            <Button variant="outline">{'right'}</Button>
          </SheetTrigger>
          <SheetContent side={'right'}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet> */}
                <div className="pb-8">
                    <Button size='sm' type="submit" className={isLoading ? "pointer-events-none" : ""}>
                        Xác nhận
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </div>
            </form>
        </Form>

    )
}
