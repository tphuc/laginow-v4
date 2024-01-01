import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { redirect } from "next/navigation"

interface BusinessProps {
  children?: React.ReactNode
}

export default async function BusinessLayout({ children }: BusinessProps) {
  const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col  ">
      <header className="sticky backdrop-blur-lg w-full top-0  z-40 bg-background/90 border-b border-border">
        <div className="flex items-center max-w-screen-2xl mx-auto w-full justify-between py-3 md:py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={user}
            businesses={businesses}
          />
        </div>
      </header>
      <div className="container flex flex-col md:grid flex-1 gap-12 py-10">
        {children}
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
