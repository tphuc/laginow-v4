'use server';
import prisma from '@/lib/prisma'
import { subHours } from 'date-fns';

export async function fetchCountBusiness() {
    let data = await prisma.business?.count({})

    return data
}



export async function fetchBusinessCollection(id: string) {

    const businessesInCollection = await prisma.collection.findUnique({
        where: { slug: id },
        include: {
            Business: {
                include: {
                    tags: true
                }
            },

        },
    });

    return businessesInCollection?.Business ?? []

}

export async function fetchTags() {
    const tags = await prisma.tag.findMany({
        include: {
            MasterTag: true,
            business: true
        }
    })

    return tags ?? []
}

export async function fetchMasterTags() {
    const tags = await prisma.masterTag.findMany({
        include: {
            tags: true
        }
    })

    return tags ?? []
}

export async function fetchBusinessHighRating() {

    const businessWithHighestRating = await prisma.business.findMany({
        where: {
            avgRating: {
                not: null
            }
        },
        take: 8,
        orderBy: [
            {
                avgRating: 'desc', // Order by avgRating in descending order
            },
            {
                Review: {
                    _count: 'desc', // Then, order by the number of reviews in descending order
                },
            },
        ],
    });

    return businessWithHighestRating

}

export async function fetchNewBusinesses() {

    const data = await prisma.business.findMany({
        where: {
        },
        take: 16,
        orderBy: [
            {
                createdAt: 'desc', // Order by avgRating in descending order
            },

        ],
        include: {
            tags: true
        }
    });

    return data
}

export async function fetchMarketingPost() {
    const data = await prisma.newsCollection?.findUnique({
        where: {
            id: 'marketing'
        },
        include: {
            posts: true
        }
    })
    return data?.posts ?? []
}


export async function fetchReviews() {
    const data = await prisma.review?.findMany({
        include: {
            user: true,
            business: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10

    })
    return data
}



export async function fetchNextEvent() {
    const nextEvent = await prisma.eventQuestion.findFirst({
        where: {
            tzDatetime: {
                gte: subHours(new Date(), 24)
            }
        },
        orderBy: {
            tzDatetime: 'asc'
        }
    });


    return nextEvent
}