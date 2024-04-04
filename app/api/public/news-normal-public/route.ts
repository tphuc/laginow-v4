import { NextRequest, NextResponse, userAgent } from 'next/server';

import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema, PageEventCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { getCurrentUser, verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { startOfDay, sub, subDays } from 'date-fns';
import { Post, Prisma } from '@prisma/client';




export async function GET(req: NextRequest) {
  try {


    let url = new URL(req.url)
    let page = parseInt(url.searchParams.get('page') ?? '1');
    let take = parseInt(url.searchParams.get('take') ?? '20');
    let cursor: string | undefined = url.searchParams.get('cursor') ?? undefined;

    const offset = (page - 1) * take;

    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null
    const currentDate = new Date();

    // Subtract one month from the current date
    const oneMonthAgo = sub(currentDate, { months: 3 });

    const where: Prisma.PostWhereInput | undefined =  {
      title: {
        not: "chưa có tiêu đề"
      },
      postType: 'NORMAL',
      createdAt: {
        gte: oneMonthAgo
      },
      visible: true
    }

    let data = await prisma.post?.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      },
      take: take,
      skip: offset,
      // cursor: cursor ? { id: cursor } : undefined
    })


    let total = await prisma.post?.count({
      where,

      // cursor: cursor ? { id: cursor } : undefined
    })


    return new Response(JSON.stringify({
      data,
      total
    }));

  }
  catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 422 });
    }
    console.log(e)
    return new Response(JSON.stringify(e), { status: 500 });
  }


}



export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}