import ImageViewable from "@/components/image-viewable"
import db from "@/lib/prisma"
import { Metadata } from "next"
import { EventForm } from "./EventForm"
import { auth } from "@/lib/auth"
import BusinessPageCardTwo from "@/components/public-page-card-two"
import BusinessPageCardImages from "@/components/business-page-card-images"


interface PageProps {
    params: { id: string }
}


async function getEntity(id: string) {
    return await db.eventQuestion.findUnique({
        where: {
            id,
        },
        include: {
            adsPages: true,
            adsPosts: true
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
    let [data, userAnswer] = await Promise.all([getEntity(params.id), getUserAnswer(params.id)])


    return <div className="relative min-h-screen space-y-4 max-w-screen-xl w-full gap-1">
        <p className='text-center text-xl text-muted-foreground pt-4'>Câu hỏi hôm nay</p>
        <p style={{ lineHeight: 1.2 }} className="text-center text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-heading pr-2">
            {data?.title}
        </p>
        {!!data?.image?.['url'] && <div className="flex items-center justify-center relative">
            <ImageViewable className="w-full max-w-[600px] rounded-md " width={800} height={600} style={{ objectFit: "contain" }} src={data?.image?.['url'] ?? '/placeholder.svg'} alt={''} />
        </div>}
        <div className="max-w-screen-md mx-auto">
            <EventForm data={data} defaultValue={userAnswer ?? null} />
        </div>
        <br />
        <div className="relative w-full">
            <div className="max-w-lg px-4 mx-auto max-w-screen-xl text-center">
                <p style={{ lineHeight: 1.2 }} className="text-center text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-heading pr-2"> Khám phá </p>
            </div>
            <div className="scrollbar-hide mt-10 grid grid-rows-1 grid-flow-col gap-2 gap-x-4 w-full snap-x snap-mandatory scroll-px-[200px]  overflow-x-scroll scroll-smooth px-2">
                {
                    data?.adsPages?.map((item: any, index: any) => <BusinessPageCardImages
                        data={item}
                        showRating
                        key={`${index}_${item?.id}`}
                    />)
                }
            </div>
            <br />
        </div>


    </div>
}