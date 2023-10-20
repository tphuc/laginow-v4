import { NextRequest } from "next/server"
import { z } from "zod"
import db from  '@/lib/prisma'


const routeContextSchema = z.object({
  params: z.object({
      id: z.string(),
  }),
})

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
      const { params } = routeContextSchema.parse(context)


      const data = await db.user.findUnique({
          where: {
              id: params.id
          },
          include: {
              businesses: true
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

