import prisma from 'lib/prisma'
import { auth } from "@/lib/auth"


export async function GET() {
  try {
    const records = await prisma.tag.findMany({

    })

    return new Response(JSON.stringify(records))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}


export const POST = auth(async (req) => {
  try {
    const records = await prisma.tag.findMany({

    })

    return new Response(JSON.stringify(records))
  }
  catch (error) {
    return new Response(null, { status: 500 })
  }
})
