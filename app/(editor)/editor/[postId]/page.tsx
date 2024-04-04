import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      userId: userId,
    },
    include: {

    }
  })
}

async function getSellingProductType() {
  return await prisma.sellingProductType.findMany({

  })
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const [user, sellingProductTypes] = await Promise.all([getCurrentUser(), getSellingProductType()])

  if (!user) {
    redirect("/login")
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <Editor
        post={{
          ...post,
          id: post.id,
          title: post.title,
          content: post?.content ? post.content : null,
          published: post.published,

        }}
        sellingProductTypes={sellingProductTypes}
        user={user}
      />
    </div>
  )
}
