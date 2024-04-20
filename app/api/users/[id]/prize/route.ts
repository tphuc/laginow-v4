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

            const data = await db.userPrize.findMany({
                where: {
                    userId: params.id
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    event: {
                        select: {
                            title: true,
                            date: true
                        }
                    }
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

