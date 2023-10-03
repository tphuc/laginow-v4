import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"
import { ReadOnlyEditor } from "@/components/read-only-editor"

async function getPostForUser(postId: Post["id"]) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
        user: true
    }
  })
}

interface EditorPageProps {
  params: { id: string }
}

export default async function EditorPage({ params }: EditorPageProps) {

  const post = await getPostForUser(params.id)

  if (!post) {
    notFound()
  }

  return (
    <ReadOnlyEditor
      post={post}
    />
  )
}
