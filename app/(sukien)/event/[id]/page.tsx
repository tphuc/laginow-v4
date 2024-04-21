import ImageViewable from "@/components/image-viewable"
import db from "@/lib/prisma"
import { Metadata } from "next"
import { EventForm } from "./EventForm"
import { auth } from "@/lib/auth"
import BusinessPageCardTwo from "@/components/public-page-card-two"
import BusinessPageCardImages from "@/components/business-page-card-images"
import PostCarousel from "@/app/(marketing)/PostCarousel"
import NewsCard from "@/app/(news)/NewsCard"
import PostCard from "@/components/post-card"
import UserAward from "./UserAward"
import { Ticket } from "lucide-react"
import QRDisplay from "./UserPrizeQrcode"
import { FacebookEmbed } from 'react-social-media-embed';
import SocialMediaAds from "./SocialMedia"

interface PageProps {
    params: { id: string }
}


async function getEntity(id: string) {
    return await db.eventQuestion.findUnique({
        where: {
            id,
        },
        include: {
            adsPages: {
                include: {
                    Product: {
                        select: {
                            images: true,

                        }
                    },
                    tags: true
                }
            },
            adsPosts: true,
            winners: {
                select: {
                    id: true
                }
            },
        }
    })
}

async function getUserAnswer(id: string) {
    const user = (await auth())?.user

    return await db.userAnswer.findFirst({
        where: {
            eventId: id,
            userId: user?.id
        },
    })
}

async function getUserPrize(id: string) {
    const user = (await auth())?.user
    return await db.userPrize.findFirst({
        where: {
            eventId: id,
            userId: user?.id,
        
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            event: {
                select: {
                    title: true,
                    date: true
                }
            }
        }
    })

}



// or Dynamic metadata
export async function generateMetadata(
    { params }: PageProps,
    // parent: ResolvingMetadata
) {
    const entity = await getEntity(params.id)
    let images: any = []

    if (entity?.image) {
        images.push(entity?.image?.['url'])
    }
    else {
        images?.push('/event.jpeg')
    }

    return {
        title: entity?.title,
        description: entity?.description,
        openGraph: {
            images: images
        },
        alternates: {
            canonical: `/event/${params?.id}`,
        },
    } as Metadata
}

export async function generateStaticParams() {
    const pages = await db.eventQuestion.findMany({
        where: {
        }
    })

    return pages.map((item) => ({
        id: item.id,
    }))
}


export default async function Page({ params }) {
    const user = (await auth())?.user as any
    let [data, userAnswer, userPrize] = await Promise.all([getEntity(params.id), getUserAnswer(params.id), getUserPrize(params?.id)])

    console.log(data)
    return <div className="relative min-h-screen space-y-4 max-w-screen-xl w-full gap-1">
        <div className="relative w-full space-y-6">
            <div className="scrollbar-hide mt-10 grid grid-rows-1 grid-flow-col gap-2 gap-x-4 w-full snap-x snap-mandatory scroll-px-[200px]  overflow-x-scroll scroll-smooth px-10">
                {
                    data?.adsPages?.map((item: any, index: any) =>
                        <div key={`${index}_${item?.id}`}>
                            <BusinessPageCardImages
                                data={item}
                                showRating
                            />
                        </div>)
                }
            </div>
            <br />
        </div>
        <p className='text-center text-xl text-muted-foreground pt-4'>Câu hỏi</p>
        <p style={{ lineHeight: 1.2 }} className="text-center text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-heading pr-2">
            {data?.title}
        </p>
        {!!data?.image?.['url'] && <div className="flex items-center justify-center relative">
            <ImageViewable className="w-full max-w-[600px] rounded-md " width={800} height={600} style={{ objectFit: "contain" }} src={data?.image?.['url'] ?? '/placeholder.svg'} alt={''} />
        </div>}
        <div className="max-w-screen-md mx-auto">
            <EventForm data={data} defaultValue={user ? (userAnswer ?? null) : null} />
        </div>

        {!!data?.winners?.map?.(item => item.id)?.includes(user?.id) && <div>
            <UserAward data={data} />
            {!userPrize && <p className="text-muted-foreground text-center"> Quay để nhận thưởng </p>}
        </div>}
        {userPrize && <div className="space-y-1 mt-10">
            <p className="font-heading text-muted-foreground text-center"> 🎁 Bạn đã nhận được 🎁</p>
            <div className="p-4 bg-secondary rounded-sm border  max-w-xs gap-3 mx-auto">
                <QRDisplay value={userPrize} />
                <div className="flex rounded-md  ">

                    <div className="">
                        <Ticket className="h-12 w-12 aspect-ratio stroke-indigo-600 " />
                    </div>
                    <div className="px-2 py-1">
                        <p className="text-primary text-sm font-heading">{(userPrize?.prize as any)?.code}</p>
                        <p className="text-primary text-md">{(userPrize?.prize as any)?.description}</p>
                        <p className="text-primary text-sm font-heading">{user?.email}</p>
                    </div>


                </div>
            </div>


        </div>}
        <br />
        <div className="w-full space-y-4 justify-center">

            <div className="scrollbar-hide mt-10 grid grid-rows-1 grid-flow-col gap-2 gap-x-4 w-full snap-x snap-mandatory scroll-px-[200px]  overflow-x-scroll scroll-smooth px-10">
                {
                    data?.adsPosts?.map((item: any, index: any) =>
                        <div key={`${index}_${item?.id}`} >
                            <PostCard
                                data={item}
                                tracking
                            />
                        </div>)
                }
            </div>
        </div>

        <p  className='text-center font-heading text-indigo-800 text-3xl pt-4'>Khám phá</p>
        <SocialMediaAds items={
            data?.adsFB ?? []
          }/>



    </div>
}