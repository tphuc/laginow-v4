"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

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


function useGetBusiness(text?: string){
    
  const { data, error, isLoading } = useSWR(() => text ? `/api/public/business-query?value=${text}&take=10` : null, async (url) => {
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

export default function SearchBarFilter() {
  const [search, setSearch] = useState('');
  const ref = useRef<any>();
  const [open, setOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 500);

  const {data, isLoading} = useGetBusiness(debouncedSearch)
  const handleInputChange = (e: any) => {
    
    let value = e?.target?.value
    setSearch(value)

    // if (search && !open) {
    //   setOpen(true)
    //   ref?.current?.focus()
    // }
    // e?.preventDefault()
  }


    return <Popover open={open} onOpenChange={setOpen}>
       
       <PopoverAnchor className="w-full md:w-auto">
          <Input ref={ref} value={search} onChange={handleInputChange}  
          onClick={(e) => {
            setOpen(true)
            e.preventDefault()
            ref?.current?.focus()
          }}  
          placeholder="Tìm kiếm..." className="w-full h-9 md:w-[360px] border border-input inline-flex rounded-lg" size={0.5} />
          
        </PopoverAnchor>
        <PopoverContent align="start" sideOffset={0} autoFocus={false} className="p-1 w-[320px] md:w-[500px] flex min-h-[60px] flex-col max-h-[400px] overflow-scroll scrollbar-hide">
          {(!data?.data?.length && !isLoading) && <p className="text-sm text-muted-foreground p-2">Nhập thêm từ khoá để tìm kiếm...</p>}
          {isLoading && <LoaderSkeleton/>}
          {data?.data?.map((item: any) => <Link href={`/t/${item?.id}`} className="p-1 gap-2 rounded-md flex cursor-pointer hover:bg-secondary" key={item?.id}>
            <Image className="rounded-sm border border-input aspect-square" src={item?.banner?.url ?? '/placeholder.svg'} alt='' width={50} height={50}/>
            <div className="flex-1">
            <p className="text-sm font-medium font-heading truncate">{item?.title}</p>
            <div className="flex flex-nowrap text-ellipsis overflow-hidden" >{item?.tags?.map((item) => <p className="truncate text-xs text-muted-foreground" key={item?.id}>{item?.name}</p>)}</div>
            <p className="text-xs w-[200px] whitespace-nowrap" >{item?.address}</p>
            </div>
          </Link>)}
        </PopoverContent>
    </Popover>
}