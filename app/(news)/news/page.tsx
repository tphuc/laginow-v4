import db from '@/lib/prisma'
import NewsCard, { NewsCardHorizontal, SubNewsCard } from '../NewsCard'
import LocalNewsCard from '../LocalNewsCard'
import NewsCarouselMain from '../NewsCarouselMain'
import { NewsNav } from '../NewTabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, PhoneCall } from 'lucide-react'
import NewsNormalList from './NewsNormalList'
import { usePathname, useSearchParams } from 'next/navigation'
import { sub } from 'date-fns'
import { Prisma } from '@prisma/client'
import NewspaperList from './NewspaperList'



async function fetchData(url: string) {

    try {
        let res = await fetch(`${url}`, {
            method: "GET",
            cache: "no-cache",
            // next: {
            //     revalidate: 3600
            // }

        })

        let data = await res.json()

        return data
    }
    catch (e) {
        console.log(e)
        return null
    }
}


async function getLocalNews() {
    return await db.post?.findMany({
        include: {
            user: true
        },
        where: {
            title: {
                not: "chưa có tiêu đề"
            },
            visible: true
        },
        take: 4
    })
}

async function getLocalNews2() {
    return await db.post?.findMany({
        include: {
            user: true
        },
        where: {
            title: {
                not: "chưa có tiêu đề"
            },
            visible: true
        },
        take: 4,
        skip: 4
    })
}


async function getLocalNewsaper({ page, take }: { page: number; take: number }) {

    const offset = (page - 1) * take;
    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null
    const currentDate = new Date();
    // Subtract one month from the current date
    const oneMonthAgo = sub(currentDate, { months: 12 });

    const where: Prisma.PostWhereInput | undefined = {
        title: {
            not: "chưa có tiêu đề"
        },
        postType: 'NEWS',
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





export default async function Page({ searchParams }) {

    const pageNewsNormal = parseInt(searchParams.pageNewsNormal ?? '1')
    const pageNewspaper = parseInt(searchParams.pageNewspaper ?? '1')
    const take = 10
    let _newsNormalPublic = fetchData(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/public/news-normal-public?page=${pageNewsNormal}&take=${take}`)

    // let newspaperPublic = getLocalNewsaper({ page: pageNewspaper, take: 5 })


    let [
        localNews,
        localNews2,
        newNormalPublic,
        newspaperPublic,
        newspaperPublicCarousel
    ] =
        await Promise.all([
            getLocalNews(),
            getLocalNews2(),
            _newsNormalPublic,
            getLocalNewsaper({ page: pageNewspaper, take: 3 }),
            getLocalNewsaper({ page: 1, take: 5 })
        ])



    return <div className='relative w-full max-w-screen-2xl mx-auto grid grid-cols-5 gap-4'>
        <div className="col-span-5 md:col-span-4 w-full  max-w-screen-2xl mx-auto">
            <div className="">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Thông tin </h1>
            </div>

            <br />

            <div className='gap-4 grid grid-cols-5'>
                {!!newspaperPublicCarousel?.data?.length && <div className='col-span-5 md:col-span-2'>
                    <NewsCarouselMain data={newspaperPublicCarousel?.data} />
                </div>
                }
                
                {
                    !!newspaperPublicCarousel?.data?.length &&
                    <NewspaperList data={newspaperPublic?.data} maxPage={newspaperPublic?.total}></NewspaperList>
                }
            </div>

            <br />
            <div className="">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Bài viết </h1>
            </div>
            <br />
            <NewsNormalList data={newNormalPublic?.data} maxPage={Math.ceil(newNormalPublic?.total / take)} />
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