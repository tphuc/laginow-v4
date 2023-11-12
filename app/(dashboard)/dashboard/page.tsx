import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard-header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user: any = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    // select: {
    //   id: true,
    //   title: true,
    //   published: true,
    //   createdAt: true,
    // },
    // orderBy: {
    //   updatedAt: "desc",
    // },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Bài viết" text="tạo và quản lí bài viêt">
      <PostCreateButton variant="outline" />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>Chưa có bài nào</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Bạn chưa tạo bài viết nào, hãy bắt đầu tạo bài viết mới.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
