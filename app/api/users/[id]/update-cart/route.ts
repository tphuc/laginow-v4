import { NextRequest } from "next/server"
import { z } from "zod"
import db from  '@/lib/prisma'


const routeContextSchema = z.object({
  params: z.object({
      id: z.string(),
  }),
})

let updateSchema = z.object({
    cart: z.any()
})

export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {

      let json = await req.json();
      const body = updateSchema.parse(json)
      const { params } = routeContextSchema.parse(context)


      const data = await db.user.update({
          where: {
              id: params.id
          },
         data: {
            cart: JSON.parse(JSON.stringify(body?.cart))
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

