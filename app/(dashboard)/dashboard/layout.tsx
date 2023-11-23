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

  const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-1 md:space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={user}
            businesses={businesses}
          />
        </div>
      </header>
      <div className="container flex flex-col md:grid flex-1 gap-12 md:grid-cols-[200px_1fr]">

        <div className="relative border-gray-200 sm:w-full md:w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </div>
            
        <main className="flex relative w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>

      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
