
import { NextRequest, NextResponse } from 'next/server';


import { z } from 'zod';
import { BusinessCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { NextAuthRequest } from 'next-auth/lib';
import { auth } from '@/lib/auth';


export const GET = auth(async (req: NextAuthRequest) => {
  try {
    const user = req.auth?.user
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    let items = await prisma.business.findMany({
      select: {
        id: true,
        title: true,
      }
    })

    return new Response(JSON.stringify(items))

  }
  catch(error){
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
})

export const POST = auth(async (req: NextAuthRequest) => {
  try {
    const user = req.auth?.user
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }
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

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }

})

