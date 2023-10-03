import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { ProductCreateSchema, ProductUpdateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { isAdmin, verifyCurrentUserHasAccessToUpdateProduct } from '@/lib/session';


const routeCtxSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
});

export async function GET(req: NextRequest, context: z.infer<typeof routeCtxSchema>) {
  try {
    const { params } = routeCtxSchema.parse(context);

    // Assume that `db.product.findMany` is how you fetch products from your database.
    // You would filter products based on the businessId.
    const products = await db.product.findUnique({
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
  try {
    const { params } = routeCtxSchema.parse(context);
    
     // Check if the user has access to this post.
     if (!(await verifyCurrentUserHasAccessToUpdateProduct(params.productId)) && !(await isAdmin())) {
      return new Response(null, { status: 403 })
    }
  
    let json = await req.json();
    const { ...body} = ProductUpdateSchema.parse(json); 

    let data: any = {
      ...body,
    };

    // Assume that `db.product.update` is how you interact with your database.
    const updatedProduct = await db.product.update({
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
}