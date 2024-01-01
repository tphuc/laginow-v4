"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useSWR from 'swr'
import { PopoverAnchor } from "@radix-ui/react-popover";
import LoaderSkeleton from "./loader-skeleton";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Bus, Coffee, Home, Search, UtensilsCrossed } from "lucide-react";

import * as Portal from '@radix-ui/react-portal';


function useGetBusiness(text?: string) {

  const { data, error, isLoading } = useSWR(() => text ? `/api/public/business-query?text=${text}&take=10` : null, async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  })

  return {
    data,
    isLoading,
    error
  }

}

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBarFilter({ className }: { className?: string }) {
  const [search, setSearch] = useState('');
  const ref = useRef<any>();
  const [open, setOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetBusiness(debouncedSearch)
  const handleInputChange = (e: any) => {


    let value = e?.target?.value
    setSearch(value)

    if (!open) {
      setOpen(true)
      e.preventDefault()
      ref?.current?.focus()
    }
  }


  return <div className="relative">

    <div className="relative  w-full bg-white border px-2 rounded-lg shadow-sm md:w-auto flex items-center gap-1">
      <div className="text-muted-foreground rounded-lg">
        <Search className="w-4 h-4" />
      </div>
      <Input ref={ref} value={search} onChange={handleInputChange}
        onClick={(e) => {
          if(!open){
            setOpen(true)
            e.preventDefault()
            ref?.current?.focus()
          }
          else{
            setOpen(false)
          }
        }}
        onTouchStart={(e) => {
          setOpen(true)
          e.preventDefault()
          ref?.current?.focus()
        }}
        placeholder="Tìm kiếm..." className={cn("w-full min-h-9 border-none rounded-none md:w-[720px] inline-flex shadow-none", className)} size={0.5} />



    </div>
    <div className="mt-1 z-100 h-0 relative">
      {open ? <div
        style={{zIndex:400}}
        // align="start" sideOffset={0} autoFocus={false} 
        className="p-1  bg-white w-full shadow-sm border border-input rounded-md flex min-h-[60px] flex-col max-h-[400px] overflow-scroll scrollbar-hide">
        {(!data?.data?.length && !isLoading) && <p className="text-sm text-muted-foreground p-2">Nhập thêm từ khoá để tìm kiếm...</p>}
        {isLoading && <LoaderSkeleton />}
        {data?.data?.map((item: any) => <Link href={`/t/${item?.id}`} className="p-1 gap-2 rounded-md flex cursor-pointer hover:bg-secondary" key={item?.id}>
          <Image className="rounded-sm border border-input bg-slate-900 aspect-square" src={item?.banner?.url ?? '/placeholder.svg'} alt='' style={{objectFit:"cover"}} width={80} height={80} />
          <div className="flex-1">
            <p className="font-medium font-heading truncate">{item?.title}</p>
            <div className="flex flex-nowrap text-ellipsis overflow-hidden" >{item?.tags?.map((item) => <p className="truncate text-sm text-muted-foreground" key={item?.id}>{item?.name}</p>)}</div>
            <p className="w-[200px] text-sm whitespace-nowrap" >{item?.address}</p>
          </div>
        </Link>)}
        <div className="flex flex-wrap gap-2 pt-2">
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2" href='https://laginow.com/timkiem?tags=739Q,CkAF,Op8d,z0rr,MhZK,ejlq,jweb'>
            <UtensilsCrossed className="w-6 h-6 stroke-width-1" /> Ăn uống  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2" href='https://laginow.com/timkiem?tags=cTEb,oWwv,d9aF,dT5A'><Home className="w-6 h-6 stroke-width-1" /> Phòng trọ  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2" href='https://laginow.com/timkiem?tags=739Q'><Coffee className="w-6 h-6 stroke-width-1" /> Quán cafe  </Link>
        </div>
      </div>
      </div> : null}

    </div>
  </div>
}