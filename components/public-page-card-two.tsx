'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';





const BusinessPageCardTwo = forwardRef(({ data, showRating = false, tracking = false }: { showRating?: boolean, data: any, tracking?: boolean }, ref: any) => {
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

    <div ref={ref} className="md:1/1 relative aspect-1/1 w-[80%] shrink-0 snap-center shadow-sm mb-2 border border-input overflow-hidden snap-always rounded-xl bg-white sm:w-[80%] min-w-[240px] md:w-[280px] ">


      <Image width={300} height={300} src={data?.banner?.url ?? ''} alt={'/placehover.svg'} className="w-full aspect-square object-cover bg-gradient-to-r from-stone-200 to-slate-300" />
      <div className="z-10 w-full px-4 border-t py-4 bg-white space-y-1">
        {!!showRating &&<div className='flex items-center gap-1'>
          <StarRating defaultValue={data?.avgRating ?? 0} changeable={false} />
          {data?.avgRating && <div className='flex items-center bg-blue-600 font-bold justify-center text-secondary w-6 h-6 rounded-full'>{data?.avgRating}</div>}
        </div>}
        
        <div className='inline-flex w-full items-center  space-y-1 flex-wrap gap-1'>


          <Link ref={inviewRef} href={`/t/${data?.id}`} className="inline-flex gap-1 items-center font-heading max-w-[270px] truncate text-ellipsis  text-xl hover:underline">


            {data?.verified && <span><BadgeCheck style={{ width: 24, height: 24 }} className='w-6 h-6 fill-sky-600 stroke-white' /></span>}
            <span> {data?.title} </span>

          </Link>

        </div>
        <div className='flex items-center gap-1 flex-wrap'>
          {
            data?.tags?.map((item, id) => <p key={`${item?.id}_${id}`} className="text-accent-foreground bg-secondary rounded-md py-1 px-2 text-base text-xs">
              {item?.name}
            </p>)
          }
        </div>

      </div>
    </div>

  );
});

BusinessPageCardTwo.displayName = 'BusinessPageCardTwo'


export default BusinessPageCardTwo;