import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';



const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      const { params } = routeContextSchema.parse(context);
  
      // Assume that `prisma.product.findMany` is how you fetch products from your database.
      // You would filter products based on the businessId.
      const products = await prisma.product.findMany({
        where: {
          businessId: params.id,
        },
      });
  
      // Send the fetched products as the response
      return new Response(JSON.stringify(products));
  
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  })(req, context)
  
}



export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      let json = await req.json();
      const { ...body} = ProductCreateSchema.parse(json);
  
      const { params } = routeContextSchema.parse(context);
  
      // Check if the user has access to this post.
      if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
        return new Response(null, { status: 403 })
      }
  
  
      let data: any = {
        ...body,
      };
  
  
      // Connect with a business if a businessId is present
  
        data.business = {
          connect: {
            id: params.id,
          },
        };
  
  
      // Assume that `prisma.product.update` is how you interact with your database.
      const product = await prisma.product.create({
        data,
        select: {
          id: true
        }
      });
  
      return new Response(JSON.stringify(product));
  
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 });
      }
  
      return new Response(null, { status: 500 });
    }
  })(req, context)
  
}

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}