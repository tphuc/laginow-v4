import BusinessPageCard from "@/components/public-page-card";
import PublicPostCard from "@/components/public-post-card";
import { ArrowRight, ChevronRight, Loader2, Pen, ZoomIn } from "lucide-react";
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
import Balancer from "react-wrap-balancer";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";



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
            MasterTag: true,
            business: true
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
            <SearchSection masterTags={masterTags} tags={tags} />

            <div className="max-w-[1240px] py-24 mx-auto space-y-4 max-xl:mx-3">

                <div className="pb-8 text-center space-y-2">
                    <h1 className="font-heading mx-auto max-w-lg text-indigo-900 text-4xl text-center">
                        <Balancer> Xây dựng cho mọi kinh doanh </Balancer>
                    </h1>
                    <h5 className="text-lg text-indigo-900"> Công cụ marketing hiệu quả </h5>

                </div>
                <div className="grid relative gap-x-2 gap-y-2 grid-cols-[0.5fr_1fr] max-md:grid-cols-[1fr] grid-rows-[auto] my-2">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex relative row-span-2 overflow-hidden  min-h-[300px] flex-col justify-between items-stretch gap-x-8 space-y-2 bg-muted text-center p-12 rounded-3xl max-md:p-8">
                            <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
                                <iframe
                                    className="border-none rounded-xl absolute top-[-2px] left-[-2px] w-full" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Flaginow%2Fposts%2Fpfbid0Si1L6kznXNg2YR3YBjTps3DaXv1kF6jyhTMGKbUjAhc6zqg7YqxdUQu3n4MEVUvBl&show_text=true&width=300px" style={{ border: 'none', borderWidth: 0, width: "100%" }}
                                    width={300} height={640}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/3 bg-gradient-to-b from-transparent to-40% to-[#F7F7F8]"></div>
                            <div className=" text-left left-[5%] px-4  z-10 absolute bottom-10 max-md:leading-[48px] max-md:tracking-[-0.01em]">
                                <h1 className="text-accent-foreground font-heading text-lg md:text-2xl"> Kết nối với group và fanpage Facebook </h1>
                                <h1 className="text-indigo-950/70"> Quảng cáo tiếp cận với khách hàng trên mxh </h1>
                            </div>
                        </div>
                        {/* <div className="flex relative row-span-2 overflow-hidden  min-h-[300px] flex-col justify-between items-stretch gap-x-8 space-y-2 bg-muted text-center p-12 rounded-3xl max-md:p-8">
                            <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
                               
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/3 bg-gradient-to-b from-transparent to-40% to-[#F7F7F8] dark:to-[#04050B]"></div>
                            <div className=" text-left left-[5%] px-4  z-10 absolute bottom-10 max-md:leading-[48px] max-md:tracking-[-0.01em]">
                                <h1 className="text-indigo-950/90 font-heading text-lg md:text-2xl"> Quảng cáo trên fan page </h1>
                                <h1 className="text-indigo-950/70"> Tiếp cận với n </h1>
                            </div>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex relative col-span-2 md:col-span-1 overflow-hidden min-h-[290px] w-full max-w-[746px] flex-col items-start gap-x-8 gap-y-8 bg-muted px-12 py-10 rounded-3xl max-mdd:max-w-none max-md:p-8">
                            <Image src='/thong-tin.jpeg' loading="lazy" alt='' width={800} height={500} style={{ objectFit: "cover" }} className="block absolute top-10 rounded-lg w-[85%] left-1/2 -translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-full h-2/3 md:h-1/2 bg-gradient-to-b from-transparent to-40% to-[#F7F7F8]"></div>
                            <div className="  z-10 absolute left-[5%] px-4 bottom-10 max-md:leading-[48px] max-md:tracking-[-0.01em]">
                                <h1 className="text-accent-foreground font-heading text-xl md:text-2xl"> Thông tin về kinh doanh của bạn</h1>
                                <p className="text-indigo-950/70 ">  Thêm SDT, địa chỉ, hình ảnh sản phẩm dịch vụ</p>
                            </div>

                        </div>
                        <div className="flex relative col-span-2 md:col-span-1  overflow-hidden  min-h-[290px] flex-col justify-between items-stretch gap-x-8 space-y-2 bg-muted text-center p-12 rounded-3xl max-md:p-8">
                            <Image src='/chart.jpeg' loading="lazy" alt='' width={500} height={300} style={{ objectFit: "cover" }} className="block absolute top-10 rounded-lg w-[85%] left-1/2 -translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-full h-2/3 md:h-1/2 bg-gradient-to-b from-transparent to-40% to-[#F7F7F8]"></div>
                            <div className=" text-left left-[5%] px-4  z-10 absolute bottom-10 max-md:leading-[48px] max-md:tracking-[-0.01em]">
                                <h1 className="text-accent-foreground font-heading text-xl md:text-2xl">Tích hợp nhiều tính năng quản lí</h1>
                                <h1 className="text-indigo-950/70">Thống kê số lượt người xem trang </h1>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl relative h-full bg-secondary col-span-2 w-full relative space-y-4">



                            <div
                                // className="shadow-sm relative w-full  max-w-screen-xl border bg-gray-100 border-input  rounded-lg overflow-hidden h-80 text-white text-center flex items-center justify-center"
                                className="w-full relative mx-auto rounded-xl shadow-sm overflow-hidden bg-slate-100 max-w-screen-xl flex items-center justify-center gap-2 flex-wrap"
                            >

                                <div className="absolute inset-auto h-96 w-96 scale-150 bg-blue-800 opacity-10 blur-3xl"></div>
                                <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-purple-300 opacity-20 blur-3xl"></div>

                                <div className="flex relative  w-full items-center justify-center">
                                    <div className="relative w-full  max-w-screen-xl overflow-hidden">
                                        <div className="absolute bottom-0 z-10 left-0 h-full w-[80%] bg-gradient-to-r from-[#F7F7F8] to-80% to-transparent" />
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


                                <div className="absolute top-0 z-10 left-2 h-full w-full p-[4%] bg-gray-100/60 md:bg-gray-100/20 space-y-4">
                                    <p style={{lineHeight: 1.18}} className={"text-accent-foreground text-3xl md:text-[2.8rem] font-heading pt-0 text-left pr-[5%] md:pr-[42%] bg-gradient-to-b from-sky-600 to-indigo-700 bg-clip-text text-transparent"}>Tạo trang kinh doanh của bạn trên Lagi Now</p>
                                    <p className="text-indigo-800 text-2xl text-left pr-[10%]">Kết nối và quảng bá đến cộng đồng</p>
                                    <Link
                                        href="/login?redirect=business.create"
                                        className="inline-flex p-2 px-4 bg-gradient-to-b from-indigo-600 to-80% to-indigo-700 rounded-lg text-secondary/90 hover:text-secondary border-2 border-indigo-600 shadow-sm"
                                    >
                                        Đăng ký ngay
                                    </Link>



                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
            {/* <div className="w-full bg-gray-200/50 z-40 border-b py-10 scrollbar-hide">
                <div className="px-4 mx-auto max-w-screen-xl scrollbar-hide grid gap-1 grid-rows-2 md:grid-rows-3 grid-flow-col gap-4 overflow-scroll">
                    {masterTags?.map((item) => <Link href={`/timkiem?tags=${item?.tags?.map(item => item.id)?.join(',')}`} key={item?.id} className="pt-4 px-4  cursor-pointer rounded-xl bg-white min-w-[150px] border border-gray-300">
                        <p className="font-heading px-2 text-lg">{item?.name}</p>
                        <Image src={item?.url ?? ''} alt='' width={80} height={80} className="w-[100px] h-auto aspect-square"></Image>
                    </Link>)}
                </div>
            </div> */}



<div className="relative   max-w-screen-xl mx-auto  px-4">



<div className=" w-full py-20  bg-secondary rounded-3xl  text-center px-4">
                    <Balancer className="font-heading text-accent-foreground text-3xl md:text-5xl leading-tight  sm:leading-tight">
                       
                        <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text whitespace-nowrap text-transparent font-heading pr-2">{totalBusiness} trang</span>
                        đã đăng kí 🎉
                       
                    </Balancer>

                </div>
                </div>

            <div className="relative bg-secondary/20  flex flex-col items-center justify-center py-20">
                {/* <div className="block absolute w-full h-full blur-3xl" style={{background:'conic-gradient(from 41deg at 50% 50%, rgba(248, 249, 251, 0.00) 0deg, #F7F7F9 35.62500089406967deg, #F7F7F9 238.12499284744263deg, rgba(248, 249, 251, 0.00) 283.0139493942261deg)'}}></div> */}
                
                {/* <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-300 opacity-20 blur-3xl"></div>
                <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div> */}
                <div className="w-full">
                    <div className="max-w-lg px-4 mx-auto max-w-screen-xl text-center">
                        <p className="mt-2 font-heading text-indigo-900 text-4xl pt-4">Vừa mới xuất hiện trên Lagi Now </p>
                    </div>


                    <div className="scrollbar-hide mt-10 grid grid-rows-2 grid-flow-col gap-2 gap-x-4 w-full snap-x snap-mandatory scroll-px-[200px]  overflow-x-scroll scroll-smooth px-10">
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
                <br/>
                <Link
                    href="/timkiem"
                    className="inline-flex p-2 px-4 shadow-sm items-center gap-2 bg-gradient-to-b from-indigo-600 to-80% to-indigo-700 rounded-lg text-secondary/90 hover:text-secondary border-2 border-indigo-600"
                >
                    <MagnifyingGlassIcon width={20} height={20} strokeWidth={1.5} /> Xem tất cả 
                </Link>

                <p className="text-secondary-foreground pt-3 text-center text-xl px-[20%]"> Tìm kiếm hàng quán, doanh nghiệp tại địa phương.. </p>
                {/* <p className="text-3xl pt-2 text-muted-foreground font-heading">Tất cả trên Lagi Now</p> */}
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

                <div className="relative text-center w-full mx-auto max-w-screen-2xl space-y-4  py-[5%]">
                    <br />
                    <h1 className="text-3xl md:text-4xl text-indigo-900 font-heading">
                       <Balancer>Bạn có nội dung muốn chia sẻ ?</Balancer> 
                    </h1>
                    <p className="text-xl md:text-2xl text-accent-foreground">
                        Tạo nội dung quảng bá cho kinh doanh của bạn. Hoàn toàn miễn phí.
                    </p>
                    <Link href="/login?redirect=dashboard" 
                        className="inline-flex p-2 px-4 shadow-sm items-center gap-2 bg-gradient-to-b from-indigo-600 to-80% to-indigo-700 rounded-lg text-secondary/90 hover:text-secondary border-2 border-indigo-600"
                    >
                        Đăng bài viết <Pen className="w-4 h-4" />
                    </Link>

                </div>

                <PostTypeSection />


            </div>

           
   
            <div className="w-full py-20 space-y-8 justify-center">
            <h1 className="font-heading text-center text-blue-900 text-3xl md:text-4xl">Bài viết nổi bật</h1>
                        <PostCarousel data={marketingPosts} />
            </div>
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

           


            <div className="relative bg-secondary py-8 w-full">
                <div className="absolute inset-auto h-96 w-96 scale-150 bg-sky-200 opacity-20 blur-3xl"></div>
                <div className="absolute inset-auto h-96 w-96 translate-x-full scale-150 bg-indigo-300 opacity-20 blur-3xl"></div>
                <div className="text-center py-8 space-y-2">
                    <h1 className="font-heading text-blue-900 text-3xl md:text-4xl">Đánh giá từ cộng đồng 👍</h1>
                    <h1 className="font-heading text-blue-900/80 text-2xl">  Những trải nghiệm đích thực được cộng đồng chia sẻ </h1>
                </div>
                <ReviewSection data={marketingReviews} />
            </div>


        </div>

    </div>
}