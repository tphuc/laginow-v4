import { NextRequest, NextResponse, userAgent } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma'




export async function GET(req: NextRequest) {
  try {


    // get page and lastCursor from query
    const url = new URL(req.url);

    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("cursor");
    const tag = url.searchParams.get("tag");
    const _tags = url.searchParams.get("tags") ?? null
    const text = url.searchParams.get("text");

    console.log('last cursor', lastCursor)

    let tags = _tags?.split(',') ?? []


    let where = {}

    if (tag) {
      where['tags'] = {
        some: {
          id: tag
        }
      }
    }

    if (tags?.length) {
      where['tags'] = {
        some: {
          id: {
            in: tags ?? []
          }
        }
         
     
      }
    }


    if(text){
      where[`OR`] = [
        {
          title: {contains: text ?? ''}
        },
        {
          address: {contains: text ?? ''}
        },
        {
          slug: {contains: text ?? ''}
        }
      ]
    }

    let result = await db.business.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        }
      }),
      include: {
        tags: true,
      },
      where,
      orderBy: {
        id: "desc",
      },
    });

    if (result.length == 0) {
      return new Response(JSON.stringify({
        data: [],
        metaData: {
          lastCursor: null,
          hasNextPage: false,
        },
      }), { status: 200 });
    }

    const lastPostInResults: any = result[result.length - 1];
    const cursor: any = lastPostInResults?.id;

    const nextPage = await db.business.findMany({
      // Same as before, limit the number of events returned by this query.
      take: take ? parseInt(take as string) : 10,
      
      skip: 1, // Do not include the cursor itself in the query result.
      cursor:{
        id: cursor,
      },
      where,
      orderBy: {
        id: "desc",
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      }
    };



    return new Response(JSON.stringify(data), { status: 200 });

  }
  catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 422 });
    }


    return new Response(JSON.stringify(e), { status: 500 });
  }


}



export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}