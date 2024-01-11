import db from '@/lib/prisma'
import NewsCard, { NewsCardHorizontal, SellingCard, SubNewsCard } from '../NewsCard'
import { NewsNav } from '../NewTabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, PhoneCall, X } from 'lucide-react'
import { sub } from 'date-fns'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import CategoriesHeading from './CategoriesHeading'
import NewsSellingPaginatedList from './NewsSellingPaginatedList'



async function getProductTypes(){
    const data =  await db.sellingProductType?.findMany({
        
    })
    return data
}

async function getLocalSellingPosts({ page, productType, take }: { page: number; productType?: string; take: number }) {

    const offset = (page - 1) * take;
    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null
    const currentDate = new Date();
    // Subtract one month from the current date
    const oneMonthAgo = sub(currentDate, { months: 3 });

    const where: Prisma.PostWhereInput | undefined = {
        title: {
            not: "chưa có tiêu đề"
        },
        sellingProductTypeId: !!productType ? productType : undefined,
        postType: 'SELLING',
        createdAt: {
            gte: oneMonthAgo
        },
        visible: true
    }

    let data = await db.post?.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true
        },
        take: take,
        skip: offset,
    })


    let total = await db.post?.count({
        where,
    })


    return {
        data,
        total
    }
}


export default async function Page({searchParams}) {
    
    const page = parseInt(searchParams.page ?? '1')
    const productType = searchParams.productType
    let [sellingPosts, productTypes] = await Promise.all([
       getLocalSellingPosts({page: page, take: 9, productType: productType}),
       getProductTypes()
    ])


    return <div className='relative w-full max-w-screen-2xl mx-auto grid grid-cols-5 gap-4'>
        <div className="col-span-5 md:col-span-4 w-full  max-w-screen-2xl mx-auto">
            
           

            <CategoriesHeading productTypes={productTypes}/>
            <br/>           
            <div className="py-2">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Bài đăng </h1>
            </div>
            <br />
            {sellingPosts?.data?.length === 0 && <p className='text-muted-foreground'>Chưa có bài đăng</p>}
            <NewsSellingPaginatedList data={sellingPosts?.data} maxPage={sellingPosts?.total}/>
        </div>

        <div className="col-span-5 md:col-span-1 max-w-screen-2xl mx-auto px-4 md:px-0">
            <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Được tài trợ </h1>
            <br />
            <div className='space-y-2'>
                <div className="rounded-lg p-6 border space-y-2 bg-gradient-to-r from-teal-600 to-sky-500 text-secondary text-card-foreground shadow-sm " data-v0-t="card">
                    <div className="flex flex-col space-y-1.5">
                        <h2 className="text-2xl font-heading">LAGI NOW</h2>
                    </div>
                    <div className="space-y-4 w-full">
                        <p className='space-y-2'>
                            Liên hệ để đặt quảng cáo MIỄN PHÍ trên Lagi Now
                        </p>
                        <Link className='bg-card flex items-center justify-center gap-2 shadow-sm inline-block w-auto px-2 py-2 text-primary rounded-full' href='tel:0388672976'>

                            <Phone className='w-4 h-4' />
                            038 867 2976
                        </Link>
                    </div>
                </div>


            </div>
        </div>


    </div>

}