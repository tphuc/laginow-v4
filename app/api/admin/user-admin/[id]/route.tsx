import * as z from "zod"


import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { NextAuthRequest } from "next-auth/lib"
import { isAdmin } from "@/lib/session"


const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {

  return auth(async (request) => {
    try {
      // Validate route params.
      const { params } = routeContextSchema.parse(context)
  
     
      if(!(await isAdmin(request))){
          return new Response("not authorized", { status: 403 })
      }
        
      const json = await req.json()

      await prisma.user.update({
        where: {
          id: params.id
        },
        data: {
          isAdmin: json.isAdmin
        }
      }) 
  
      return new Response(null, { status: 200 })
  
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }

  })(req, context) as any
  
}

