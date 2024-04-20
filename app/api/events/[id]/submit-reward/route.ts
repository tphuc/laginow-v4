import { NextRequest } from "next/server"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { isAuthenticated } from "@/lib/session"
import slugify from "slugify"
import prisma from "@/lib/prisma"


const routeContextSchema = z.object({
  params: z.object({
      id: z.string(),
  }),
})

const FormSchema = z.object({
    prize: z.any(),
})

export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    return auth(async (request) => {
      try {
        if (!(await isAuthenticated(request))) {
          return new Response("not authorized", { status: 403 })
        }
  
        const { params } = routeContextSchema.parse(context)
        let json = await req.json();
        const { ...body } = FormSchema.parse(json);

        let record = await prisma.userPrize?.create({
            data: {
                user: {
                  connect: {
                    id: request.auth?.user?.id as string,
                  },
                },
                event: {
                  connect: {
                    id: params.id
                  }
                },
                prize: body.prize
            } as any
        })

  
        return new Response(JSON.stringify(record))
  
      } catch (error) {
        return new Response("Bạn không thể quay thưởng", { status: 400 })
      }
    })(req, context)
  
  }
  