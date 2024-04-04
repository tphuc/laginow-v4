import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
// import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const [user, businesses] = await Promise.all([getCurrentUser() as any, getUserBusiness()]);


  if (!user?.isAdmin) {
    return notFound()
  }

  

  return (
    <div className="flex min-h-screen flex-col">
     <header className="sticky backdrop-blur-lg w-full top-0  z-40 bg-background/90 border-b border-border">
                <div className="flex items-center max-w-screen-2xl mx-auto w-full justify-between py-3 md:py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
          businesses={businesses}
            user={user}
          />
        </div>
      </header>
      <div className="container flex flex-col md:grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-1">

        <div className="relative border-gray-200 sm:w-full md:w-[200px] flex-col md:flex">
          <DashboardNav items={[
            {
              title:"Tổng quan",
              href:"/admin",
              icon:"app"
            },
            {
              title:"Người dùng",
              href:'/admin/users',
              icon: 'user'
            },
            {
              title:"Trang",
              href:'/admin/business',
              icon:'globe'
            },
            {
              title:"Bài viết ",
              href:'/admin/posts',
              icon:'pen'
            },
            {
              title:"Sự kiện ",
              href:'/admin/events',
              icon:'rocket'
            },
          ]} />
        </div>
            
        <main className="flex relative w-full flex-1 flex-col overflow-hidden py-4">
          {children}
        </main>

      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
