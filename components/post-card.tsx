'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import StarRating from './ui/stars-rating';
import Link from 'next/link';
import { cn, getOpenHrs, getParagraphText, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ImageViewable from './image-viewable';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';


const PostCardDescription = ({ postData, className, max=150 }: {postData?: any, max?: number, className?: any}) => {

  const paragraphText = getParagraphText(postData?.blocks);

  return (
      <div className={cn("whitespace-wrap", className)}>{paragraphText?.slice(0, max) + '...'}</div>
  );
};



const PostCard = forwardRef(({ data, className, tracking = false }: { data: any, className?: string, tracking?: boolean }, ref: any) => {
  let isCurrentlyOpenHr = isCurrentlyOpen(data?.workingHrs ?? {});

  const { ref: inviewRef, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
    delay: 100,
    onChange: async (inView) => {
      if (inView && tracking) {
        // Fire a tracking event to your tracking service of choice.
        let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_ENDPOINT}/api/posts/${data?.id}/post-event`, {
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

    <div ref={ref} className={cn("relative min-w-[300px] rounded-md mb-2 overflow-hidden  bg-secondary border border-input",className)}>


      <div className='text-accent-foreground h-[300px] mt-0 pb-12 flex items-center justify-between flex-wrap gap-2'>
        <ImageViewable

          alt=''
          src={data?.thumbnail ?? ''}
          
          width={600}
          height={600}
          className='w-full rounded-sm'
        />

        <div className="absolute  gap-2 -bottom-1 left-0 z-10 w-full px-4 py-4 bg-secondary/80 backdrop-blur-lg space-y-1">


          <p className='text-sm text-muted-foreground'>{format(data?.createdAt, 'PP', {locale:vi})}</p>
            <Link ref={inviewRef} href={`/p/${data?.slug}`} className="-ml-1 gap-1 font-heading w-full text-xl hover:underline">
            
              <span className="font-medium text-indigo-900 flex-1 font-heading  gap-1 truncate tex-ellipsis">{data?.title}</span>

            </Link>


          <div className='flex w-full overflow-hidden items-center truncate flex-nowrap gap-1'>
            {
              data?.tags?.map((item, id) => <p key={`${item?.id}_${id}`} className="break-inside-avoid truncate inline-block whitespace-nowrap text-accent-foreground bg-gray-200 px-2 rounded-sm py-1 text-base text-xs">
                {item?.name}
              </p>)
            }

          </div>
          <PostCardDescription className={'text-accent-foreground h-full  rounded-sm text-base text-sm'}  postData={data?.content}></PostCardDescription>
        </div>
      </div>
    </div>

  );
});

PostCard.displayName = 'PostCard'


export default PostCard;