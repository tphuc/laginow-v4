
import prisma from 'lib/prisma'
import { isAdmin, isAuthenticated } from "@/lib/session"
import { NextRequest } from "next/server"
import { z } from "zod"
import slugify from "slugify"
import { VNDatetimeToISO } from "@/lib/utils"
import { auth } from '@/lib/auth'




const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})


const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})



export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {

      if (!(await isAuthenticated(request))) {
        return new Response("not authorized", { status: 403 })
      }

      let url = new URL(req.url)
      let limit = parseInt(url.searchParams.get('limit') ?? '10') ?? 10
      let page = parseInt(url.searchParams.get('page') ?? '1') ?? 1


      const items = await prisma.businessVoucher.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit
      });

      let total = await prisma.businessVoucher.count({})

      return new Response(JSON.stringify({
        data: items,
        total
      }), { status: 200 })

    }
    catch (e) {
      console.log(61, e)
      if (e instanceof z.ZodError) {
        return new Response(JSON.stringify(e.issues), { status: 422 });
      }

      return new Response(JSON.stringify(e), { status: 500 });
    }
  })(req, context)



}


const CreateVoucherSchema = z.object({
  code: z.string(),
  description: z.string().optional(),
  availableTo: z.date(),
  businessId: z.string(),
  userId: z.string().optional()
});


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }
      let json = await req.json();
      const { ...body } = CreateVoucherSchema.parse(json);

      const data: any = {
        business : {
          connect: {
            id: context.params.id as string,
          },
        },
        ...body,
      }

      let record = await prisma.businessVoucher?.create({
        data
      })

      return new Response(JSON.stringify(record))

    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}


