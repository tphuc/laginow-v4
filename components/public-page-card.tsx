'use client';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck, CheckCircle, Clock, Clock10, } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Badge } from './ui/badge';





const BusinessPageCard = forwardRef(({ data, tracking = false }: { data: any, tracking?: boolean }, ref: any) => {
  const [isCurrentlyOpenHr, setCurrentlyOpen] = useState(isCurrentlyOpen(data?.workingHrs ?? {}));


  const { ref: inviewRef, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
    delay: 100,
    onChange: async (inView) => {
      if (inView && tracking) {
        // Fire a tracking event to your tracking service of choice.
        // let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_ENDPOINT}/api/business/${data?.id}/page-event`, {
        //   method: "POST",
        //   // headers: headers() as HeadersInit,
        //   body: JSON.stringify({
        //     eventType: 'SEARCH_VIEW'
        //   },)
        // })
      }
    },
  });


  return (
    <div ref={ref} className="relative p-2 w-full min-w-[280px] md:max-w-[280px] rounded-xl overflow-hidden shadow-sm border border-input bg-white">
      <Link href={`/t/${data?.id}`}>
        <Image className="w-full border border-input/50 md:w-[280px] rounded-lg h-[280px] aspect-video object-cover" width={200} height={200} src={data?.banner?.url ?? '/placeholder.svg'} alt={''} />
      </Link>
      <div className='space-y-1'>
        <div className="p-2">
          {(data?.avgRating || 1) && <div className='flex items-center gap-1'>
            <StarRating defaultValue={data?.avgRating ?? 0} changeable={false} />
            <p className='flex items-center font-heading justify-center text-cyan-700 w-6 h-6 rounded-full'>{data?.avgRating}</p>
          </div>}
         
         <div className='inline-flex w-full items-center flex-wrap gap-1'>
         {data?.verified && <BadgeCheck className='w-6 h-6 fill-sky-600 stroke-white' />}
         <Link ref={inviewRef} href={`/t/${data?.id}`} className="inline-block font-heading max-w-[270px] truncate text-ellipsis  text-xl hover:underline"> {data?.title}  </Link>

         </div>
        
        

          <p className="text-muted-foreground text-base text-sm">
            {data?.address}
          </p>
          <div className='flex flex-wrap gap-1 pt-1'>
            {data?.tags?.map((item) => <p className='text-xs px-2 py-1 rounded-md bg-gray-200/50 text-gray-700' key={item?.id}>{item?.name}</p>)}
          </div>
          {/* <br /> */}
          <Badge className={cn("inline-flex gap-2 border border-input absolute top-4 left-4 justify-between items-center px-2 py-1 border ", !isCurrentlyOpenHr && "opacity:50")} variant={isCurrentlyOpenHr ? 'success' : 'secondary'}>
            <div className="flex items-center gap-2">
              <Clock10 className="w-4 h-4" strokeWidth={1.5} />
              {isCurrentlyOpenHr ? 'Đang mở cửa' : "Chưa mở cửa"}
            </div>
            {/* <div> {getOpenHrs(data?.workingHrs)?.startTime} - {getOpenHrs(data?.workingHrs)?.endTime}</div> */}
          </Badge>
        </div>
      </div>
    </div>
  );
});

BusinessPageCard.displayName = 'BusinessPageCard'


export default BusinessPageCard;