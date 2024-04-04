
import prisma from 'lib/prisma'


export async function GET() {
    try {

      const records = await prisma.masterTag.findMany({
        include: {
          tags: true
        }
      })
  
      return new Response(JSON.stringify(records))
    } catch (error) {
      return new Response(null, { status: 500 })
    }
  }


