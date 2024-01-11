import BusinessPageCard from "@/components/public-page-card";
import PublicPostCard from "@/components/public-post-card";
import { ArrowRight, ChevronRight, Loader2, Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import db from '@/lib/prisma'
import BusinessPageCardTwo from "@/components/public-page-card-two";
import SearchSection from "./search-section";
import PostCarousel from "./PostCarousel";
import PostTypeSection from "./PostTypesSection";
import { UserAvatar } from "@/components/user-avatar";
import StarRating from "@/components/ui/stars-rating";
import ReviewSection from "./ReviewSection";



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
            Business: {
                include: {
                    tags: true
                }
            },

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

async function fetchNewBusinesses() {

    const data = await db.business.findMany({
        where: {
        },
        take: 16,
        orderBy: [
            {
                createdAt: 'desc', // Order by avgRating in descending order
            },

        ],
        include: {
            tags: true
        }
    });

    return data
}

async function fetchMarketingPost() {
    const data = await db.newsCollection?.findUnique({
        where: {
            id: 'marketing'
        },
        include: {
            posts: true
        }
    })
    return data?.posts ?? []
}


async function fetchReviews() {
    const data = await db.review?.findMany({
        include: {
            user: true,
            business: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10

    })
    return data
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


    const [
        businessPages,
        posts,
        totalBusiness,
        foodCollection,
        drinkCollection,
        businessesHighRating,
        tags,
        masterTags,
        decoBusinesses,
        newBusinesses,
        marketingPosts,
        marketingReviews
    ]

        =
        await Promise.all([_businessPages, _posts, _totalBusiness, _foodCollection, _drinkCollection, _businessRating,
            fetchTags(),
            fetchMasterTags(),
            fetchBusinessCollection('deco1'),
            fetchNewBusinesses(),
            fetchMarketingPost(),
            fetchReviews()
        ])


    return <div className="relative space-y-4 w-full gap-2">

        <div
            // className="shadow-sm relative w-full  max-w-screen-xl border bg-gray-100 border-input  rounded-lg overflow-hidden h-80 text-white text-center flex items-center justify-center"
            className="w-full "

        >
            <SearchSection />
            <div className="w-full bg-gray-200/50 z-40 border-b py-10 scrollbar-hide">
                <div className="px-4 mx-auto max-w-screen-xl scrollbar-hide grid gap-1 grid-rows-2 md:grid-rows-3 grid-flow-col gap-4 overflow-scroll">
                    {masterTags?.map((item) => <Link href={`/timkiem?tags=${item?.tags?.map(item => item.id)?.join(',')}`} key={item?.id} className="pt-4 px-4  cursor-pointer rounded-xl bg-white text-sm min-w-[150px] border border-gray-300">
                        <p className="font-heading px-2 text-lg">{item?.name}</p>
                        <Image src={item?.url ?? ''} alt='' width={80} height={80} className="w-[100px] h-auto aspect-square"></Image>
                    </Link>)}
                </div>
            </div>
            <br />
            <div className="relative px-4 md:px-0 container max-w-screen-xl mx-auto">
                <div className="p-4  border border-amber-700 mx-auto   text-xl font-heading bg-slate-100 opacity-80 text-left bg-gradient-to-r from-amber-100 to-rose-100 rgb(204, 251, 241)) rounded-lg border-md shadow-sm text-amber-900">
                    <span className="text-3xl white pr-1">{totalBusiness}</span> kinh doanh lớn và nhỏ đã đăng kí trên Lagi Now {" "}   🎉

                </div>
            </div>

        </div>

        <div className="px-4 md:px-0 w-full relative space-y-4">



            <div
                // className="shadow-sm relative w-full  max-w-screen-xl border bg-gray-100 border-input  rounded-lg overflow-hidden h-80 text-white text-center flex items-center justify-center"
                className="w-full relative mx-auto rounded-xl border border-slate-300 shadow-sm overflow-hidden bg-slate-100 max-w-screen-xl flex items-center justify-center gap-2 flex-wrap"

            >
                 <div className="absolute inset-auto h-96 w-96 scale-150 bg-amber-300 opacity-20 blur-3xl"></div>

<div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-rose-300 opacity-20 blur-3xl"></div>
                <div className="flex relative  w-full items-center justify-center">
                    <div className="relative w-full  max-w-screen-xl overflow-hidden">

                        <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-white to-transparent" />
                        <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-white to-transparent" />
                        <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
                        <div className="mx-auto pl-[20%] grid h-[350px] w-[350px] animate-skew-scroll grid-cols-2 gap-2 sm:w-[600px] md:w-[800px] sm:grid-cols-2">

                            {decoBusinesses?.map((item, id) => <div key={item?.id} className="relative flex cursor-pointer items-center space-x-2 rounded-md border border-gray-100 p-2 shadow-sm transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-md">

                                <Image className="w-full h-[80px] md:h-[120px] rounded-md object-cover" width={200} height={200} style={{ objectFit: "cover" }} src={(item?.banner as any)?.url ?? '/placeholder.svg'} alt={''} />

                                {/* <p className="absolute top-1 left-1 text-gray-600">{item?.title}</p> */}
                            </div>
                            )}


                        </div>

                      

                    </div>
                </div>

                {/* <Image alt='' width={400} height={300} className="ml-[40%] object-cover rounded-sm" src={'/hero.svg'} /> */}
                <div className="absolute top-1 z-10 left-2 h-full w-full p-[4%] bg-gray-100/60 md:bg-gray-100/20 space-y-4">
                    <p className={"text-secondary-foreground text-3xl md:text-5xl font-heading pt-0 text-left pr-[10%] md:pr-[50%]"}>Tạo trang kinh doanh của bạn trên Lagi Now</p>

                    <p className="text-secondary-foreground text-xl text-2xl text-left text-gray-400 pr-[10%]">Kết nối và quảng bá đến cộng đồng</p>

                    <Link
                        href="/login?redirect=business.create"
                        className="inline-flex p-2 px-4 bg-gradient-to-r from-amber-600 to-rose-500 rounded-md border-0 text-secondary hover:text-primary-foreground text-md shadow-md"
                    >
                        Đăng ký ngay
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
                    <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary-foreground"> Mới đăng kí trên Laginow </h1>
                    <p className="mt-2 text-lg opacity-50"> Những kinh doanh vừa mới xuất hiện trên Lagi Now </p>
                    {/* <button className="to mt-5 min-w-[10rem] rounded-full bg-blue-500 bg-gradient-to-r from-teal-500 px-5 py-3 font-bold text-white shadow-xl">Khám phá</button> */}
                </div>


                <div className="scrollbar-hide mt-14 grid grid-rows-2 grid-flow-col gap-2 w-full snap-x snap-mandatory scroll-px-[200px] gap-4 overflow-x-scroll scroll-smooth px-10">
                    {
                        newBusinesses?.map((item: any, index: any) => <BusinessPageCardTwo
                            data={item}
                            showRating
                            key={`${index}_${item?.id}`}
                        />)
                    }
                </div>
                <br />
            </div>
            <Link
                        href="/timkiem"
                        className="inline-flex p-3 px-4 rounded-full bg-gradient-to-r from-blue-700 shadow-md hover:shadow-xl transition transition-all border border-indigo-500 to-violet-700  text-secondary hover:text-primary-foreground text-md "
                    >
                        Xem tất cả <ChevronRight/>
                    </Link>
                    
                    <p className="text-muted-foreground pt-3 text-center text-xl px-[20%]"> Tổng hợp các cửa hàng kinh doanh dịch vụ tại địa phương. </p>
                    <p className="text-3xl pt-2 text-muted-foreground font-heading">Tất cả trên Lagi Now</p>
        </div>
        {/* <div className="relative flex flex-col items-center justify-center bg-gray-50 py-20">
            <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-300 opacity-20 blur-3xl"></div>

            <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div>
            <div className="w-full">
                <div className="max-w-lg px-4 mx-auto max-w-screen-xl">
                    <h1 className="text-4xl font-bold tracking-tight font-heading text-secondary-foreground">Đồ ăn ưa chuộng</h1>
                    <p className="mt-2 text-lg opacity-50"> Tìm kiếm quán ăn ngon của địa phương </p>
                 
                </div>


                <div className="scrollbar-hide mt-14 grid grid-rows-2 grid-flow-col gap-2 w-full snap-x snap-mandatory scroll-px-[200px] gap-4 overflow-x-scroll scroll-smooth px-10">
                    {
                        foodCollection?.map((item: any, index: any) => <BusinessPageCardTwo
                            data={item}
                            key={`${index}_${item?.id}`}
                        />)
                    }
                </div>
                <br />
            </div>
        </div> */}


        {/* <div className="relative flex flex-col items-center justify-center bg-gray-50 py-2">
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

        </div> */}

        {/* <div className="relative  flex flex-col items-center justify-center bg-gray-50 py-20">
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
        </div> */}


        <div className="relative px-4 border-t border-input flex gap-2 flex-wrap">

            <div className="relative text-center w-full mx-auto max-w-screen-2xl space-y-2  py-[5%]">
                <h1 className="text-3xl md:text-4xl text-accent-foreground font-heading">
                    Bạn có nội dung muốn chia sẻ ?
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-heading">
                    Tạo nội dung quảng bá cho kinh doanh của bạn. Hoàn toàn miễn phí.
                </p>
                <br/>
                <Link href="/login?redirect=dashboard" className="inline-flex items-center gap-2  transition-all hover:shadow-lg py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-md border-0 text-secondary hover:text-primary-foreground shadow-md">
                    Tạo bài viết <Pen className="w-4 h-4"/>
                </Link>

                <div className="w-full pt-8 flex items-center justify-center">
                    <PostCarousel data={marketingPosts} />
                </div>

            </div>




        </div>

        <PostTypeSection />
        <br />
        <div className="w-full mx-auto px-4 max-w-screen-xl flex gap-2 flex-wrap">
            {/* <Link href='/' className="rounded-xl w-full md:w-auto overflow-hidden ">
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

            </Link> */}
        </div>

        <div>

        </div>

        {/* <div className="w-full mx-auto max-w-screen-xl space-y-2 px-4 md:px-0">
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
        </div> */}


        <div className="relative bg-secondary w-full">
            <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-200 opacity-20 blur-3xl"></div>
            <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div>
            <div className="text-center py-8 space-y-2">
            <h1 className="font-heading text-accent-foreground/90 text-3xl md:text-5xl">Đánh giá từ cộng đồng 👍</h1>
            <h1 className="font-heading text-accent-foreground/80 text-2xl">  Những trải nghiệm đích thực được cộng đồng chia sẻ </h1>
            </div>
            <ReviewSection data={marketingReviews} />
        </div>




    </div>
}