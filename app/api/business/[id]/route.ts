import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema } from '@/lib/dto';

import db from '@/lib/prisma'
import slugify from 'slugify';



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


