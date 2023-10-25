import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import db from "@/lib/prisma"
import { RequiresProPlanError } from "@/lib/exceptions"
import slugify from "slugify"
import { emailTemplate, htmlOrderTemplate, mailTransporter } from "@/lib/email"
import { NextRequest, NextResponse } from "next/server"
// import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

let orderSchema = z.object({
  cart: z.any(),
  deliveryAddress: z.string(),
  deliveryPhone: z.string()
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const json = await req.json()
    const body = orderSchema.parse(json)

    let cart = body.cart;

    if(!Object.values(cart)?.length){
      return new Response("Cart is empty", { status: 400 })
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        deliveryAddress: body.deliveryAddress,
        deliveryPhone: body.deliveryPhone,
        cart: JSON.stringify({})
      }
    })

    const orderItems = Object.values(cart).map((item: any) => {
      return {
        product: { connect: { id: item.id } },
        quantity: item.quantity,
        price: item.price || 0,  // Assuming default price is 0 if not provided
      };
    });

    const order = await db.order.create({
      data: {
        items: { create: orderItems },
        user: { connect: { id: user.id } },
        business: { connect: { id: cart[Object.keys(cart)[0]].businessId } },
        deliveryAddress: body.deliveryAddress,
        deliveryPhone: body.deliveryPhone,
      },
      include: {
        business: {
          include: {
            owner: true
          }
        },
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const email = await mailTransporter.sendMail({
      from: 'contact@laginow.com', // sender address
      to: `felixtran2000@gmail.com`, // list of receivers
      subject: "Yêu cầu đơn hàng mới trên Lagi NoNow", // Subject line
      text: "Hello world?", // plain text body
      html: emailTemplate({
        time: order?.createdAt,
        name: user?.name,
        phone: body.deliveryPhone,
        address: body.deliveryAddress,
        businessId: cart[Object.keys(cart)[0]].businessId,
        items: order?.items ?? []
      }), // html body
    }).catch((e) => console.log(e));


  
  

    return new Response(JSON.stringify(order), { status: 200 });


  } catch (error) {
    
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(JSON.stringify(error), { status: 500 })
  }
}


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}