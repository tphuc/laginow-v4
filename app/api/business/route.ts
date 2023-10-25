
import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    console.log(22, user?.id)
    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.post.count({
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

    const post = await db.business.create({
      data: {
        title: body.title,
        slug: slugify(body.title, { lower: true }),
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
}


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}