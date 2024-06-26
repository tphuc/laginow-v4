import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema, ProductCreateSchema } from '@/lib/dto';
import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { verifyCurrentUserHasAccessToBusiness, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { auth } from '@/lib/auth';



const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const data = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });


    return new Response(JSON.stringify(data));

  } catch (error) {
    return new Response(null, { status: 500 });
  }
}



export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (reqeust) => {
    try {
      let json = await req.json();
      const { ...body} = ProductCreateSchema.parse(json);
  
      const { params } = routeContextSchema.parse(context);
  
      // Check if the user has access to this post.
      // if (!(await verifyCurrentUserHasAccessToBusiness(params.id))) {
      //   return new Response(null, { status: 403 })
      // }
  
  
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
