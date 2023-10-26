import { NextRequest, NextResponse, userAgent } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema, PageEventCreateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { getCurrentUser, verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { startOfDay, subDays } from 'date-fns';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user



    let userAgentInfo = userAgent(req)
    let referer = req.headers.get('referer') ?? ''

    const { params } = routeContextSchema.parse(context);

    let json = await req.json();
    const body = PageEventCreateSchema.parse(json);

    if (user?.id) {
      let recentUserInteraction = await db.pageEvent?.findFirst({
        where: {
          userId: user?.id
        },
        orderBy: {
          timestamp: 'desc'
        }
      })

      let lastInteractionTime = new Date(recentUserInteraction?.timestamp as any).getTime()
      let currentTime = new Date().getTime()

      if (!lastInteractionTime) {
        let record = await db.pageEvent.create({
          data: {
            ...body,
            ipAddress: req.ip,
            referer: referer,
            businessId: params?.id,
            geo: req.geo,
            userId: user?.id,
            userAgent: JSON.parse(JSON.stringify(userAgentInfo))
          }
        })

        return new Response(JSON.stringify(record));
      }

      if (currentTime - lastInteractionTime >= 60 * 5 * 1000) {
        let record = await db.pageEvent.create({
          data: {
            ...body,
            ipAddress: req.ip,
            referer: referer,
            businessId: params?.id,
            geo: req.geo,
            userId: user?.id,
            userAgent: JSON.parse(JSON.stringify(userAgentInfo))
          }
        })

        return new Response(JSON.stringify(record));
      }
      else {
        return new Response(JSON.stringify({ msg: currentTime - lastInteractionTime }));
      }

    }

    else {
      let record = await db.pageEvent.create({
        data: {
          ...body,
          timestamp: new Date(),
          ipAddress: req.ip,
          referer: referer,
          businessId: params?.id,
          geo: req.geo,
          userId: user?.id,
          userAgent: JSON.parse(JSON.stringify(userAgentInfo))
        }
      })

      return new Response(JSON.stringify(record));
    }






  } catch (error) {
    console.log(93, error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify(error), { status: 500 });
  }
}


export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {


    let url = new URL(req.url)
    let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
    let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

    let pageEvents = await db.pageEvent?.groupBy({
      by: ['timestamp'],
      where: {
        timestamp: {
          gte: from,
          lte: to
        },

        eventType: 'PAGE_VIEW'
      },
      orderBy: {
        timestamp: 'asc'
      },
      _count: {
        id: true
      }
    })

    let todayPageViews = await db.pageEvent?.count({
      where: {
        timestamp: {
          gte: startOfDay(new Date())
        }
      }
    })

    return new Response(JSON.stringify({
      pageViews: pageEvents,
      todayPageViews
    }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });

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