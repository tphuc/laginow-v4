'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { cn, getOpenHrs, getParagraphText, isCurrentlyOpen, timeAgo, vndFormat } from '@/lib/utils';
import { Clock10, Shield, ShieldAlert, ShieldCheck, UserCheck, UserCog, UserCog2 } from 'lucide-react';
import { Avatar } from '@radix-ui/react-avatar';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ImageViewable from '@/components/image-viewable';
import { UserAvatar } from '@/components/user-avatar';


const PostCardDescription = ({ postData }) => {

    const paragraphText = getParagraphText(postData?.blocks);

    return (
        <div className="max-h-[100px]">{paragraphText?.slice(0, 200) + '...'}</div>
    );
};


function NewsCard({ data, className }: { data: any, className?: any }) {

    return (
        <div className={cn("relative flex flex-col h-full w-full min-w-[300px] max-w-[100vw] bg-secondary rounded-2xl overflow-hidden border boder-input", className)}>
            <Image className="w-full min-h-[260px] max-h-[260px] max-w-[520px] h-auto" width={300} height={300} style={{objectFit:"cover"}} src={data?.thumbnail ?? '/placeholder.svg'} alt={''} />
            <div className='space-y-4 w-full overflow-hidden'>
                <div className="p-4">
                    <div className='flex gap-2 items-center'>
                        {/* <UserAvatar user={data?.user} /> */}
                        <div>
                            {/* <p className='flex items-center gap-1' >{data?.user?.name} {data?.user?.isAdmin && <UserCog className='w-4 h-4oo stroke-sky-800' />} </p> */}
                            <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
                        </div>
                    </div>

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-accent-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

                </div>

            </div>
        </div>
    );
}


export function SellingCard({ data }: { data: any }) {

    return (
        <div className="p-2 w-full min-w-[280px] rounded-md overflow-hidden border boder-input bg-secondary rounded-xl">

            <ImageViewable className="w-full rounded-md aspect-video object-cover" width={200} height={200} style={{objectFit:"cover"}} src={data?.thumbnail ?? '/placeholder.svg'} alt={''} />
            <div className='space-y-1'>
                <div className="p-2">
                    <div className='flex gap-2 items-center'>
                        {/* <UserAvatar user={data?.user} /> */}
                        <div>
                            {/* <p className='flex items-center gap-1' >{data?.user?.name} {data?.user?.isAdmin && <UserCog className='w-4 h-4oo stroke-sky-800' />} </p> */}
                            <p className='text-sm text-muted-foreground'>{timeAgo(data?.createdAt)}</p>
                            <p className='text-md'>{vndFormat(data?.price)}</p>
                        </div>
                    </div>

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-accent-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

                </div>

            </div>
        </div>
    );
}

export function NewsCardHorizontal({data}){
   


    return (
        <div className="w-full rounded-xl gap-2 grid grid-cols-3 overflow-hidden border bg-secondary boder-input">
            <Link href={`/p/${data?.slug ?? data?.id}`} className=''>
                <ImageViewable className="w-full h-full aspect-square object-cover bg-gradient-to-r from-stone-200 to-slate-300" width={200} height={200} src={data?.thumbnail ?? ''} alt={''} />
            </Link>
            <div className='relative w-full col-span-2 p-2 pr-4 h-full overflow-hidden'>
   
                    {/* <div className='flex gap-2 items-center'>
                      
                        <div>
                        
                            <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
                        </div>
                    </div> */}

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-accent-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

          

            </div>
        </div>
    );

}


export function SubNewsCard({data}){
   


    return (
        <div className="p-2 w-full rounded-md  gap-2 flex overflow-hidden border boder-input bg-white">
            
            {/* <ImageViewable className="w-[200px] rounded-lg aspect-video object-cover" width={200} height={200} src={data?.thumbnail ?? '/placeholder.svg'} alt={''} /> */}

            <div className='space-y-1 w-full'>
                <div className="p-2 w-full">
                    <div className='flex gap-2 justify-between w-full items-center'>
                        {/* <p className='flex items-center gap-1' >{data?.user?.name} {data?.user?.isAdmin && <UserCog className='w-4 h-4oo stroke-sky-800' />} </p> */}
                        <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
                    </div>

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-accent-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>
                </div>
            </div>
        </div>
    );

}


export default NewsCard;