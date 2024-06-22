import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { z } from 'zod';
import { BusinessCreateSchema, BusinessUpdateSchema, FormBusinessUpdateSchema } from '@/lib/dto';

import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { isAdmin, isBusinessVerified, verifyCurrentUserHasAccessToBusiness } from '@/lib/session';
import { Context } from '@dnd-kit/sortable/dist/components';



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {
            //   if (!session) {
            //     return new Response("Unauthorized", { status: 403 })
            //   }
            //   const { user } = session

            const { params } = routeContextSchema.parse(context)

            //   console.log(22, user?.id)

            const record = await prisma.business.findUnique({
                where: {
                    id: params.id
                },
                include: {
                    tags: true,
                    Product: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            })


            return new Response(JSON.stringify(record))

        } catch (error) {

            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify(error.issues), { status: 422 })
            }

            return new Response(null, { status: 500 })
        }
    })(req, context)
}


export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    // return auth(async (request) => {})(req, context)
    return auth(async (request) => {
        try {
            const { params } = routeContextSchema.parse(context)
            // Check if the user has access to this post.
            if (!(await isAdmin(request))) {
                if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
                    return new Response("not authorized", { status: 403 })
                }
            }
            const post = await prisma.business.delete({
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
    })(req, context)

}



export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {

            let json = await req.json();
            const body = BusinessUpdateSchema.parse(json)
            const { params } = routeContextSchema.parse(context)

            // Check if the user has access to this post.
            if (!(await isAdmin(request))) {
                if (!(await verifyCurrentUserHasAccessToBusiness(request, params.id))) {
                    return new Response("not authorized", { status: 403 })
                }
            }


            let data: any = {
                ...body
            }

            if (body.tags?.length) {
                data.tags = {
                    connect: body.tags
                }
            }

            const post = await prisma.business.update({
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
    })(req, context)

}


export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {

            let json = await req.json();

            const { params } = routeContextSchema.parse(context)

            // Check if the user has access to this post.
            if (!(await isAdmin(request))) {
                // if ( !(await isBusinessVerified(params.id)) ) {
                //     return new Response("not authorized", { status: 403 })
                // }
            }

            const body = z.object({
                phone: z.any().optional(),
                website: z.any().optional(),
                facebookUrl: z.any().optional(),
                displayContact: z.any().optional(),
                googleMapsUrl: z.any().optional(),
                googleMapsUrlEmbeded: z.any().optional(),
            }).parse(json)

            const record = await prisma.business.update({
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
    })(req, context)

}

