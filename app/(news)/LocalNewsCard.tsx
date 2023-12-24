'use client';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { UserAvatar } from '@/components/user-avatar';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';



const PostCardDescription = ({ postData }) => {
  const getParagraphText = () => {
    let blocks = postData?.blocks ?? []
    let text = ''
    for (let block of blocks) {
      if (block.type === "paragraph") {
        text += `${block?.data?.text} . `;
        // return block?.data?.text;
      }

      else if (block.type === "header") {
        text += ` ${block?.data?.text} `;
        // return block?.data?.text;
      }

      else if (block.type === "list") {
        text += ` ... `;
        // return block?.data?.text;
      }
    }
    return text?.replace("!&nbsp;", " ")?.replace("?&nbsp;", " ") ?? '';  // Default empty string if no paragraph found
  };

  const paragraphText = getParagraphText();

  return (
    <div className="flex text-wrap">{paragraphText?.slice(0, 150) + '...'}</div>
  );
};

const LocalNewsCard = forwardRef(({ data, showRating = false, tracking = false }: { showRating?: boolean, data: any, tracking?: boolean }, ref: any) => {

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

    <div ref={ref} className="md:1/1 relative w-[300px] shrink-0 snap-center shadow-sm mb-2 border border-input overflow-hidden snap-always rounded-xl bg-white sm:w-[80%] min-w-[240px] md:w-[620px] ">


      
      {/* <div className='p-2'>
        <Image style={{objectFit:"contain"}} width={100} height={100} src={data?.thumbnail?? '/placeholder.svg'} alt={''} className="w-[200px] aspect-square" />
        </div> */}

      <div ref={inviewRef} className="z-10 relative pb-12 flex-1 p-4 border-t space-y-1 bg-white">
     
        <div className='flex items-center gap-2'>
        <UserAvatar user={data?.user} />
        <div>
        <span className='flex items-center'>{data?.user?.name}</span>
        <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
        </div>
        </div>
        <div className='inline-flex w-full items-center flex-wrap gap-1'>
          <Link  href={`/p/${data?.id}`} className="font-heading truncate text-eclipsis text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
        </div>
        
        <PostCardDescription postData={data?.content}></PostCardDescription>
        <Link className='absolute bottom-4 left-4 text-sky-700 rounded-full' href={`/p/${data?.id}`}>Đọc thêm</Link>
      </div>
    </div>

  );
});

LocalNewsCard.displayName = 'LocalNewsCard'


export default LocalNewsCard;