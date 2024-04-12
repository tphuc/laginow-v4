import * as z from "zod"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"



const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
})


export async function GET(
    req: NextRequest,
    context: z.infer<typeof routeContextSchema>
) {

    return auth(async (request) => {
        try {


            const items = await prisma.businessVoucher.findMany({
                where: {
                    availableTo: {
                        gt: new Date()
                    },
                },
                include: {
                    business: {
                        select: {
                            id: true,
                            title: true,
                        }
                    }
                }
            });

            return new Response(JSON.stringify(items), { status: 200 })

        } catch (error) {
            console.log(error)
            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify(error.issues), { status: 422 })
            }

            return new Response(null, { status: 500 })
        }

    })(req, context) as any

}

