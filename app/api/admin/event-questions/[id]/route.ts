
import prisma from 'lib/prisma'
import { isAdmin } from "@/lib/session"
import { NextRequest } from "next/server"
import { z } from "zod"
import slugify from "slugify"
import { VNDatetimeToISO } from "@/lib/utils"
import { auth } from '@/lib/auth'
import { deleteImage } from '@/lib/google'




const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})



const EventQuestionSchema = z.object({
  title: z.string().optional(),
  image: z.any().optional(),
  description: z.string().optional(),
  multiChoice: z.boolean().default(false),
  questions: z.any().optional(),
  answerText: z.string().optional(),
  answerTextSlug: z.string().optional(),
  time: z.string().optional(),
  date: z.string().optional(),
  availableHrs: z.number().int().default(24),
  vouchers: z.any().optional(),
  adsPosts: z.any().optional(),
  adsPages: z.any().optional(),
  adsFB: z.any().optional(),
});

const findTrueIndices = (array) => {
  const trueIndices: any[] = [];
  array.forEach((item, index) => {
    if (item.isTrue) {
      trueIndices.push(index);
    }
  });

  return trueIndices;

};

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }
      const { params } = routeContextSchema.parse(context)
      let record = await prisma.eventQuestion.findUnique({
        where: {
          id: params.id
        },
        include: {
          vouchers: {
            select: {
              id: true,
              code: true,
              business: {
                select: {
                  id: true,
                  title: true
                }
              }
            }
          },
          adsPages: {
            select: {
              id: true,
              title: true
            }
          },
          adsPosts: {
            select: {
              id: true,
              title: true
            }
          },
          UserAnswer: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true
                }
              }
            }
          },
          winners: {
            select: {
              email: true
            }
          }
        }
      })

      return new Response(JSON.stringify(record))
      
    } catch (e) {

    }
  })(req, context)

}

export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }

      const { params } = routeContextSchema.parse(context)
      let json = await req.json();
      const { vouchers, adsPosts, adsPages, ...body } = EventQuestionSchema.parse(json);
      let record = await prisma.eventQuestion?.update({
        where: {
          id: params.id
        },
        data: {
          ...body,
          vouchers: vouchers ? {
            set: vouchers
          } : undefined,
          adsPosts: adsPosts ? {
            set: adsPosts
          } : undefined,
          adsPages: adsPages ? {
            set: adsPages
          } : undefined,
          correctIndexes: body.questions ? findTrueIndices(body.questions) : [],
          answerTextSlug: slugify(body?.answerText ?? '', { lower: true, replacement: '-', locale: 'vi', remove: /[^a-zA-Z0-9\s]/g }),
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


export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }

      let event = await prisma.eventQuestion.findUnique({
        where: {
          id: context.params.id
        }
      })

      if (event?.image?.['id'])
        await deleteImage(event?.image?.['id'])?.catch(e => console.log(149, e))

      await prisma.eventQuestion.delete({
        where: {
          id: context.params.id
        }
      })

      return new Response(null, { status: 200 })

    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}


