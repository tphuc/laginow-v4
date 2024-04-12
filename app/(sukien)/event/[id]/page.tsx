import ImageViewable from "@/components/image-viewable"
import db from "@/lib/prisma"
import { Metadata } from "next"
import { EventForm } from "./EventForm"
import { auth } from "@/lib/auth"


interface PageProps {
    params: { id: string }
}


async function getEntity(id: string) {
    return await db.eventQuestion.findUnique({
        where: {
            id,
        },
        include: {

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
    console.log(78, userAnswer)

    return <div className="relative min-h-screen space-y-4 max-w-screen-xl w-full gap-1">
        <p className='text-center text-xl text-muted-foreground pt-4'>Câu hỏi hôm nay</p>
        <p style={{ lineHeight: 1.2 }} className="text-center text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-heading pr-2">
            {data?.title}
        </p>
        <div className="flex items-center justify-center relative">
            <ImageViewable className="w-full max-w-[600px] rounded-md " width={800} height={600} style={{ objectFit: "contain" }} src={data?.image?.['url'] ?? '/placeholder.svg'} alt={''} />
        </div>
        <div className="max-w-screen-md mx-auto">
        <EventForm data={data} defaultValue={userAnswer ?? null} />
        </div>


    </div>
}