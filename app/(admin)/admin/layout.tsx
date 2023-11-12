import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
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

  const user: any = await getCurrentUser()


  if (!user?.isAdmin) {
    return notFound()
  }

  

  return (
    <div className="flex min-h-screen flex-col space-y-1 md:space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={user}
          />
        </div>
      </header>
      <div className="container flex flex-col md:grid flex-1 gap-12 md:grid-cols-[200px_1fr]">

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
          ]} />
        </div>
            
        <main className="flex relative w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>

      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
