import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"

interface BusinessProps {
  children?: React.ReactNode
}
  
  export default async function BusinessLayout({ children }: BusinessProps) {
    const user = await getCurrentUser()
    return (
        <div className="flex min-h-screen flex-col space-y-1 md:space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
              }}
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
  