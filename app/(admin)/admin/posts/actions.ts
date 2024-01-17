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