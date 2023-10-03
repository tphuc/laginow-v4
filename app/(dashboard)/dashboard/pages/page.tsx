import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard-header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import { BusinessPageCreateButton } from "@/components/business-page-create-button"
import { PageItems } from "@/components/page-item"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const businessPages = await prisma.business.findMany({
    where: {
     ownerId : user.id,
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
      <DashboardHeader heading="Trang kinh doanh" text="Tạo và quản lí trang">
      <BusinessPageCreateButton variant="default" >Tạo trang</BusinessPageCreateButton>
      </DashboardHeader>
      <div>
        {businessPages?.length ? (
          <div>
            
         

          <div className="divide-y mt-4 divide-border rounded-md border">
            {businessPages.map((item: any, id:any) => (
              <PageItems key={id} page={item} />
            ))}
            
          </div>
        
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="app" />
            <EmptyPlaceholder.Title>Chưa có trang nào</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Tạo trang để mọi người biết tới kinh doanh của bạn
            </EmptyPlaceholder.Description>
            <BusinessPageCreateButton variant="outline" >Tạo trang</BusinessPageCreateButton>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
