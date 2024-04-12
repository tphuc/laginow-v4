
import prisma from 'lib/prisma'
import { isAdmin } from "@/lib/session"
import { NextRequest } from "next/server"
import { z } from "zod"
import slugify from "slugify"
import { VNDatetimeToISO } from "@/lib/utils"
import { auth } from '@/lib/auth'




const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})


export async function GET(req: NextRequest, context: any) {
  return auth(async (request) => {
    try {
      console.log(22, request)
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }

      let url = new URL(req.url)
      let limit = parseInt(url.searchParams.get('limit') ?? '10') ?? 10
      let page = parseInt(url.searchParams.get('page') ?? '1') ?? 1


      const items = await prisma.eventQuestion.findMany({
        orderBy: {
          tzDatetime: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit
      });

      let total = await prisma.eventQuestion.count({})

      console.log(38, items.length)
      // return new Response(JSON.stringify({
      //   data: items ?? [],
      //   total
      // }));

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


const EventQuestionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  multiChoice: z.boolean().default(false),
  image: z.any().optional(),
  questions: z.any().optional(),
  answerText: z.string().optional(),
  answerTextSlug: z.string().optional(),
  time: z.string(),
  date: z.string(),
  vouchers: z.any().optional(),
  adsPosts: z.any().optional(),
  adsPages: z.any().optional(),
  adsFB: z.any().optional(),
  availableHrs: z.number().int().default(24),

});


export async function POST(req: NextRequest, context: any) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }

      let json = await req.json();
      const { vouchers, adsPosts, adsPages, adsFB, ...body } = EventQuestionSchema.parse(json);

      let record = await prisma.eventQuestion?.create({
        data: {
          ...body,
          vouchers: vouchers ? {
            connect: vouchers
          } : undefined,
          adsPosts: adsPosts ? {
            connect: adsPosts
          } : undefined,
          adsPages: adsPages ? {
            connect: adsPages
          } : undefined,
          adsFB: adsFB ? {
            connect: adsFB
          } : undefined,
          answerTextSlug: slugify(body?.answerText ?? '', { lower: true, replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
          correctIndexes: body.questions ? body?.questions?.map((item, id) => id) : [],
          tzDatetime: VNDatetimeToISO(body.date, body.time)
        }
      })

      return new Response(JSON.stringify(record))

    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}


