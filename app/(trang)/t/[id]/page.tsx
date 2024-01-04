import { AddReviewButton } from "@/components/add-reviews-button"
import { BusinessProductList } from "@/components/business-products-list"
import { BusinessReviewList } from "@/components/business-reviews-list"
import ImageViewable from "@/components/image-viewable"
import { Badge } from "@/components/ui/badge"

import db from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { getOpenHrs, isCurrentlyOpen } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Divider } from "@tremor/react"
import { BadgeCheck, Clock10, Facebook, Globe2, MapPin, Package, Phone, Pin, Plus, PlusCircle, Star } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


interface PageProps {
    params: { id: string }
}


async function getBusiness(id: string) {
    return await db.business.findUnique({
        where: {
            id,
        },
        include: {
            tags: true
        }
    })
}


async function getBusinessProduct(id: string) {
    return await db.product.findMany({
        where: {
            businessId: id,
            visible: true,
        }
    })
}


// or Dynamic metadata
export async function generateMetadata(
    { params }: PageProps,
    // parent: ResolvingMetadata
) {
    const business = await getBusiness(params.id)
    let images: any = []

    if (business?.banner?.['url']) {
        images.push(business?.banner?.['url'])
    }

    return {
        title: business?.title,
        description: business?.address,
        openGraph: {
            images
        },
    } as Metadata
}

export async function generateStaticParams() {
    const pages =  await db.post.findMany({
      where: {
        slug: {
          not: null
        }
      }
    })
   
    return pages.map((item) => ({
      id: item.id,
    }))
  }
  



async function getBusinessReviews(id: string) {
    return await db.review.findMany({
        where: {
            businessId: id,
            // visible: true,
        }
    })
}


async function addPageEvent(url: string) {

    try {
        let res = await fetch(`${url}`, {
            method: "POST",
            cache: 'no-store',
            // headers: headers() as HeadersInit,
            body: JSON.stringify({
                eventType: 'PAGE_VIEW'
            },)
        })

        return res.json()
    }
    catch (e) {
        console.log(e)
        return null
    }
}



// function getHost(){
//     const host = headers().get("host");
//     const protocal = process?.env.NODE_ENV === "development"?"http":"https"
//     return `${protocal}://${host}`
// }



export default async function Page({ params }) {
    let business = await getBusiness(params.id)
    let businessProducts = await getBusinessProduct(params.id);


    await addPageEvent(`${process?.env?.NEXT_PUBLIC_API_ENDPOINT}/api/business/${params.id}/page-event`)


    let isCurrentlyOpenHr = await isCurrentlyOpen(business?.workingHrs ?? {})



    return <div className="relative space-y-5 max-w-screen-xl w-full gap-1">
        <div className="flex gap-4 flex-wrap">
            {business?.banner?.['url'] && <div className="bg-secondary aspect-square rounded-lg  h-[80px] w-[80px] md:w-[160px] md:h-auto text-white text-center flex items-center justify-center">
                <ImageViewable alt='' width={140} height={140} className="w-auto  border border-input h-full rounded-md object-cover aspect-square" src={business?.banner?.['url']} />
            </div>}
            <div className="space-y-2 flex-1 min-w-[320px]">
                <div className='inline-flex w-full items-center gap-1 flex-wrap'>
                    <p className="text-3xl font-medium font-heading">{business?.title}</p>
                    {business?.verified && <BadgeCheck className='w-8 h-8 fill-sky-600 stroke-white' />}

                </div>
                <p className="">{business?.address}</p>
                <div className="flex gap-2">{business?.tags?.map((item: any) => (
                    <p key={item?.id} className="text-sm cursor-pointer text-muted-foreground">{item?.name}</p>
                ))}</div>
                <Badge className="inline-flex gap-1 justify-between items-center min-w-[100px] px-1 py-1 border border-gray-300" variant={isCurrentlyOpenHr ? 'success' : 'secondary'}>
                    <div className="flex items-center gap-2">
                        <Clock10 className="w-4 h-4" strokeWidth={1.5} />
                        {/* {isCurrentlyOpenHr ? 'Đang mở cửa' : "Đóng cửa"} */}
                    </div>
                    {
                        (getOpenHrs(business?.workingHrs)?.startTime &&
                            getOpenHrs(business?.workingHrs)?.endTime) ?
                            <div> {getOpenHrs(business?.workingHrs)?.startTime} - {getOpenHrs(business?.workingHrs)?.endTime}</div>
                            : <div>
                                chưa mở cửa
                            </div>
                    }

                </Badge>
            </div>

        </div>
        <br />
        {/* <Divider/> */}
        {business?.displayContact && <div className="w-full">
            {/* <p className="text-2xl flex items-center gap-2 py-2 font-medium font-heading">
                Thông tin liên hệ
            </p> */}
            <div className="w-full">
                <div className="flex w-full overflow-hidden flex-col gap-4 md:flex-row">

                    <div className="md:w-1/2">
                        <div className="rounded-lg mb-4 md:mb-0 space-y-4">
                            <div >
                                <p className="flex items-center gap-2 font-heading text-secondary-foreground">
                                    <Phone className="w-5 h-5" strokeWidth={2} /> SĐT
                                </p>
                                <Badge variant={'secondary'} className="border border-input">
                                    <Link href={`tel:${business?.phone}`} className="hover:underline">{business?.phone}</Link>
                                </Badge>
                            </div>

                            <div >
                                <p className="flex items-center gap-2 font-heading text-secondary-foreground">    <Globe2 className="w-5 h-5" strokeWidth={2} /> Website </p>

                                <p className="hover:underline">{business?.website}</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2 font-heading text-secondary-foreground">
                                    <Facebook className="w-5 h-5" strokeWidth={2} /> Facebook
                                </p>
                                <Link href={`${business?.facebookUrl}`} className="hover:underline truncate max-w-[200px] text-eclipsis">{business?.facebookUrl}</Link>
                            </div>

                            <div>
                                <p className="flex items-center gap-2 font-heading text-secondary-foreground">
                                    <MapPin className="w-5 h-5" strokeWidth={2} /> Google Maps
                                </p>
                                <Link href={`${business?.googleMapsUrl}`} className="hover:underline truncate max-w-[200px] text-eclipsis">{business?.googleMapsUrl}</Link>
                            </div>
                        </div>
                    </div>


                    <div className="w-full md:w-1/2  relative">

                        {/* <div className="mb-4">
                                <p className="flex items-center gap-2 font-heading text-secondary-foreground">
                                    <Pin className="w-5 h-5" strokeWidth={2} /> Google maps
                                </p>
                                <Link href="https://www.facebook.com/examplepage" className="hover:underline">{business?.googleMapsUrl}</Link>
                            </div> */}

                        <div className="relative overflow-hidden w-full aspect-video">
                            {business?.googleMapsUrlEmbeded && <iframe
                                //   frameborder="0"
                                //   style="border:0"
                                className="w-full h-full absolute rounded-md border  border-input top-0 left-0"
                                src={business?.googleMapsUrlEmbeded}

                            />}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        }

        <Divider />
        <p className="text-xl flex items-center gap-2 font-medium font-heading">
            {/* <Package className="w-6 h-6" strokeWidth={1.5} />  */}
            Hình ảnh ({business?.images?.['length']})
        </p>
        {
            !!business?.images?.['length'] && <>

                <div className="w-full rounded-lg">
                    <div className="scrollbar-hide rounded-lg flex w-full snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth">
                        {(business?.images as any)?.map((item: any, id: number) => <div key={id} className="relative shrink-0 snap-start snap-always rounded-xl bg-orange-100 h-[150px] md:h-[150px]">
                            <ImageViewable src={item?.url} quality={100} width={150} height={150} alt="Uploaded" className="w-auto h-full rounded-md border border-input object-cover" />
                        </div>
                        )}
                    </div>
                </div>
            </>
        }


        <br />
        <div className="w-full relative space-y-4">
            <p className="text-xl flex items-center gap-2 font-medium font-heading">
                {/* <Package className="w-6 h-6" strokeWidth={1.5} />  */}
                Sản phẩm & Dịch vụ
            </p>

            <BusinessProductList products={businessProducts ?? []} />
            <br />

            <div className="grid grid-cols-2 gap-2 md:gap-4 font-medium ">

                <span className="font-heading text-xl">Đánh giá</span>
                <div className="flex justify-end">
                    <AddReviewButton businessId={params.id} />
                </div>
            </div>
            <BusinessReviewList businessId={params.id} />
        </div>

        {/* <div className="mt-4 relative w-full">
            <Tabs defaultValue="product" className="w-full">
                <TabsList className="p-1 bg-muted">
                    <TabsTrigger className="rounded-md" value="product">Sản phẩm / dịch vụ</TabsTrigger>
                    <TabsTrigger className="rounded-md" value="password">Đánh giá</TabsTrigger>
                    <TabsTrigger className="rounded-md" value="posts">Bài viết</TabsTrigger>
                </TabsList>
                <TabsContent className="max-w-[90vw]" value="product">
                    <BusinessProductList products={businessProducts ?? []}/>
                </TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div> */}

    </div>
}