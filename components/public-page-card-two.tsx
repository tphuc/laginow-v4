'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck, CheckCircle, Clock, Clock10, } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Badge } from './ui/badge';





const BusinessPageCardTwo = forwardRef(({ data, showRating = false, tracking = false }: { showRating?: boolean, data: any, tracking?: boolean}, ref: any) => {
  let isCurrentlyOpenHr = isCurrentlyOpen(data?.workingHrs ?? {});

  const { ref: inviewRef, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
    delay: 100,
    onChange: async (inView) => {
      if (inView && tracking) {
        // Fire a tracking event to your tracking service of choice.
        let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_ENDPOINT}/api/business/${data?.id}/page-event`, {
          method: "POST",
          // headers: headers() as HeadersInit,
          body: JSON.stringify({
            eventType: 'SEARCH_VIEW'
          },)
        })
      }
    },
  });


  return (

    <div ref={ref} className="md:1/1 relative aspect-1/1 w-[80%] shrink-0 snap-start shadow-sm mb-2 border border-input overflow-hidden snap-always snap-start rounded-xl bg-white sm:w-[80%] md:w-[20%]">
       
   
        <Image width={300} height={300} src={data?.banner?.url ?? '/placeholder.svg'} alt={''} className="w-full aspect-square object-cover" />
        <div className="z-10 w-full px-4 border-t py-4 bg-white">
        {!!showRating && <div className='flex items-center gap-1'>
            <StarRating defaultValue={data?.avgRating ?? 0} changeable={false} />
            <p className='flex items-center font-heading justify-center text-cyan-700 w-6 h-6 rounded-full'>{data?.avgRating}</p>
          </div>}
        <div className='inline-flex h-[30px] w-full items-center flex-wrap gap-1'>
      
      
         <Link ref={inviewRef} href={`/t/${data?.id}`} className="inline-flex gap-1 items-center font-heading max-w-[270px] truncate text-ellipsis  text-xl hover:underline">  {data?.verified && <BadgeCheck style={{width:24, height:24}} className='w-6 h-6 fill-sky-600 stroke-white' />} {data?.title}  </Link>
        
         </div>
         <p className="text-muted-foreground text-base text-sm">
            {data?.address}
          </p>
        </div>
      </div>

  );
});

BusinessPageCardTwo.displayName = 'BusinessPageCardTwo'


export default BusinessPageCardTwo;