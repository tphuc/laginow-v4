'use client';


'use client'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { usePathname, useSearchParams } from "next/navigation"
import NewsCard from "../(news)/NewsCard";

export default function PostCarousel({ data }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageURL = (productType) => {
        const params = new URLSearchParams(searchParams ?? '');
        params.set('productType', productType.toString());
        params.set('page', '1');
        return `${pathname}?${params.toString()}`;
    };


    return <Carousel opts={{
        align: "start",
        loop: true,
    }}
        plugins={[
            Autoplay({
                delay: 4000,
            }),
        ]}

        className="w-full">
        <CarouselPrevious />
        <CarouselContent className="gap-4">
            {data?.map((item, index) => {
                return <CarouselItem key={`${item?.id}_${index}`} className="relative text-left basis-1/1 md:basis-1/3 lg:basis-[25%]">
                    <NewsCard data={item}/>
                </CarouselItem>
            })}
        </CarouselContent>

        <CarouselNext />
    </Carousel>
}

