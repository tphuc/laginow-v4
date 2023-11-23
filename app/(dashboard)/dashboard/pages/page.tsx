import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
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
  const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

  if (!user) {
    redirect("/login")
  }



  return (
    <DashboardShell>
      <DashboardHeader heading="Trang kinh doanh" text="Tạo và quản lí trang">
      <BusinessPageCreateButton variant="default" >Tạo trang</BusinessPageCreateButton>
      </DashboardHeader>
      <div>
        {businesses?.length ? (
          <div>
            
          <div className="divide-y mt-4 divide-border rounded-md border">
            {businesses.map((item: any, id:any) => (
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
