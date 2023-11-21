"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

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
import { Search } from "lucide-react";


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

export default function SearchBarHome({ className }: { className?: string }) {
  const [search, setSearch] = useState('');
  const ref = useRef<any>();
  const [open, setOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetBusiness(debouncedSearch)
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

    <PopoverAnchor className="max-w-[800px] border border-gray-500 border bg-white px-2 py-1 rounded-full shadow-sm md:w-auto flex items-center gap-1">
      <div className="text-muted-foreground">
        <Search className="w-4 h-4" />
      </div>
      <Input ref={ref} value={search} onChange={handleInputChange}
        onClick={(e) => {
          setOpen(true)
          e.preventDefault()
          ref?.current?.focus()
        }}
        placeholder="Tìm kiếm..." className={cn("w-full border-none rounded-none w-full inline-flex shadow-none", className)} size={1} />
    </PopoverAnchor>
    <PopoverContent align="start" sideOffset={10} autoFocus={false} className="p-1 w-[90vw] md:w-[800px] flex min-h-[60px]  rounded-lg flex-col max-h-[400px] overflow-scroll overflow-x-hidden scrollbar-hide">
      {(!data?.data?.length && !isLoading) && <p className="text-sm text-muted-foreground p-2">Nhập thêm từ khoá để tìm kiếm...</p>}
      {isLoading && <LoaderSkeleton />}
      {data?.data?.map((item: any) => <Link href={`/t/${item?.id}`} className="p-1 gap-2  h-auto rounded-md flex flex-nowrap cursor-pointer hover:bg-secondary" key={item?.id}>
        <div style={{width:80, height:80}} className="w-1/5 aspect-square">
        <Image className="rounded-md border border-input overflow-hidden bg-gray-800 aspect-square h-[80px] w-[80px]" src={item?.banner?.url ?? '/placeholder.svg'} alt='' width={80} height={80} />
        </div>
        <div className="w-4/5">
          <p className="font-medium text-lg font-heading truncate">{item?.title}</p>
          <div className="flex flex-wrap truncate text-ellipsis" >{item?.tags?.map((item) => <p className="truncate text-sm text-muted-foreground" key={item?.id}>{item?.name}</p>)}</div>
          <p className="text-sm max-w-[300px] md:max-w-none truncate whitespace-nowrap" >{item?.address}</p>
        </div>
      </Link>)}
    </PopoverContent>
  </Popover>
}