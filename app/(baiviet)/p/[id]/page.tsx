import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"
import { ReadOnlyEditor } from "@/components/read-only-editor"
import { Metadata, ResolvingMetadata } from "next"

async function getPostForUser(postId: Post["id"]) {
  return await prisma.post.findFirst({
    where: {
      OR: [
        {
          id: postId,
        },
        {
          slug: postId
        }
      ]
    },
    include: {
        user: true
    }
  })
}

export async function generateStaticParams() {
  const posts =  await prisma.post.findMany({
    where: {
      slug: {
        not: null
      }
    }
  })
 
  return posts.map((post) => ({
    id: post.slug,
  }))
}

interface EditorPageProps {
  params: { id: string }
}

// or Dynamic metadata
export async function generateMetadata(
  { params }: EditorPageProps,
  // parent: ResolvingMetadata
) {
  const post: any = await getPostForUser(params.id)
  let images: any[] = []
  if(post?.thumbnail){
    images?.push(post?.thumbnail)
  }
  else {
    images?.push('/ctahero.jpeg')
  }
  return {
    title: post?.title,
    openGraph: {
      images
    },
    alternates: {
      canonical: `/p/${post.slug}`,
    },
  } as Metadata
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
