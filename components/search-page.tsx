"use client";

import { useEffect } from "react";
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


type QueryParams = {
    take?: number;
    lastCursor?: string;
};

const fetchData = async ({ take, lastCursor }: QueryParams) => {
    let searchQuery = new URLSearchParams();
    if(take){
        searchQuery.append('take', `${take}`)
    }

    if(lastCursor){
        searchQuery.append('cursor', lastCursor)
    }

    const response = await axios.get("/api/public/business-query", {
        params: { take, lastCursor },
    });
    return response?.data;
};






const SearchPage = () => {
    // to know when the last element is in view
    const { ref, inView } = useInView();

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
            fetchData({ take: 10, lastCursor: pageParam }),
        queryKey: ["businesses"],

        getNextPageParam: (lastPage) => {
            return lastPage?.metaData.lastCursor;
        },
    });

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
                <Input placeholder="Tìm kiếm..." className="w-full h-9 md:w-[300px] inline-flex rounded-lg" size={0.5}/>
                <Select  >
                <SelectTrigger className="w-full h-9 md:w-[220px] rounded-lg">
                    <SelectValue placeholder="VN" />
                </SelectTrigger>
                <SelectContent className="relative">
                    {businessTags?.map((item: any) => <SelectItem hideIndicator  value={item?.id} key={item?.id} className="whitespace-nowrap w-full overflow-hidden pl-2 text-ellipsis">{item.name}</SelectItem>)}
                </SelectContent>
            </Select>
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