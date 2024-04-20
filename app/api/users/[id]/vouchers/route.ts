import { NextRequest } from "next/server"
import { z } from "zod"
import db from '@/lib/prisma'
import { auth } from "@/lib/auth"


const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
        try {
            const { params } = routeContextSchema.parse(context)


            let userPrize = await db.userPrize?.findMany({
                where: {
                    userId: params.id
                }
            }) ?? []



            const data = await db.eventQuestion.findMany({
                where: {
                    id: {
                        notIn: userPrize?.map?.(item => item?.eventId)
                    },
                    winners: {
                        some: {
                            id: params.id
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    prizeSnapshot: true
                }
            })


            return new Response(JSON.stringify(data))

        } catch (error) {

            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify(error.issues), { status: 422 })
            }

            return new Response(null, { status: 500 })
        }
    }
    )(req, context)
}

