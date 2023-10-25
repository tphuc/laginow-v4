import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import db from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { imagekit } from "@/lib/imagekit"
import { NextRequest, NextResponse } from "next/server"


const postPatchSchema = z.object({
  title: z.string().min(3, 'Thiếu tiêu đề').max(128, 'Tối đa 128 kí tự cho tiêu đề').optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasOwnershipToPost(params.postId))) {
      return new Response("not owner", { status: 403 })
    }

    // Delete the post.
    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()

    
    let oldRecord = await db.post.findUnique({
      where: {
        id: params.postId
      }
    }) 


    let oldImages = (oldRecord?.content as any)?.blocks?.filter?.(item => item.type === 'image')?.map(item => item.data?.file?.fileId) ?? []


    let updateImages = json?.content?.blocks?.filter?.(item => item.type === 'image')?.map(item => item.data?.file?.fileId) ?? []
    let thumbnail = json?.content?.blocks?.filter?.(item => item.type === 'image')?.[0]?.data?.file?.url ?? null
    const imagesToBeDeleted = oldImages.filter?.(item => !updateImages.includes(item));
    try {
      await imagekit.bulkDeleteFiles(imagesToBeDeleted)
    }
    catch(e){
      console.log(e)
    }

    const body = postPatchSchema.parse(json)


    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body?.title,
        content: body.content,
        thumbnail
      },
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

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.post.count({
    where: {
      id: postId,
      userId: session?.user.id,
    },
  })

  return count > 0
}


async function verifyCurrentUserHasOwnershipToPost(postId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.post.findFirst({
    where: {
      id: postId,
      userId: session?.user.id,
    },
  })

  return !!count?.id
}


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}