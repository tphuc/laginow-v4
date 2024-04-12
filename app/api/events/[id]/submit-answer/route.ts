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
    eventId: z.any(),
    answerText: z.any().optional(),
    choiceIndex: z.any().optional()
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

        let findAnswer = await prisma.userAnswer?.findFirst({
            where: {
              
                userId: request.auth?.user?.id as string,
                eventId: params.id
            } as any
        })

        if(findAnswer){
          return new Response("Bạn đã trả lời", {status: 400})
        }

        let record = await prisma.userAnswer?.create({
          data: {
            ...body,
            user: {
              connect: {
                id: request.auth?.user?.id as string
              },
            },
            event: {
              connect: {
                id: params.id,
              }
            },
            answerTextSlug: slugify(body?.answerText ?? '', { lower: true, replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
          }
        })
  
        return new Response(JSON.stringify(record))
  
      } catch (error) {
        console.log(54, error)
        return new Response(JSON.stringify(error), { status: 400 })
      }
    })(req, context)
  
  }
  