import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';
import { isAdmin, isBusinessVerified, verifyCurrentUserHasAccessToBusiness } from '@/lib/session';



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        //   const session = await getServerSession(authOptions)
        //   if (!session) {
        //     return new Response("Unauthorized", { status: 403 })
        //   }
        //   const { user } = session

        const { params } = routeContextSchema.parse(context)

        //   console.log(22, user?.id)

        const post = await db.business.findUnique({
            where: {
                id: params.id
            },
            include: {
                tags: true
            }
        })

        return new Response(JSON.stringify(post))

    } catch (error) {

        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}


export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        const { params } = routeContextSchema.parse(context)
        const post = await db.business.delete({
            where: {
                id: params.id
            },
        })

        return new Response(JSON.stringify(post))

    } catch (error) {

        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}



export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {

        let json = await req.json();
        const body = BusinessUpdateSchema.parse(json)
        const { params } = routeContextSchema.parse(context)

        // Check if the user has access to this post.
        if(!(await isAdmin())){
            if ( !(await verifyCurrentUserHasAccessToBusiness(params.id)) ) {
                return new Response("not authorized", { status: 403 })
            }
        }
       
       

      

        let data: any = {
            ...body
        }

        if(body.tags?.length){
            data.tags = {
                connect: body.tags
            }
        }

        const post = await db.business.update({
            where: {
                id: params.id
            },
            data: data
        })

        return new Response(JSON.stringify(post))

    } catch (error) {

        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}


export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {

        let json = await req.json();
      
        const { params } = routeContextSchema.parse(context)

          // Check if the user has access to this post.
          if(!(await isAdmin())){
            // if ( !(await isBusinessVerified(params.id)) ) {
            //     return new Response("not authorized", { status: 403 })
            // }
        }

        const body = z.object({
            phone: z.string().optional(), 
            website: z.string().optional(),
            facebookUrl: z.string().optional(),
            displayContact: z.boolean().optional(),
            googleMapsUrl: z.string().optional(),
            googleMapsUrlEmbeded: z.string().optional(),
        }).parse(json)

        const record = await db.business.update({
            where: {
                id: params.id
            },
            data: body
        })

        return new Response(JSON.stringify(record))

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}


export const OPTIONS = async (request: NextRequest) => {
    return new NextResponse('', {
      status: 200
    })
  }

