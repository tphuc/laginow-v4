'use client';
import Image from 'next/image';
import React from 'react';
import StarRating from './ui/stars-rating';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck, CheckCircle, Clock, } from 'lucide-react';
import ImageViewable from './image-viewable';

function BusinessPageCard({ data }: { data: any }) {

  let isCurrentlyOpenHr = isCurrentlyOpen(data?.workingHrs ?? {})
  return (
    <div className="p-2 w-full min-w-[280px] md:max-w-[280px] rounded-xl overflow-hidden shadow-sm border boder-input bg-white">

      <ImageViewable className="w-full md:w-[280px] rounded-lg h-[280px] aspect-video object-cover" width={200} height={200} src={data?.banner?.url ?? '/placeholder.svg'} alt={''} />
      <div className='space-y-1'>
        <div className="p-2">
          <Link href={`/t/${data?.id}`} className="font-heading inline-flex items-center gap-1 text-xl hover:underline">{data?.title} {data?.verified && <BadgeCheck className='w-6 h-6 fill-sky-600 stroke-white'/>}</Link>
          {data?.avgRating && <div className='flex items-center gap-2'>
            <StarRating defaultValue={data?.avgRating ?? 0} changeable={true} />
            <p className='text-md bg-secondary p-1 rounded-full border border-input'>{data?.avgRating}</p>
          </div>}
          <p className="text-gray-800 text-base">
            {data?.address}
          </p>
          <div className='flex flex-wrap gap-2 pt-1'>
            {data?.tags?.map((item) => <p className='text-xs px-2 py-1 rounded-md bg-gray-200/50 text-gray-700' key={item?.id}>{item?.name}</p>)}
          </div>
          <br />
          <div className={cn("inline-flex gap-2 justify-between items-center px-2 py-1 text-sm bg-muted border border-input rounded-full text-muted-foreground", isCurrentlyOpen(data?.workingHrs) ? 'text-cyan-700' : 'text-muted-foreground' )} >
            <div className="flex text-sm items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {isCurrentlyOpenHr ? 'Đang mở cửa' : "Đóng cửa"}
            </div>
            <div> {getOpenHrs(data?.workingHrs)?.startTime} - {getOpenHrs(data?.workingHrs)?.endTime}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BusinessPageCard;