import { NextRequest, NextResponse, userAgent } from 'next/server';


import { auth } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema, PageEventCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { getCurrentUser, verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { startOfDay, subDays } from 'date-fns';
import { startOfDayVN } from '@/lib/utils';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async(request) => {
    try {
  
      const user = request?.auth?.user
  
      let tzTimestamp = startOfDayVN(new Date())
      let userAgentInfo = userAgent(req)
      let referer = req.headers.get('referer') ?? ''
  
      const { params } = routeContextSchema.parse(context);
  
      let json = await req.json();
      const body = PageEventCreateSchema.parse(json);
  
      if (user?.id) {
        let recentUserInteraction = await prisma.pageEvent?.findFirst({
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
          let record = await prisma.pageEvent.create({
            data: {
              ...body,
              ipAddress: req.ip,
              timestamp: new Date(),
              tzTimestamp: tzTimestamp,
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
          let record = await prisma.pageEvent.create({
            data: {
              ...body,
              ipAddress: req.ip,
              referer: referer,
              timestamp: new Date(),
              tzTimestamp: tzTimestamp,
              businessId: params?.id,
              geo: req.geo,
              userId: user?.id,
              userAgent: JSON.parse(JSON.stringify(userAgentInfo))
            }
          })
  
          return new Response(JSON.stringify(record), {
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          });
        }
        else {
          return new Response(JSON.stringify({ msg: currentTime - lastInteractionTime }), {
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }) ;
        }
  
      }
  
      else {
        let record = await prisma.pageEvent.create({
          data: {
            ...body,
            timestamp: new Date(),
            tzTimestamp: tzTimestamp,
            ipAddress: req.ip,
            referer: referer,
            businessId: params?.id,
            geo: req.geo,
            userId: user?.id,
            userAgent: JSON.parse(JSON.stringify(userAgentInfo))
          }
        })
  
        return new Response(JSON.stringify(record), {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
  
  
  
  
  
  
    } catch (error) {
      console.log(93, error)
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 });
      }
  
      return new Response(JSON.stringify(error), { status: 500 });
    }
  })(req, context)

}


export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {


      let url = new URL(req.url)
      let from = new Date(url.searchParams.get('from') ?? subDays(new Date(), 7)) ?? null
      let to = new Date(url.searchParams.get('to') ?? new Date()) ?? null

      let pageViewEvents = await prisma.pageEvent?.groupBy({
        by: ['tzTimestamp'],
        where: {
          businessId:  context.params.id,
          tzTimestamp: {
            gte: from,
            lte: to
          },
          eventType:"PAGE_VIEW"
        },
        orderBy: {
          tzTimestamp: 'asc'
        },
        _count: {
          id: true
        }
      })
  
      let todayPageViews = await prisma.pageEvent?.count({
        where: {
          tzTimestamp: startOfDayVN(new Date()),
          eventType:"PAGE_VIEW"
        }
      })
  
      let todaySearchViews = await prisma.pageEvent?.count({
        where: {
          tzTimestamp: startOfDayVN(new Date()),
          eventType:"SEARCH_VIEW"
        }
      })
  
      return new Response(JSON.stringify({
        pageViews: pageViewEvents,
        todayPageViews,
        todaySearchViews
      }));
  
    }
    catch (e) {
      if (e instanceof z.ZodError) {
        return new Response(JSON.stringify(e.issues), { status: 422 });
      }
      console.log(e)
      return new Response(JSON.stringify(e), { status: 500 });
    }
  })(req, context)



}



export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}