
import prisma from 'lib/prisma'
import { isAdmin } from "@/lib/session"
import { NextRequest } from "next/server"
import { z } from "zod"
import slugify from "slugify"
import { VNDatetimeToISO } from "@/lib/utils"
import { auth } from '@/lib/auth'
import { deleteImage } from '@/lib/google'
import pickRandom from 'pick-random';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})



const findTrueIndices = (array) => {
  const trueIndices: any[] = [];
  array.forEach((item, index) => {
    if (item.isTrue) {
      trueIndices.push(index);
    }
  });
  console.log(81, trueIndices)
  return trueIndices;

};


export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await isAdmin(request))) {
        return new Response("not authorized", { status: 403 })
      }

      const { params } = routeContextSchema.parse(context)

      let event = await prisma.eventQuestion.findUnique({
        where: {
          id: params?.id
        },
        include: {
          winners: true,
          vouchers: {
            select: {
              code: true,
              availableFrom: true,
              availableTo: true,
              description: true
            }
          }
        }
      })

      // if(event?.winners?.length){
      //   return new Response("not available", { status: 400 })
      // }

      let userWinners: any[] = []

      if (event?.multiChoice) {
        let correctIndexes = JSON.parse(JSON.stringify(event.correctIndexes))?.map?.(item => parseInt(item))
        let correctUserAnswers = await prisma.userAnswer.findMany({
          where: {
            eventId: params?.id,
            choiceIndex: {
              in: correctIndexes
            },
          },
          include: {
            user: true
          }

        })

        userWinners = pickRandom(correctUserAnswers, { count: 1 })

      }

      else {

        let correctUserAnswers = await prisma.userAnswer.findMany({
          where: {
            eventId: params?.id,
            answerTextSlug: event?.answerTextSlug
          },
          include: {
            user: true
          }

        })

        userWinners = pickRandom(correctUserAnswers, { count: 1 })

      }


      await prisma.eventQuestion.update({
        where: {
          id: params.id,
        },
        data: {
          winners: {
            set: userWinners?.map?.(item => ({ id: item?.userId }))
          },
          prizeSnapshot: JSON.parse(JSON.stringify(event?.vouchers))

      }
      })


      return new Response(JSON.stringify(userWinners), { status: 200 })

    } catch (error) {
      console.log(86, error)
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}



