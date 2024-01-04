import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import db from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { imagekit } from "@/lib/imagekit"
import { NextRequest, NextResponse } from "next/server"
import slugify from "slugify"
import { isAdmin } from "@/lib/session"


const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})


export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if(!(await isAdmin())){
        return new Response("not authorized", { status: 403 })
    }
      
    const json = await req.json()
    
    
    await db.user.update({
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
}


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}