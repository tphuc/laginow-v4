import db from '@/lib/prisma'
import NewsCard, { NewsCardHorizontal, SubNewsCard } from '../NewsCard'
import LocalNewsCard from '../LocalNewsCard'
import NewsCarouselMain from '../NewsCarouselMain'
import { NewsNav } from '../NewTabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, PhoneCall } from 'lucide-react'



async function getLocalNews() {
    return await db.post?.findMany({
        include: {
            user: true
        },
        where: {
            title: {
                not: "chưa có tiêu đề"
            }
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
            }
        },
        take: 4,
        skip: 4
    })
}
export default async function Page() {

    let [localNews, localNews2] = await Promise.all([
        getLocalNews(),
        getLocalNews2()
    ])

    return <div className='relative w-full max-w-screen-2xl mx-auto grid grid-cols-5 gap-4'>
        <div className="col-span-5 md:col-span-4 w-full  max-w-screen-2xl mx-auto">
            <div className="">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Thông tin Lagi </h1>
            </div>

            <br />
            <div className='gap-4 grid grid-cols-5'>
                <div className='col-span-5 md:col-span-2'>
                    <NewsCarouselMain data={localNews} />
                </div>
                <div className='col-span-5 md:col-span-3 space-y-1'>
                    {localNews?.map((item, id) => <SubNewsCard key={id} data={item} />)}
                </div>
            </div>

            <br />
            <div className="">
                <h1 className="text-2xl font-bold tracking-tight font-heading text-secondary-foreground"> Bài viết </h1>
            </div>
            <br />
            <div className='space-y-2'>
                {localNews2?.map((item, id) => <NewsCardHorizontal key={id} data={item} />)}
            </div>
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