"use client";

import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import BusinessPageCard from "./public-page-card";
import { CardSkeleton } from "./card-skeleton";
import LoaderSkeleton from "./loader-skeleton";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useGetBusinessTags } from "@/lib/http";
import SearchBarFilter from "./search-bar";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

type QueryParams = {
    take?: number;
    lastCursor?: string;
    tag?: string
};

const fetchData = async ({ take, lastCursor, tag }: QueryParams) => {
    let searchQuery = new URLSearchParams();
    if (take) {
        searchQuery.append('take', `${take}`)
    }

    if (lastCursor) {
        searchQuery.append('cursor', lastCursor)
    }

    if (tag) {
        searchQuery.append('tag', tag)
    }

    const response = await axios.get("/api/public/business-query", {
        params: { take, lastCursor, tag },
    });
    return response?.data;
};

const useDebounce = (callback: Function | null, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
  
    useEffect(() => {
      if (callback !== null) {
        const debounceHandler = setTimeout(() => {
          if (callback) {
            callback(debouncedValue);
          }
        }, delay);
  
        return () => {
          clearTimeout(debounceHandler);
        };
      }
    }, [callback, delay, debouncedValue]);
  
    return debouncedValue;
  };






const SearchPage = ({}) => {
    // to know when the last element is in view
    const { ref, inView } = useInView();
    const router = useRouter();
    const pathname = usePathname()
    const params = useSearchParams()
    const [isPending, startTransition] = useTransition();

    const [text, setText] = useState("");


    // useInfiniteQuery is a hook that accepts a queryFn and queryKey and returns the result of the queryFn
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = "" }) =>
            fetchData({ take: 10, lastCursor: pageParam, tag: params?.get('tag') ?? '' }),
        queryKey: ["businesses"],

        getNextPageParam: (lastPage) => {
            return lastPage?.metaData.lastCursor;
        },
    });

    const handleChange = (e) => {
        startTransition(() => {
            setText(e?.target?.value ?? '')
        })
    }

    const debouncehandleChange = debounce(handleChange)


    const { data: businessTags } = useGetBusinessTags()

    useEffect(() => {
        // if the last element is in view and there is a next page, fetch the next page
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, inView, fetchNextPage]);

    if (error as any)
        return (
            <div className="mt-10">
                {"An error has occurred: " + (error as any).message}
            </div>
        );

    // console.log("data:",data);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">

                <Select value={params?.get('tag') ?? ""} onValueChange={(e) => router?.push(pathname + `?tag=${e}`)} >
                    <SelectContent className="relative">
                        <SelectItem value="" hideIndicator className="whitespace-nowrap text-xs w-full overflow-hidden pl-2 text-ellipsis">Tất cả</SelectItem>
                        {businessTags?.map((item: any) => <SelectItem hideIndicator value={item?.id} key={item?.id} className="whitespace-nowrap text-xs w-full overflow-hidden pl-2 text-ellipsis">{item.name}</SelectItem>)}
                       
                    </SelectContent>
                    <SelectTrigger className="w-full h-9 md:w-[300px] rounded-lg">
                        <SelectValue className="w-full" placeholder="chọn" />
                    </SelectTrigger>
                </Select>
                <SearchBarFilter/>
            </div>
            <div className="flex gap-2 flex-wrap">
                {isSuccess &&
                    data?.pages.map((page) =>
                        page.data.map((item: any, index: number) => {
                            // if the last element in the page is in view, add a ref to it
                            if (page.data.length === index + 1) {
                                return (
                                    <BusinessPageCard
                                        ref={ref}
                                        key={item.id}
                                        data={item}
                                    />

                                );
                            } else {
                                return (
                                    <BusinessPageCard
                                        key={item.id}
                                        data={item}
                                    />
                                );
                            }
                        })
                    )}


            </div>

            {(isLoading || isFetchingNextPage) && <LoaderSkeleton className="my-2" ></LoaderSkeleton>}
        </div>
    );
};

export default SearchPage;