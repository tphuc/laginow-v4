import { NextRequest, NextResponse, userAgent } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma'




export async function GET(req: NextRequest) {
  try {


    let url = new URL(req.url)
    let skip = parseInt(url.searchParams.get('skip') ?? '0');
    let take = parseInt(url.searchParams.get('take') ?? '20');
    let cursor: string | undefined = url.searchParams.get('cursor') ?? undefined;
    let tag = url.searchParams.get('tag') ?? null;

    // let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    // let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

    let where = {
      // published: true,
    }

    if(tag){
      where['tags'] = {
        some: {
          id: tag
        }
      }
    }

    let data = await db.business?.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        tags: true
      },
      skip: skip,
      take: take,
      cursor: cursor ? { id: cursor } : undefined
    })

    let total = await db.business?.count({
      where,
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


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}