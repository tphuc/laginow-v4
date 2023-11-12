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

  if (!user?.isAdmin) {
    redirect("/404")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Tổng quan" text="">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>
        
      </div>
    </DashboardShell>
  )
}
