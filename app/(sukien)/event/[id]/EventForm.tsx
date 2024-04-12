"use client"

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
import { useForm } from "react-hook-form"
import { useGetBusinessTags } from "@/lib/http"
import { MultiSelect } from "@/components/ui/multi-select"
import { toast, useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"






export function EventForm({ data, defaultValue }) {
    const form = useForm({
        defaultValues: {
            choiceIndex: `${defaultValue?.choiceIndex}`,
            answerText: defaultValue?.answerText,
        },
        resolver: zodResolver(z.object({
            choiceIndex: z.any().optional().transform(d => parseInt(d)),
            answerText: z.string().optional()
        }))
    })
    const { toast } = useToast();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 2. Define a submit handler.
    async function onSubmit(values) {
        let formattedValues = {
            ...values,
        }
        console.log(40, formattedValues)
        setIsLoading(true)
        try {
            let res = await fetch(`/api/events/${data?.id}/submit-answer`, {
                method: 'POST',
                body: JSON.stringify({
                    ...formattedValues
                })
            })
            console.log(58, res)
            toast({
                title: "Trả lời thành công",
                variant: "default"
            })
            router?.refresh()

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
                {data?.multiChoice && <FormField
                    control={form.control}
                    name="choiceIndex"
                    render={({ field }) => (
                        <FormItem className="col-span-2 w-full">
                            <FormLabel className="text-center w-full text-muted-foreground">Chọn đáp án</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    disabled={defaultValue}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {data?.questions?.map((item, id) => <FormItem key={id} className="flex p-4 border rounded-md has-[:checked]:bg-indigo-700/10  has-[:checked]:border-indigo-700  items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={`${id}`} />
                                        </FormControl>
                                        <FormLabel className="font-normal text-lg text-indigo-700">{item?.title}</FormLabel>
                                    </FormItem>)}

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}

                {!data?.multiChoice && <FormField
                    control={form.control}
                    name="answerText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Câu trả lời</FormLabel>
                            <FormControl>
                                <Input disabled={defaultValue} placeholder="Điền đáp án của bạn" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />}


                <br />
                <div className="relative max-w-sm mx-auto">
                    {!defaultValue && <Button size='lg' type="submit" className={cn("w-full bg-indigo-600 text-lg rounded-sm", isLoading && "pointer-events-none")}>
                        Xác nhận
                        {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
                    </Button>
                    }
                    {defaultValue && <p className="text-center text-muted-foreground">Bạn đã trả lời câu hỏi. <br/> Kết quả và người thắng cuộc sẽ được công bố trên trang FB của chúng tôi.</p>}
                </div>
            </form>
        </Form>
    )
}
