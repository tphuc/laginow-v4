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

  const user = await getCurrentUser()

  


  return (
    <div className="flex min-h-screen flex-col space-y-1 md:space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          {user && <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          /> }
        </div>
      </header>
      <div className="relative w-full container max-w-[100vw] overflow-hidden">
          {children}
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
