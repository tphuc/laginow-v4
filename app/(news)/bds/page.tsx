import db from '@/lib/prisma'
import NewsCard, { NewsCardHorizontal, SellingCard, SubNewsCard } from '../NewsCard'
import { NewsNav } from '../NewTabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, PhoneCall, X } from 'lucide-react'
import { sub } from 'date-fns'
import { Prisma, RealEstateAssetType } from '@prisma/client'
import Image from 'next/image'
import CategoriesHeading from './CategoriesHeading'
import RealEstatePaginatedList from './RealEstatePaginatedList'
import { Suspense } from 'react'
import LoaderSkeleton from '@/components/loader-skeleton'



async function getProductTypes(){
    const data =  await db.sellingProductType?.findMany({
        
    })
    return data
}

async function getRealEstatePosts({ page, realEstateType, realEstateAssetType, take }: { page: number; realEstateType?: string; realEstateAssetType?: string; take: number }) {

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
        realEstateType: realEstateType as any ?? undefined,
        realEstateAssetType: realEstateAssetType as any ?? undefined,
        postType: 'REALESTATE',
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
    const realEstateType = searchParams.realEstateType
    const realEstateAssetType = searchParams.realEstateAssetType
    let [posts, productTypes] = await Promise.all([
        getRealEstatePosts({page: page, take: 9, realEstateType, realEstateAssetType}),
       getProductTypes()
    ])


    return <div className='relative w-full max-w-screen-2xl mx-auto grid grid-cols-5 gap-4'>
        <div className="col-span-5 min-h-screen md:col-span-4 w-full  max-w-screen-2xl mx-auto">
            
            <CategoriesHeading productTypes={productTypes}/>
            {(realEstateType || realEstateAssetType ) && <Link href={`/bds`} className='bg-secondary mt-2 px-4 py-1 items-center gap-2 inline-flex flex-item rounded-full border text-teal-800 border-teal-500'>
                Xoá lọc tìm kiếm
                <X className='w-4 h-4'/>
            </Link> }
            <br/>
          
            <div className="py-2">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Bài đăng </h1>
            </div>
            {posts?.data?.length === 0 && <p className='text-muted-foreground'>Chưa có bài đăng</p>}
            <Suspense fallback={<LoaderSkeleton/>}>
            <RealEstatePaginatedList data={posts?.data} maxPage={posts?.total}/>
            </Suspense>
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