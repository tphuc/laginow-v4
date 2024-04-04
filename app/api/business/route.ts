
import { NextRequest, NextResponse } from 'next/server';


import { z } from 'zod';
import { BusinessCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { NextAuthRequest } from 'next-auth/lib';
import { auth } from '@/lib/auth';


export const POST = auth(async (req: NextAuthRequest) => {
  try {
    const user = req.auth?.user
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
    const json = await req.json()
    const body = BusinessCreateSchema.parse(json)

    const post = await prisma.business.create({
      data: {
        title: body.title,
        slug: slugify(body.title, { lower: true, replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
        ownerId: user?.id,
        address: body.address,
        banner: body.banner as any,
        images: body.images as any ?? [],
        displayBanner: body.displayBanner ?? false,
        tags: {
          connect: body.tags
        }
      },
    })
    return new Response(JSON.stringify(post))

  } catch (error) {
    console.log(58, error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }

})

