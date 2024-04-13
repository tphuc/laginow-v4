"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
import { cn } from "@/lib/utils";
import { MultiSelect } from "./ui/multi-select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import useSWRInfinite from "swr/infinite";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button";
import { Filter } from "lucide-react";


type QueryParams = {
    take?: number;
    lastCursor?: string;
    tag?: string,
    tags?: string
};

const useFetch = (path, limit) => {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;
        const pageNumber = pageIndex + 1;
        return `https://fakestoreapi.com/${path}?_page=${pageNumber}&_limit=${limit}`;
    };


    const { data, error, size, setSize, } = useSWRInfinite(getKey, async (url) => {
        let res = await fetch(url)
        return await res.json()
    });

    const loadMore = () => setSize(size + 1);

    return {
        data: data ? data.flat() : [],
        isLoading: !error && !data,
        isError: error,
        loadMore,
        hasNextPage: data && data[data.length - 1]?.length === limit,
    };
};


const fetchData = async ({ take, lastCursor, tag, tags }: QueryParams) => {
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

    if (tags) {
        searchQuery.append('tags', tags)
    }


    const response = await fetch(`/api/public/business-query?${searchQuery?.toString()}`, {
        method: "GET"
    });
    let data = await response.json()
    return data;
};





const SearchPage = ({ masterTags, businessTags }: { masterTags, businessTags }) => {
    // to know when the last element is in view
    const { ref, inView } = useInView();
    const router = useRouter();
    const pathname = usePathname()
    const params = useSearchParams()


    let selectedTags = businessTags?.filter((item) => params?.get('tags')?.includes(item?.id))?.map(item => ({
        label: item?.name,
        value: item?.id
    }))

    // let searchTags = params?.get('tags') ? params?.get('tags')?.split(',') : []

    // useInfiniteQuery is a hook that accepts a queryFn and queryKey and returns the result of the queryFn
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryFn: ({ pageParam, queryKey }) => {
            return fetchData({ take: 10, lastCursor: pageParam, tag: params?.get('tag') ?? '', tags: queryKey?.[1] ?? '' })
        },
        staleTime: 100,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        queryKey: ["businesses", params?.get('tags')],
        getNextPageParam: (lastPage) => {
            console.log(130, lastPage?.metaData)
            if(lastPage?.metaData?.hasNextPage)
                return lastPage?.metaData?.lastCursor;
            else {
                return null
            }

        },
        
    });




    const onSearchTagsChange = (value) => {


        let newSearchParams = new URLSearchParams()
        newSearchParams?.set('tags', value?.map(item => item?.value)?.join(','))
        router.push(`${pathname}?${newSearchParams?.toString()}`)



    }


    // const { data: businessTags } = useGetBusinessTags()

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



    return (
        <div className={cn("relative  w-full flex flex-col lg:flex-row ",
            // "mx-auto max-w-screen-xl"
        )}>


            <div className="relative hidden md:block bg-background z-40 lg:w-1/5 p-6 space-y-2 sm:sticky top-[70px] h-full">
                <h2 className="text-xl text-accent-foreground font-heading mb-4"> Tìm kiếm </h2>
                <MultiSelect
                    className="p-1 border-none shadow-none rounded-lg"
                    defaultValue={selectedTags}
                    // defaultValue={searchTags?.map(item => ({value: item, label:item})) ?? []}
                    items={businessTags?.map(item => ({
                        value: item.id,
                        label: item.name
                    }))} placeholder="chọn danh mục" onChange={onSearchTagsChange}

                />

                <br />


            </div>
            <Sheet key={'right'}>
                <div className="flex md:hidden items-center gap-2 px-4 py-2">
                <SheetTrigger asChild>
                    <Button variant={'secondary'} className="inline-flex border border-input rounded-lg gap-2"> <Filter className="w-4 h-4"/> Tìm kiếm  </Button>
                </SheetTrigger>
                <span className="text-muted-foreground">    {selectedTags?.length ?  `${selectedTags?.length} đã chọn` : "" }</span>
             
                </div>
                <SheetContent>
                    <div className="relative">
                        <h2 className="text-xl text-indigo-900 font-heading mb-4"> Tìm kiếm </h2>
                        <MultiSelect
                            className="p-1 border-none shadow-none rounded-lg"
                            defaultValue={selectedTags}
                            // defaultValue={searchTags?.map(item => ({value: item, label:item})) ?? []}
                            items={businessTags?.map(item => ({
                                value: item.id,
                                label: item.name
                            }))} placeholder="chọn danh mục" onChange={onSearchTagsChange}

                        />
                        </div>
                </SheetContent>
            </Sheet>


            <div className="w-full lg:w-3/4  ">
                <div className="relative  w-full mx-auto px-4 max-w-screen-xl space-y-2 pb-20">
                    <div className="md:flex border-b md:border-b-0  w-full bg-background sticky top-[61px] md:top-[69px] py-2 items-center gap-2 flex-wrap z-40">
                        <SearchBarFilter className="py-4" />
                    </div>
                    {(isLoading || isFetchingNextPage) && <LoaderSkeleton className="my-2" ></LoaderSkeleton>}
                    {data?.pages?.[0]?.length === 0 && <p className="text-muted-foreground opacity-60">Không tìm thấy kết quả</p>}
                    <div className="flex gap-2 flex-wrap" >
                      
                        {isSuccess &&
                            data?.pages?.map((page) =>
                                page?.data?.map((item: any, index: number) => {
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

                </div>
            </div>
        </div>

    );
};

export default SearchPage;