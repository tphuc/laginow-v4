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

    if(!user){
      redirect("/login")
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
        <div className="container flex flex-col pb-4 md:grid flex-1 gap-12 ">
            {children}
        </div>
        {/* <SiteFooter className="border-t" /> */}
      </div>
    )
  }
  