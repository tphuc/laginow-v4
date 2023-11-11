import BusinessPageCard from "@/components/public-page-card";
import PublicPostCard from "@/components/public-post-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import db from '@/lib/prisma'



async function fetchData(url: string) {

    try {
        let res = await fetch(`${url}`, {
            method: "GET",
            cache: "no-cache",
            // next: {
            //     revalidate: 3600
            // }

        })

        let data = await res.json()

        return data?.data
    }
    catch (e) {
        console.log(e)
        return null
    }
}

async function fetchBusiness(){


    let skip = 0
    let take = 20
    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

    let where = {
      // published: true,
    }

    let data = await db.business?.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        tags: true
      },
      skip: skip,
      take: take,
    
    })

    return data
}

async function fetchPost(){


    let skip = 0
    let take = 20



    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

    let where = {
      // published: true,
    }

 
    let data = await db.post?.findMany({
        where: where,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: true
        },
        skip: skip,
        take: take,
  
      })
  
    return data

}







// export const preferredRegion = 'home'
// export const dynamic = 'auto'



export default async function Page() {

    let businessPages = await fetchData(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/public/business?take=10`)
    // let businessPages = await fetchBusiness()
    // let posts = await fetchPost()
    let posts = await fetchData(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/public/post?take=10`)



    return <div className="relative space-y-5 max-w-screen-xl w-full gap-2">


        <div className="shadow-sm border bg-gray-100 border-input aspect-video rounded-lg overflow-hidden h-80 w-full text-white text-center flex items-center justify-center">
            <Image alt='' width={400} height={300} className="ml-[40%] object-cover rounded-sm" src={'/hero.svg'} />
            <div className="absolute top-2 left-2 p-[4.5%] space-y-4">
                <p className={"text-secondary-foreground text-3xl md:text-5xl font-heading text-left pr-[10%] md:pr-[45%]"}>Tạo trang kinh doanh của bạn trên Lagi Now</p>
                <p className="text-secondary-foreground text-xl text-2xl text-left text-gray-400 pr-[10%]">Kết nối và quảng bá đến cộng đồng</p>
                <Link
                    href="/login?redirect=business.create"
                    className="flex"
                >
                    <Button  variant={'default'}> Đăng ký </Button>
                </Link>

            </div>
        </div>

        <br />
        <div className="w-full flex gap-2 flex-wrap">
            <Link href='/' className="rounded-xl w-full md:w-auto overflow-hidden ">
                <div className="relative w-full min-w-[280px] md:max-w-[280px] overflow-hidden bg-white">
                    <Image className="w-full md:w-[280px] h-[280px] aspect-video object-cover transition ease-in-out hover:scale-[1.05]" width={200} height={200} src={'/boba.jpeg'} alt={''} />
                    <div className="absolute top-0 left-0 w-full h-full bg-overlayGradient"></div>
                    <div className="font-heading text-white absolute text-2xl bottom-2 left-2 p-[5%]">
                        Thức uống chuộng
                    </div>
                </div>

            </Link>

            <Link href='/' className="rounded-xl w-full md:w-auto overflow-hidden">
                <div className="relative w-full min-w-[280px] md:max-w-[280px] overflow-hidden bg-white">
                    <Image className="w-full md:w-[280px] h-[280px] aspect-video object-cover transition ease-in-out hover:scale-[1.05]" width={200} height={200} src={'/food.jpeg'} alt={''} />
                    <div className="absolute top-0 left-0 w-full h-full bg-overlayGradient"></div>
                    <div className="font-heading text-white absolute text-2xl bottom-2 left-2 p-[5%]">
                        Món ăn yêu thích
                    </div>
                </div>

            </Link>

            <Link href='/' className="rounded-xl w-full md:w-auto overflow-hidden">
                <div className="relative w-full min-w-[280px] md:max-w-[280px] overflow-hidden bg-white">
                    <Image className="w-full md:w-[280px] h-[280px] aspect-video object-cover transition ease-in-out hover:scale-[1.05]" width={200} height={200} src={'/coffee2.jpeg'} alt={''} />
                    <div className="absolute top-0 left-0 w-full h-full bg-overlayGradient"></div>
                    <div className="font-heading text-white absolute text-2xl bottom-2 left-2 p-[5%]">
                        Quán coffee chill
                    </div>
                </div>

            </Link>
            <Link href='/' className="rounded-xl w-full md:w-auto overflow-hidden">
                <div className="relative w-full min-w-[280px] md:max-w-[280px] overflow-hidden bg-white">
                    <Image className="w-full md:w-[280px] h-[280px] aspect-video object-cover transition ease-in-out hover:scale-[1.05]" width={200} height={200} src={'/night.jpeg'} alt={''} />
                    <div className="absolute top-0 left-0 w-full h-full bg-overlayGradient"></div>
                    <div className="font-heading text-white absolute text-2xl bottom-2 left-2 p-[5%]">
                        Địa điểm giải trí
                    </div>
                </div>

            </Link>
        </div>
        <br />
        <p className="text-3xl font-heading">Trang nổi bật</p>

        <Suspense fallback={<Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}>
            <div className="flex gap-2 flex-wrap">
                {
                    businessPages?.map((item: any, index: any) => <BusinessPageCard
                        data={item}
                        key={`${index}_${item?.id}`}
                    />)
                }
            </div>
        </Suspense>

        <br />
        <p className="text-3xl font-heading">Bài viết nổi bật</p>
        <Suspense fallback={<Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}>
            <div className="flex gap-2 flex-wrap">
                {
                    posts?.map((item: any, index) => <PublicPostCard
                        data={item}
                        key={`${index}_${item?.id}`}
                    />)
                }
            </div>
        </Suspense>

    </div>
}