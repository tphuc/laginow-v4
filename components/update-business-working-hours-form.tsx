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
import { ArrowRight, Loader2, Minus } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { CardSkeleton } from "./card-skeleton"


interface DateWorkingHrsProps {
    onChange?: (value: { startTime?: string | null; endTime?: string | null; isOff?: boolean }) => void;
    defaultValue?: { startTime?: string | null; endTime?: string | null; isOff?: boolean };
}

const DateWorkingHrs: React.FC<DateWorkingHrsProps> = ({ onChange, defaultValue }) => {
    const [workingHours, setWorkingHours] = useState(defaultValue ?? { startTime: null, endTime: null, isOff: true });


    useEffect(() => {
        if (defaultValue) {
            setWorkingHours(defaultValue)
        }
    }, [defaultValue])

    const handleStartTimeChange = useCallback((value: any) => {
        const startTime = value;
        setWorkingHours?.({ ...workingHours, startTime });
        onChange?.({ ...workingHours, startTime })
    }, [workingHours]);

    const handleEndTimeChange = useCallback((value: any) => {
        const endTime = value;
        setWorkingHours?.({ ...workingHours, endTime });
        onChange?.({ ...workingHours, endTime })
    }, [workingHours]);

    const handleIsOffChange = useCallback((checked: boolean) => {
        let isOff = !!checked
        setWorkingHours?.({ ...workingHours, isOff });
        onChange?.({ ...workingHours, isOff })
    }, [workingHours]);

    return (
        <div className="flex items-center gap-2 px-2 flex-wrap">
            <Select value={workingHours?.startTime ?? ''} onValueChange={handleStartTimeChange}>
                <SelectTrigger disabled={workingHours.isOff} className="w-[90px] h-[32px]">
                    <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 25 }, (_, index) => {
                        const hours = String(index).padStart(2, '0');
                        const minutes = '00'; // For 00 minutes
                        return `${hours}:${minutes}`;
                    })?.map((item: any) => <SelectItem key={item} value={`${item}`}>{item}</SelectItem>)}
                    {/* <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem> */}
                </SelectContent>
            </Select>


            <Select value={workingHours.endTime ?? ''} onValueChange={handleEndTimeChange}>
                <SelectTrigger disabled={workingHours.isOff} className="w-[90px] h-[32px]">
                    <SelectValue placeholder="Đến" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 25 }, (_, index) => {
                        const hours = String(index).padStart(2, '0');
                        const minutes = '00'; // For 00 minutes
                        return `${hours}:${minutes}`;
                    })?.map((item: any) => <SelectItem key={item} value={`${item}`}>{item}</SelectItem>)}
                </SelectContent>
            </Select>

            <div></div>

            <div className="flex items-center space-x-2">
                <Checkbox checked={workingHours?.isOff} onCheckedChange={handleIsOffChange} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Nghỉ
                </label>
            </div>
        </div>
    );
};




export function UpdateBusinessWorkingHrsForm({ businessId }: { businessId?: string }) {

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
            return {
                mon: response?.workingHrs?.mon,
                tue: response?.workingHrs?.tue,
                wed: response?.workingHrs?.wed,
                thu: response?.workingHrs?.thu,
                fri: response?.workingHrs?.fri,
                sat: response?.workingHrs?.sat,
                sun: response?.workingHrs?.sun
            }

        }
    })
    const { toast } = useToast();


   

    // 2. Define a submit handler.
    async function onSubmit(values) {
        let formattedValues = {
            ...values,
        }

        setIsLoading(true)
        try {
            let res = await fetch(`/api/business/${businessId}`, {
                method: "POST",
                body: JSON.stringify({
                    workingHrs: formattedValues
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
            toast({
                title: e.message ?? "Lỗi xảy ra",
                variant: "destructive"
            })
        }
        setIsLoading(false)
    }

    if(preloading){
        return <CardSkeleton/>
    }

    return (

            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">

                    <FormField
                        control={form.control}
                        name="mon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 2</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 3</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="wed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 4</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="thu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 5</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fri"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 6</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thứ 7</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sun"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CN</FormLabel>
                                <FormControl>
                                    <DateWorkingHrs defaultValue={field.value} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <br />
                    <Button size='sm' type="submit" className={isLoading ? "pointer-events-none" : ""}>
                        Cập nhật
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                </form>
            </Form>

    )
}
