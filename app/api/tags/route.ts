import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import db from 'lib/prisma'


export async function GET() {
    try {
    //   const session = await getServerSession(authOptions)
  
    //   if (!session) {
    //     return new Response("Unauthorized", { status: 403 })
    //   }
  

      const records = await db.tag.findMany({
       
      })
  
      return new Response(JSON.stringify(records))
    } catch (error) {
      return new Response(null, { status: 500 })
    }
  }


