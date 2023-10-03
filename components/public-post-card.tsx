'use client';
import Image from 'next/image';
import React from 'react';
import StarRating from './ui/stars-rating';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen, timeAgo } from '@/lib/utils';
import { Clock10 } from 'lucide-react';
import ImageViewable from './image-viewable';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from './ui/avatar';
import { UserAvatar } from './user-avatar';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';


const PostCardDescription = ({ postData }) => {
  const getParagraphText = () => {
    let text = ''
      for(let block of postData?.blocks) {
          if(block.type === "paragraph") {
            text += `\n ${block?.data?.text}` ;
            // return block?.data?.text;
          }

          else if(block.type === "header") {
            text +=  `\n ${block?.data?.text}`;
            // return block?.data?.text;
          }

          else if(block.type === "list") {
            text +=  `\n ... \n`;
            // return block?.data?.text;
          }
      }
      return text ?? '';  // Default empty string if no paragraph found
  };

  const paragraphText = getParagraphText();

  return (

          <div className="flex text-wrap">{paragraphText?.slice(0, 200) + '...'}</div>

  );
};


function PublicPostCard({ data }: { data: any }) {

  let isCurrentlyOpenHr = isCurrentlyOpen(data?.workingHrs ?? {})
  return (
    <div className="p-2 w-full min-w-[280px] md:w-[380px] rounded-xl overflow-hidden shadow-sm border boder-input bg-white">

      <ImageViewable className="w-full md:w-[380px] rounded-lg aspect-video object-cover" width={200} height={200} src={data?.thumbnail ?? '/placeholder.svg'} alt={''} />
      <div className='space-y-1'>
        <div className="p-2">
          <div className='flex gap-2 items-center'>
            <UserAvatar user={data?.user} />
            <div>
            <p >{data?.user?.name}</p>
            <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale :vi})}</p>
            </div>
          </div>

          <Link href={`/p/${data?.id}`} className="font-heading text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
          <PostCardDescription postData={data?.content}></PostCardDescription>

        </div>

      </div>
    </div>
  );
}



export default PublicPostCard;