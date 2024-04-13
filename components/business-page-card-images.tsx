'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ImageViewable from './image-viewable';





const BusinessPageCardImages = forwardRef(({ data, showRating = false, tracking = false }: { showRating?: boolean, data: any, tracking?: boolean }, ref: any) => {
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

    <div ref={ref} className="md:1/1 h-auto relative aspect-1/1 w-[80%] shrink-0 snap-center mb-2 overflow-hidden snap-always rounded-2xl bg-secondary sm:w-[80%] min-w-[240px] md:w-[540px] border border-input">

    
      <div className='text-accent-foreground p-4 mt-0 pb-12 flex items-center flex-wrap gap-2'>
        {data?.images?.map?.((item) => <ImageViewable
          key={item}
          alt=''
          src={item?.url ?? ''}
          width={300}
          height={300}
          className='w-16 h-16 rounded-sm'
        />)}
        <div className="absolute flex items-center gap-2 -bottom-1 left-0 z-10 w-full px-4 py-4 bg-secondary/80 backdrop-blur-lg space-y-1">
          <div className='min-w-10 min-h-10'> 
          <ImageViewable

          alt=''
          src={data?.banner?.url ?? ''}
          width={300}
          height={300}
          className='w-10 h-10 rounded-sm'
        />
          </div>
          <div className='flex-1'>
         
          {!!showRating && <div className='flex items-center gap-1'>
            <StarRating defaultValue={data?.avgRating ?? 0} changeable={false} />
            {/* {data?.avgRating && <div className='flex items-center bg-blue-600 justify-center text-secondary w-6 h-6 rounded-full'>{data?.avgRating}</div>} */}
          </div>}

          <div className='inline-flex w-full items-center  space-y-1  gap-1'>


            <Link ref={inviewRef} href={`/t/${data?.id}`} className="inline-flex -ml-1 gap-1 truncate items-center font-heading w-full truncate text-ellipsis text-xl hover:underline">
              <BadgeCheck className={cn("min-w-[24px] stroke-secondary", data?.verified ? "fill-indigo-600 stroke-gray-200" : "fill-slate-400 stroke-secondary")} />
              <span className="font-medium text-indigo-900 flex-1 font-heading  gap-1 truncate">{data?.title}</span>

            </Link>

          </div>
          <div className='flex w-full overflow-hidden items-center truncate flex-nowrap gap-1'>
            {
              data?.tags?.map((item, id) => <p key={`${item?.id}_${id}`} className="break-inside-avoid truncate inline-block whitespace-nowrap text-accent-foreground bg-gray-200 px-2 rounded-sm py-1 text-base text-xs">
                {item?.name}
              </p>)
            }
          </div>
          </div>
        </div>
      </div>
    </div>

  );
});

BusinessPageCardImages.displayName = 'BusinessPageCardImages'


export default BusinessPageCardImages;