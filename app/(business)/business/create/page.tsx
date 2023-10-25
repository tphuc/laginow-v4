import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import DashboardLayout from "@/app/(dashboard)/dashboard/layout"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { CreateBusinessForm } from "@/components/create-business-form"

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

export const runtime = "edge"

interface Props {
  params: { postId: string }
}

export default async function Page({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }


  return (

        <div className="relative max-w-screen-md w-full gap-2">
            <h1 className="text-3xl font-heading">Tạo trang</h1>
            <p className="text-lg w-full text-muted-foreground">Giới thiệu về trang của bạn</p>
            <br/>
            <CreateBusinessForm/>
        </div>

  )
}
