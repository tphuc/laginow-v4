import { NextRequest, NextResponse, userAgent } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema, PageEventCreateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { getCurrentUser, verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { startOfDay, subDays } from 'date-fns';




export async function GET(req: NextRequest) {
  try {


    let url = new URL(req.url)
    let skip = parseInt(url.searchParams.get('skip') ?? '0');
    let take = parseInt(url.searchParams.get('take') ?? '20');
    let cursor: string | undefined = url.searchParams.get('cursor') ?? undefined;

    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

    let where = {
      // published: true,
    }


    let data = await db.post?.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      },
      skip: skip,
      take: take,
      cursor: cursor ? { id: cursor } : undefined
    })


    let total = await db.post?.count({
      where: where,
      orderBy: {
        createdAt: 'desc'
      },
      cursor: cursor ? { id: cursor } : undefined
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


