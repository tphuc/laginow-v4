
import prisma from 'lib/prisma'
import { isAdmin, verifyCurrentUserHasAccessToBusiness } from "@/lib/session"
import { NextRequest } from "next/server"
import { z } from "zod"
import slugify from "slugify"
import { VNDatetimeToISO } from "@/lib/utils"
import { auth } from '@/lib/auth'



const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
    voucherId: z.string()
  }),
})





const UpdateVoucherSchema = z.object({
  code: z.string(),
  description: z.string().optional(),
  availableTo: z.string().optional(),
  userId: z.string().optional()
});




export async function POST(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await verifyCurrentUserHasAccessToBusiness(request, context.params.id))) {
        return new Response("not authorized", { status: 403 })
      }

      const { params } = routeContextSchema.parse(context)
      let json = await req.json();
      const { ...body } = UpdateVoucherSchema.parse(json);

      let record = await prisma.businessVoucher?.update({
        where: {
          id: params.voucherId
        },
        data: {
          ...body,
        }
      })

      return new Response(JSON.stringify(record))

    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}


export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  return auth(async (request) => {
    try {
      if (!(await verifyCurrentUserHasAccessToBusiness(request, context.params.id))) {
        return new Response("not authorized", { status: 403 })
      }

      await prisma.businessVoucher.delete({
        where: {
          id: context.params.voucherId
        }
      })
   
      return new Response(null, {status:200})

    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 })
    }
  })(req, context)

}


