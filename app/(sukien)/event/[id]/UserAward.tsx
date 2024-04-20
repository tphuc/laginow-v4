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

import { toast, useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Wheel } from 'react-custom-roulette'
import WheelFortune from "@/components/wheel"










export default function UserAward({ data: _data }) {
  const data = _data?.prizeSnapshot?.map((item, id) =>
    <div key={id}>
      <span className="text-xs opacity-80 font-heading">{item.code} </span>
      <p className="text-sm">{item?.description}</p>
    </div>)
  const user = useSession()?.data?.user
  const params = useParams()
  const form = useForm({

  })
  const { toast } = useToast();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    let formattedValues = {
      ...values,
    }

    setIsLoading(true)
    try {
      let res = await fetch(`/api/events/${data?.id}/submit-answer`, {
        method: 'POST',
        body: JSON.stringify({
          ...formattedValues
        })
      })

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

  async function submitReward(prize) {
    try {
      let res = await fetch(`/api/events/${_data?.id}/submit-reward`, {
        method: 'POST',
        body: JSON.stringify({
          prize
        })
      })
      console.log(99, await res.json())
      if(res?.ok){
        toast({
          title: "Quay nhận thưởng thành công",
          description:"Kiểm tra phần thưởng hiển thị ở phía dưới",
          variant: "default"
        })
        router?.refresh()
      }
      else {
        toast({
          title: "Bạn không thể quay thưởng nữa",
          variant: "default"
        })
      }
     

    } catch (e) {
      toast({
        title: "Bạn không thể quay thưởng nữa",
        variant: "default"
      })
      // toast({
      //   title: e.message ?? "Lỗi xảy ra",
      //   variant: "destructive"
      // })
    }
    setIsLoading(false)
  }



  return (
    <Form  {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">
        <p className="text-center font-heading text-primary text-2xl"> 🎉 Chúc mừng bạn là người trúng thưởng 🎉</p>

        <div className={cn("w-full gap-2 flex flex-col items-center justify-center", data?.length === 1 && "")}>

          {/* <Wheel
            mustStartSpinning={mustSpin}
            // pointerProps={}
            spinDuration={0.3}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={['#6366f1', '#3b82f6', '#8b5cf6']}
            textColors={['#ffffff']}
            outerBorderColor="#eeeeee"
            radiusLineColor="#eeeeee"
            radiusLineWidth={1}
            startingOptionIndex={0}
            innerBorderWidth={1}
            outerBorderWidth={2}
          /> */}

          <WheelFortune items={data} onSelectItem={async (i) => await submitReward(_data?.prizeSnapshot?.[i])}></WheelFortune>
        </div>

        <div>

        </div>





        {/* <div className="relative max-w-sm mx-auto">
          <Button size='lg' onClick={handleSpinClick} className={cn("w-full bg-indigo-600 rounded-sm", isLoading && "pointer-events-none")}>
            Nhận phần thưởng
            {isLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
          </Button>
        </div> */}


      </form>
    </Form>
  )
}
