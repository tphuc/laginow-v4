import { AddReviewButton } from "@/components/add-reviews-button"
import { BusinessProductList } from "@/components/business-products-list"
import { BusinessReviewList } from "@/components/business-reviews-list"
import ImageViewable from "@/components/image-viewable"
import { Badge } from "@/components/ui/badge"

import db from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { getOpenHrs, isCurrentlyOpen } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Clock10, Package, Plus, PlusCircle, Star } from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import { useForm } from "react-hook-form"


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


    await addPageEvent(`https://laginow-v4.vercel.app/api/business/${params.id}/page-event`)


    let isCurrentlyOpenHr = isCurrentlyOpen(business?.workingHrs ?? {})



    return <div className="relative space-y-5 max-w-screen-xl w-full gap-2">
        <div className="flex gap-4 flex-wrap">
            {/* {(business?.banner as any)?.url || 1 && <div className="bg-secondary aspect-video rounded-lg h-auto w-full md:w-[360px] text-white text-center flex items-center justify-center">
                <Image alt='' width={240} height={200} className="w-auto h-full rounded-md object-cover" src={(business?.banner as any)?.url} />
            </div>} */}
            <div className="space-y-2 flex-1 ">
                <p className="text-3xl font-medium font-heading">{business?.title}</p>
                <p className="">{business?.address}</p>
                <div className="flex gap-2">{business?.tags?.map((item: any) => (
                    <p key={item?.id} className="text-sm cursor-pointer text-muted-foreground">{item?.name}</p>
                ))}</div>
                <Badge className="inline-flex gap-2 justify-between items-center px-1" variant={isCurrentlyOpenHr ? 'success' : 'destructive'}>
                    <div className="flex items-center gap-2">
                        <Clock10 className="w-4 h-4" strokeWidth={1.5} />
                        {isCurrentlyOpenHr ? 'Đang mở cửa' : "Đóng cửa"}
                    </div>
                    <div> {getOpenHrs(business?.workingHrs)?.startTime} - {getOpenHrs(business?.workingHrs)?.endTime}</div>
                </Badge>
            </div>

        </div>
        <br />
        <div className="w-full rounded-lg">
            <div className="scrollbar-hide rounded-lg flex w-full snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth">
                {(business?.images as any)?.map((item: any, id: number) => <div key={id} className="relative shrink-0 snap-start snap-always rounded-xl bg-orange-100 h-[100px] md:h-[100px]">
                    <ImageViewable src={item?.url} quality={100} width={100} height={100} alt="Uploaded" className="w-auto h-full rounded-md object-cover" />
                </div>
                )}
            </div>
        </div>

        <br />
        <div className="w-full relative space-y-2">
            <p className="text-xl flex items-center gap-2 font-medium font-heading">
                <Package className="w-6 h-6" strokeWidth={1.5} /> Sản phẩm & Dịch vụ
            </p>
            <BusinessProductList products={businessProducts ?? []} />
            <br />

            <div className="grid grid-cols-2 gap-2 font-medium ">

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