import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';



const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id)
      return new Response("cần đăng nhập", { status: 401 })

    let json = await req.json();
    const { ...body } = FormBusinessReviewCreateSchema.parse(json);

    const { params } = routeContextSchema.parse(context);

    let data: any = {
      ...body,
      userId: session?.user?.id,
      businessId: params?.id
    };



    // Assuming you have a method to fetch existing reviews
    const existingReview = await db.review.findFirst({
      where: {
        userId: session?.user?.id,
        businessId: params?.id
      }
    });

    let record;

    if (existingReview) {
      // Update the existing review
      record = await db.review.update({
        where: { id: existingReview.id },
        data: {
          ...data
        },
        include: {
          user: true
        }
      });
    } else {
      // Create a new review
      record = await db.review.create({
        data,
        include: {
          user: true
        }
      });
    }

    // Re-calculate the average rating for the business
    const avgRating = await db.review.aggregate({
      where: {
        businessId: params?.id
      },
      _avg: {
        rating: true // Assuming your reviews have a 'rating' field
      }
    });

    // Update the business model with the new average rating
    await db.business.update({
      where: {
        id: params?.id
      },
      data: {
        avgRating: avgRating?._avg?.rating
      }
    });

    return new Response(JSON.stringify(record));

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.log(error)

    return new Response(JSON.stringify(error), { status: 500 });
  }
}


export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    let url = new URL(req.url)

    let limit = parseInt(url.searchParams.get('limit') ?? '0') ?? 10
    let page = parseInt(url.searchParams.get('page') ?? '0') ?? 0
    let cursor = url.searchParams.get('cursor') ?? ''

    const items = await db.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        businessId: params.id
      },
      include: {
        user: true
      },
      // cursor: cursor ? { id: cursor } : undefined,
      take: limit,
      skip: page * limit
    });

    let total = await db.review.count({
      where: {
        businessId: params.id
      }
    })

    // let nextCursor = items?.[items.length - 1]?.id

    return new Response(JSON.stringify({
      data: items,
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


