import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ProductCreateSchema, ProductUpdateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { isAdmin, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';
import { auth } from '@/lib/auth';


const routeCtxSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
});

export async function GET(req: NextRequest, context: z.infer<typeof routeCtxSchema>) {
  try {
    const { params } = routeCtxSchema.parse(context);

    // Assume that `prisma.product.findMany` is how you fetch products from your database.
    // You would filter products based on the businessId.
    const products = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    // Send the fetched products as the response
    return new Response(JSON.stringify(products));

  } catch (error) {
    return new Response(null, { status: 500 });
  }
}



export async function PATCH(req: NextRequest, context: z.infer<typeof routeCtxSchema>) {
  return auth(async (request) => {
    try {
      const { params } = routeCtxSchema.parse(context);

      // Check if the user has access to this post.
      if (!(await verifyCurrentUserHasAccessToUpdateProduct(request, params.productId)) && !(await isAdmin(request))) {
        return new Response(null, { status: 403 })
      }

      let json = await req.json();
      const { ...body } = ProductUpdateSchema.parse(json);

      let data: any = {
        ...body,
      };

      // Assume that `prisma.product.update` is how you interact with your database.
      const updatedProduct = await prisma.product.update({
        where: {
          id: params.productId,
        },
        data: data,
      });

      return new Response(JSON.stringify(updatedProduct));

    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 });
      }
      return new Response(null, { status: 500 });
    }
  })(req, context)
}


export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeCtxSchema>
) {
  return auth(async (request) => {
    try {
      // Validate the route params.
      const { params } = routeCtxSchema.parse(context)

      // Check if the user has access to this post.
      if (!(await verifyCurrentUserHasAccessToUpdateProduct(request, params.productId))) {
        return new Response("", { status: 403 })
      }

      // Delete the post.
      await prisma.product.delete({
        where: {
          id: params.productId as string,
        },
      })

      return new Response(null, { status: 204 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }


      console.log(error)

      return new Response(null, { status: 500 })
    }
  })(req, context)

}



export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}