'use client';

import ImageViewable from "@/components/image-viewable";
import StarRating from "@/components/ui/stars-rating";
import { UserAvatar } from "@/components/user-avatar";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";




export default function ReviewSection({ data }) {
    return <div className="w-full mx-auto px-4 py-4  max-w-screen-xl columns-1 md:columns-3 lg:columns-3">
        {data?.map((item) => <div key={item?.id} className="relative bg-background/80 block whitespace-normal break-keep break-inside-avoid  rounded-md mb-4">
            <div className='block relative  break-inside-avoid z-10 break-inside-avoid border border-slate-300 shadow-sm hover:shadow-md transition-all cursor-default p-4 rounded-md'>
                <div className="flex items-center gap-2">
                    <UserAvatar user={item?.user}></UserAvatar>
                    <div>
                        <p className="text-accent-foreground font-heading">{item?.user?.name}</p>
                        <p>đánh giá cho <Link href={`/t/${item?.business?.id}`} className="font-heading text-indigo-800">{item?.business?.title}</Link>   <span className="inline-flex gap-1 items-center text-sm py-0.5 no-wrap text-secondary bg-indigo-600 px-2 rounded-full"> {item?.rating} <StarFilledIcon /></span></p>
                    </div>
                </div>
                {item?.content}
            <div className="flex items-center flex-wrap gap-1">
                    {
                        item?.images?.map?.((image: any) => <ImageViewable 
                            // useRaw={true}
                             key={image?.url} alt='' width={100} height={100} className="rounded-sm h-[80px] w-auto object-cover rounded-md border border-input bg-secondary-foreground" src={image.url ?? ''} />)
                    }
                </div>
            </div>
        </div>)}
    </div>
}