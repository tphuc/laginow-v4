'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck, CheckCircle, Clock, } from 'lucide-react';
import ImageViewable from './image-viewable';


const BusinessPageCard = forwardRef(({ data }: {data: any}, ref: any) => {
  let isCurrentlyOpenHr = isCurrentlyOpen(data?.workingHrs ?? {});
  return (
    <div ref={ref} className="relative p-2 w-full min-w-[280px] md:max-w-[280px] rounded-xl overflow-hidden shadow-sm border border-input bg-white">
      <Link href={`/t/${data?.id}`}>
        <ImageViewable className="w-full md:w-[280px] rounded-lg h-[280px] aspect-video object-cover" width={200} height={200} src={data?.banner?.url ?? '/placeholder.svg'} alt={''} />
      </Link>
      <div className='space-y-1'>
        <div className="p-2">
        {(data?.avgRating || 1) && <div className='flex items-center gap-1'>
            <StarRating defaultValue={data?.avgRating ?? 0} changeable={false} />
            <p className='flex items-center font-heading justify-center text-cyan-700 w-6 h-6 rounded-full'>{data?.avgRating}</p>
          </div>}
          <Link href={`/t/${data?.id}`} className="font-heading inline-flex items-center gap-1 text-xl hover:underline">{data?.title} {data?.verified && <BadgeCheck className='w-6 h-6 fill-sky-600 stroke-white'/>}</Link>
        
          <p className="text-muted-foreground text-base text-sm">
            {data?.address}
          </p>
          <div className='flex flex-wrap gap-2 pt-1'>
            {data?.tags?.map((item) => <p className='text-xs px-2 py-1 rounded-md bg-gray-200/50 text-gray-700' key={item?.id}>{item?.name}</p>)}
          </div>
          {/* <br /> */}
          <div className={cn("inline-flex cursor-default absolute top-4 left-4 gap-2 justify-between items-center px-1.5 py-0.5 text-sm bg-muted text-xs border border-input rounded-full text-muted-foreground", isCurrentlyOpen(data?.workingHrs) ? 'text-white bg-teal-500' : 'text-muted-foreground' )} >
            <div className="flex text-sm items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {isCurrentlyOpenHr ? 'Đang mở' : "Đóng cửa"}
            </div>
            <div className='text-sm'> {getOpenHrs(data?.workingHrs)?.startTime} - {getOpenHrs(data?.workingHrs)?.endTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

BusinessPageCard.displayName = 'BusinessPageCard'


export default BusinessPageCard;