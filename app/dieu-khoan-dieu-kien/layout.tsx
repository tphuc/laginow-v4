import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Metadata } from 'next'
import { dashboardConfig } from "@/config/dashboard"

interface MarketingLayoutProps {
    children: React.ReactNode
}


 
export const metadata: Metadata = {
  title: {
    absolute: 'Điều khoản',
  },
}
 

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

    return (
        <div className="relative flex min-h-screen flex-col">
<header className="sticky backdrop-blur-lg w-full top-0  z-40 bg-background/90 border-b border-border">
                <div className="flex items-center max-w-screen-2xl mx-auto w-full justify-between py-3 md:py-4">
                    <MainNav 
                    items={dashboardConfig.mainNav} 
                    />
                    <nav className="flex items-center gap-2 px-4">
                        
                        {user ? <UserAccountNav user={user} businesses={businesses}/> : <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ variant: "secondary", size: "sm" }),
                                "px-4"
                            )}
                        >
                            Đăng nhập
                        </Link>}
                    </nav>
                </div>
            </header>
            <main className="container flex flex-col pb-4 md:grid flex-1 gap-12 ">{children}</main>
            <SiteFooter />
        </div>
    )
}
