'use server'
import prisma from '@/lib/prisma'

export async function updateMarketingPosts(posts: any[]) {

 
    let res = await prisma.newsCollection?.update({
        where: {
            id:"marketing"
        },
        data: {
            posts: {
                set: posts
            }
        }
    })

    return res

}

export async function updatePaidMarketingPosts(items: any[]) {

 
    let res = await prisma.newsCollection?.update({
        where: {
            id:"paid-marketing"
        },
        data: {
            posts: {
                set: items
            }
        }
    })

    return res

}

export async function createAffilateLink(url: string) {

    let res = await prisma.affliateLinks?.create({
        
        data: {
           url
        }
    })

    return res

}


