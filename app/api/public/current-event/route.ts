import { NextRequest, NextResponse, userAgent } from 'next/server';
import { z } from 'zod';

import prisma from '@/lib/prisma'




export async function GET(req: NextRequest) {
  try {
  
    const nextEvent = await prisma.eventQuestion.findFirst({
      where: {
        tzDatetime: {
          gt: new Date()
        }
      },
      orderBy: {
        tzDatetime: 'asc'
      },
      select: {
        questions: true
      }
    });
  

    return new Response(JSON.stringify(nextEvent));

  }
  catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 422 });
    }
    console.log(e)
    return new Response(JSON.stringify(e), { status: 500 });
  }


}
