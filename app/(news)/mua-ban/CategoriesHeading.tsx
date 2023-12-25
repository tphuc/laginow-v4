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

export default function CategoriesHeading({ productTypes }) {
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
                delay: 2000,
            }),
        ]}

        className="w-full">
        <CarouselPrevious />
        <CarouselContent className="-ml-1">
            {productTypes.map((item, index) => {
                return <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/4 lg:basis-[12.5%]">
                    <Link className='flex flex-col items-center justify-between inline-block py-2 space-y-2' key={item?.id} href={createPageURL(item?.id)}>
                        <Image width={100} height={100} alt='' src={item?.url ?? ''} className='w-[100px] hover:scale-[1.05] transition transition-transform aspect-square rounded-lg ' style={{ objectFit: "contain" }} />
                        <p className="text-sm text-center hover:text-accent-foreground px-2">{item?.title}</p>
                    </Link>
                </CarouselItem>
            })}
        </CarouselContent>

        <CarouselNext />
    </Carousel>
}

//  {productTypes?.map((item) => <Link className='bg-accent flex flex-col items-center justify-between whitespace-nowrap inline-block p-2' key={item?.id} href='#'>
{/* <Image width={80} alt='' src={item?.url ?? ''} height={80} className='w-[80px] aspect-square' style={{objectFit:"contain"}} />
{item?.title}
</Link>)} */}