/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { User } from "next-auth"
import { useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { useGetResource, useGetUserInfo } from "@/lib/http"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { ArrowRight, Dice6, FerrisWheel, Minus, Plus, SheetIcon, ShoppingBag, ShoppingCart, Ticket, Trophy } from "lucide-react"
import LoaderSkeleton from "./loader-skeleton"
import Image from "next/image"
import { cn, vndFormat } from "@/lib/utils"
import { toast } from "./ui/use-toast"
import { Divider } from "@tremor/react"
import { useState } from "react"



export function UserTrophy() {
  const user = useSession()?.data?.user as any;

  let { data, isLoading: isFetchLoading } = useGetResource(`/api/users/${user?.id}/vouchers`);
  let { data: prizes, } = useGetResource(`/api/users/${user?.id}/prize`);
  console.log(prizes)
  return (
    <Sheet key={'right'}>
      <SheetTrigger asChild>
        <Button size='sm' variant={'ghost'} className="inline-flex text-accent-foreground relative rounded-lg gap-2 hover:bg-transparent">
          <Trophy className="w-6 h-6" strokeWidth={1.5} />
          {!!data?.length && <div className="absolute leading-[0] font-mono flex items-center justify-center bottom-0 text-xs rounded-full text-primary-foreground w-4 h-4 right-2 bg-accent-foreground">{data?.length}</div>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side={'right'}>


        <p className="font-heading flex items-center gap-2 text-primary text-2xl"> <Trophy className="w-8 h-8" /> Câu hỏi trúng thưởng </p>
        {isFetchLoading && <LoaderSkeleton />}
        <div className="max-h-[400px] overflow-scroll scrollbar-hide">
          {data?.map((item, id) => <div className="bg-secondary p-3 flex flex-col gap-1 rounded-sm border" key={id}>
            <p className="truncate font-heading text-ellipsis">{item?.title}</p>
            <Link href={`/event/${item?.id}`} className="bg-white flex items-center gap-2 justify-between mt-2 px-4 py-2 rounded-full text-sm text-primary border shadow-sm">
              Nhận phần thưởng <ArrowRight className="w-4 h-4" />
            </Link>
          </div>)}
        </div>
      

        <div>
          <p className="font-heading flex items-center gap-2 text-primary text-2xl"> <Ticket className="w-8 h-8" /> Đổi quà </p>
          <p className="text-muted-foreground"> Liên hệ admin để đổi quà </p>
          <div className="max-h-[400px] overflow-scroll scrollbar-hide pt-2">
          {prizes?.map((item, id) => <Link href={`/event/${item?.eventId}`}  className="bg-secondary p-3 flex flex-col gap-1 rounded-sm border" key={id}>
            <p className="flex items-center truncate gap-2 underline font-heading text-primary text-ellipsis">{item?.prize?.code} <Ticket className="w-4 h-4"/></p>
            <p className="truncate text-ellipsis">{item?.prize?.description}</p>
          </Link>)}
        </div>
        </div>


      </SheetContent>
    </Sheet>
  )
}
