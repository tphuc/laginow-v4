import BusinessPageCard from "@/components/public-page-card";
import PublicPostCard from "@/components/public-post-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import db from '@/lib/prisma'
import BusinessPageCardTwo from "@/components/public-page-card-two";
import SearchSection from "./search-section";



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

async function fetchCountBusiness() {
    let data = await db.business?.count({})

    return data
}



async function fetchBusinessCollection(id: string) {

    const businessesInCollection = await db.collection.findUnique({
        where: { slug: id },
        include: {
            Business: true,
        },
    });

    return businessesInCollection?.Business ?? []

}

async function fetchTags() {
    const tags = await db.tag.findMany({
        include: {
            MasterTag: true
        }
    })

    return tags ?? []
}

async function fetchMasterTags() {
    const tags = await db.masterTag.findMany({
        include: {
            tags: true
        }
    })

    return tags ?? []
}

async function fetchBusinessHighRating() {

    const businessWithHighestRating = await db.business.findMany({
        where: {
            avgRating: {
                not: null
            }
        },
        take: 8,
        orderBy: [
            {
                avgRating: 'desc', // Order by avgRating in descending order
            },
            {
                Review: {
                    _count: 'desc', // Then, order by the number of reviews in descending order
                },
            },
        ],
    });

    return businessWithHighestRating

}







// export const preferredRegion = 'home'
// export const dynamic = 'auto'



export default async function Page() {

    let _businessPages = fetchData(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/public/business?take=24`)
    let _posts = fetchData(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/public/post?take=16`)
    let _totalBusiness = fetchCountBusiness()
    let _foodCollection = fetchBusinessCollection('do-an-yeu-thich')
    let _drinkCollection = fetchBusinessCollection('cafe-chill')
    let _businessRating = fetchBusinessHighRating()


    const [businessPages, posts, totalBusiness, foodCollection, drinkCollection, businessesHighRating, tags, masterTags] = 
    await Promise.all([_businessPages, _posts, _totalBusiness, _foodCollection, _drinkCollection, _businessRating, fetchTags(), fetchMasterTags()])


    return <div className="relative space-y-4 w-full gap-2">

        <div
            // className="shadow-sm relative w-full  max-w-screen-xl border bg-gray-100 border-input  rounded-lg overflow-hidden h-80 text-white text-center flex items-center justify-center"
            className="w-full "

        >
            <SearchSection />
            <div className="w-full bg-gray-100 border-b py-20 scrollbar-hide">
            <div className="px-4 mx-auto max-w-screen-xl scrollbar-hide grid gap-1 grid-rows-2 md:grid-rows-4 grid-flow-col gap-4 overflow-scroll">
                {masterTags?.map((item) => <Link href={`/timkiem?tags=${item?.tags?.map(item => item.id)?.join(',')}`} key={item?.id} className="pt-4 px-4 cursor-pointer rounded-xl bg-white text-sm min-w-[150px] border border-input">
                    <p className="font-heading px-2 text-lg">{item?.name}</p>
                    <Image src={item?.url ?? ''} alt='' width={80} height={80} className="w-[100px] h-auto aspect-square"></Image>
                </Link>)}
            </div>
            </div>
            <br />
            <div className="p-4 border border-slate-300 mx-auto px-4 relative container max-w-screen-xl text-xl font-heading bg-slate-100 opacity-80 text-left bg-gradient-to-r from-cyan-100 to-indigo-100 rgb(204, 251, 241)) rounded-lg border-md shadow-sm text-blue-900">
                <span className="text-2xl white pr-1">{totalBusiness}</span> trang đã đăng kí trên Lagi Now {" "}
                🎉
            </div>

        </div>

        <div className="px-4 md:px-0 w-full relative space-y-4">



            <div
                // className="shadow-sm relative w-full  max-w-screen-xl border bg-gray-100 border-input  rounded-lg overflow-hidden h-80 text-white text-center flex items-center justify-center"
                className="w-full relative mx-auto rounded-xl border border-slate-300 shadow-sm overflow-hidden bg-slate-200/50 max-w-screen-xl flex items-center justify-center gap-2 flex-wrap"

            >
                <Image alt='' width={400} height={300} className="ml-[40%] object-cover rounded-sm" src={'/hero.svg'} />
                <div className="absolute top-2 left-2 p-[4.5%] space-y-4">
                    <p className={"text-secondary-foreground text-3xl md:text-5xl font-heading text-left pr-[10%] md:pr-[45%]"}>Tạo trang kinh doanh của bạn trên Lagi Now</p>

                    <p className="text-secondary-foreground text-xl text-2xl text-left text-gray-400 pr-[10%]">Kết nối và quảng bá đến cộng đồng</p>

                    <Link
                        href="/login?redirect=business.create"
                        className="flex"
                    >
                        <Button variant={'default'}> Đăng ký ngay </Button>
                    </Link>



                </div>
            </div>



        </div>

        <br />
        <div className="relative flex flex-col items-center justify-center bg-gray-50 py-20">
            <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-300 opacity-20 blur-3xl"></div>

            <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div>
            <div className="w-full">
                <div className="max-w-lg px-4 mx-auto max-w-screen-xl">
                    <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary-foreground">Đồ ăn ưa chuộng</h1>
                    <p className="mt-2 text-lg opacity-50"> Tìm kiếm quán ăn ngon của địa phương </p>
                    {/* <button className="to mt-5 min-w-[10rem] rounded-full bg-blue-500 bg-gradient-to-r from-teal-500 px-5 py-3 font-bold text-white shadow-xl">Khám phá</button> */}
                </div>


                <div className="scrollbar-hide mt-14 flex w-full snap-x snap-mandatory scroll-px-[200px] gap-4 overflow-x-scroll scroll-smooth px-10">
                    {
                        foodCollection?.map((item: any, index: any) => <BusinessPageCardTwo

                            data={item}
                            key={`${index}_${item?.id}`}
                        />)
                    }
                </div>
                <br />
            </div>
        </div>


        <div className="relative flex flex-col items-center justify-center bg-gray-50 py-2">
            <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-200 opacity-20 blur-3xl"></div>

            <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-200 opacity-20 blur-3xl"></div>
            <div className="w-full">
                <div className="max-w-lg px-4 mx-auto max-w-screen-xl">
                    <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary-foreground"> Quán coffee chill </h1>
                    <p className="mt-5 opacity-50"> </p>
                </div>


                <div className="scrollbar-hide mt-14 flex w-full snap-x snap-mandatory scroll-px-[200px] gap-4 overflow-x-scroll scroll-smooth px-10">
                    {
                        drinkCollection?.map((item: any, index: any) => <BusinessPageCardTwo
                            data={item}
                            key={`${index}_${item?.id}`}
                        />)
                    }
                </div>
                <br />

            </div>

        </div>

        <div className="relative  flex flex-col items-center justify-center bg-gray-50 py-20">
            <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-300 opacity-20 blur-3xl"></div>

            <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div>
            <div className="w-full">
                <div className="max-w-lg px-4 mx-auto max-w-screen-xl">
                    <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary-foreground">Quán được ưa thích</h1>
                    <p className="mt-2 text-lg opacity-50"> Có nhiều lượt đánh giá tích cực nhất </p>
                </div>


                <div className="scrollbar-hide mt-14 flex w-full snap-x snap-mandatory scroll-px-[200px] gap-4 overflow-x-scroll scroll-smooth px-10">
                    {
                        businessesHighRating?.map((item: any, index: any) => <BusinessPageCardTwo
                            showRating
                            data={item}
                            key={`${index}_${item?.id}`}
                        />)
                    }
                </div>
                <br />
            </div>
        </div>




        <br />
        <div className="w-full mx-auto px-4 max-w-screen-xl flex gap-2 flex-wrap">
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


        <div className="w-full mx-auto max-w-screen-xl space-y-2 px-4 md:px-0">
            <p className="text-3xl font-heading">Trang nổi bật</p>
            <Suspense fallback={<Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}>
                <div className="flex gap-2  flex-wrap">
                    {
                        businessPages?.map((item: any, index: any) => <BusinessPageCard
                            tracking
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



        <br />

    </div>
}