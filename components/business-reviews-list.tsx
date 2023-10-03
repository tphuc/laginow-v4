'use client'
import { siteConfig } from "@/config/site"
import db from "@/lib/prisma"
import { ProductItem } from "./product-item"
import Image from "next/image"
import { formatDate, timeAgo, vndFormat } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft, ArrowRight, Plus, ShoppingBag, ShoppingCart } from "lucide-react"

import { Avatar, AvatarImage } from "./ui/avatar"
import StarRating from "./ui/stars-rating"
import { useGetBusinessReview } from "@/lib/http"
import { useState } from "react"
import ImageViewable from "./image-viewable"




export function BusinessReviewList({ businessId, ...props }: { businessId: string }) {

  const [pageIndex, setPageIndex] = useState(0);
  let { data } = useGetBusinessReview(businessId, { page: pageIndex, limit: 10 })

  return (
    <div className="w-full relative space-y-2">
      {data?.data?.length ? <div className="w-full divide-y divide-border rounded-xl border shadow-sm bg-secondary/40 items-center relative mt-4  rounded-lg">
        {data?.data?.map((review: any) => (
          <div key={review?.id} className="flex-wrap min-w-[300px] items-center gap-2 space-y-2 justify-between p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="" src={review?.user?.image ?? '/placeholder.svg'} />
              </Avatar>
              <div className="grid flex-1 gap-x-2 grid-cols-1 md:grid-cols-3">

                <span className="font-medium">{review?.user?.name}</span>
                <div />
                <div className="flex items-center xs:justify-between md:justify-end">
                  <StarRating defaultValue={review?.rating} changeable={false} onChange={() => { }} />
                </div>
                <span className="font-normal text-sm">{timeAgo(review?.updatedAt)}</span>
              </div>


            </div>


            <div className="flex items-center justify-between flex-1">
              <div className="grid space-y-2">
                <p>{review?.content}</p>
                <span className="sr-only">{review?.user?.name ?? ''}</span>
                {/* <p className="text-sm text-muted-foreground">{vndFormat(product.price)}</p> */}
                <div className="flex items-center flex-wrap gap-1">
                  {
                    review?.images?.map?.((image: any) => <ImageViewable key={image?.url} alt='' width={60} height={60} className="rounded-sm object-cover border border-input" src={image.url} />)
                  }
                </div>
              </div>
            </div>
            {/* <PostOperations post={{ id: product.id, title: product.name }} /> */}
          </div>
        ))}


      </div> : <p>Chưa có đánh giá</p>}

    </div>
  )
}