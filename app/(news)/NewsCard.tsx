'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { cn, getOpenHrs, isCurrentlyOpen, timeAgo, vndFormat } from '@/lib/utils';
import { Clock10, Shield, ShieldAlert, ShieldCheck, UserCheck, UserCog, UserCog2 } from 'lucide-react';
import { Avatar } from '@radix-ui/react-avatar';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ImageViewable from '@/components/image-viewable';
import { UserAvatar } from '@/components/user-avatar';


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
        <div className="flex text-wrap">{paragraphText?.slice(0, 200) + '...'}</div>
    );
};


function NewsCard({ data }: { data: any }) {

    return (
        <div className="relative p-2 w-full min-w-[280px] rounded-md overflow-hidden border boder-input bg-white">

            <Image className="w-full max-h-[200px] max-w-[360px] rounded-md aspect-video" width={200} height={200} style={{objectFit:"cover"}} src={data?.thumbnail ?? '/placeholder.svg'} alt={''} />
            <div className='space-y-1'>
                <div className="p-2">
                    <div className='flex gap-2 items-center'>
                        {/* <UserAvatar user={data?.user} /> */}
                        <div>
                            {/* <p className='flex items-center gap-1' >{data?.user?.name} {data?.user?.isAdmin && <UserCog className='w-4 h-4oo stroke-sky-800' />} </p> */}
                            <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
                        </div>
                    </div>

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

                </div>

            </div>
        </div>
    );
}


export function SellingCard({ data }: { data: any }) {

    return (
        <div className="p-2 w-full min-w-[280px] rounded-md overflow-hidden border boder-input bg-white">

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

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

                </div>

            </div>
        </div>
    );
}

export function NewsCardHorizontal({data}){
   


    return (
        <div className="p-2 w-full rounded-md gap-2 flex overflow-hidden flex-wrap border boder-input bg-white">
        <ImageViewable className="w-full md:w-[200px] rounded-sm aspect-video object-cover bg-gradient-to-r from-stone-200 to-slate-300" width={200} height={200} src={data?.thumbnail ?? ''} alt={''} />
            <div className='space-y-1 flex-1 min-w-[300px]'>
                <div className="p-2">
                    <div className='flex gap-2 items-center'>
                        {/* <UserAvatar user={data?.user} /> */}
                        <div>
                            {/* <p className='flex items-center gap-1' >{data?.user?.name} {data?.user?.isAdmin && <UserCog className='w-4 h-4oo stroke-sky-800' />} </p> */}
                            <p className='text-sm text-muted-foreground'>{format(new Date(data?.createdAt), 'dd LLL, y', { locale: vi })}</p>
                        </div>
                    </div>

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>

                </div>

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

                    <Link href={`/p/${data?.slug ?? data?.id}`} className="font-heading text-secondary-foreground text-xl hover:underline">{data?.title}</Link>
                    <PostCardDescription postData={data?.content}></PostCardDescription>
                </div>
            </div>
        </div>
    );

}


export default NewsCard;