import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema, FormBusinessReviewCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { isAdmin, verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { auth } from '@/lib/auth';



const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {

      if(!(await isAdmin(request))){
        return new Response("not authorized", { status: 403 })
      }
  
      let body = await req.json();
    
  
      const { params } = routeContextSchema.parse(context);
      
      await prisma.business?.update({
        where: {
          id: params.id
        },
        data: {
          verified: body?.verified
        }
      })
  
  
      return new Response(JSON.stringify({}));
  
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 });
      }
  
      console.log(error)
  
      return new Response(JSON.stringify(error), { status: 500 });
    }
  })(req, context)
 
}

