
import * as z from "zod"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { RequiresProPlanError } from "@/lib/exceptions"
import slugify from "slugify"
import { NextRequest, NextResponse } from "next/server"
import { generateUniqueId } from "@/lib/utils"
import { NextAuthRequest } from "next-auth/lib"
// import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})


export const GET = auth(async (req: NextAuthRequest) => {
  try {
    let user = req.auth?.user
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }

})

export const POST = auth(async (req: NextAuthRequest) => {
  try {
    let user = req.auth?.user
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }


    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await prisma.post.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const newId = generateUniqueId()

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const post = await prisma.post.create({
      data: {
        slug: slugify(`${body?.title}-${newId}`, { replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
        title: body.title,
        content: body.content ?? '',
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(error, { status: 500 })
  }
})
