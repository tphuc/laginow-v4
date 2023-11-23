import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserCart } from "@/components/user-cart-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MarketingLayoutProps {
    children: React.ReactNode
}


export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

    return (
        <div className="relative flex min-h-screen w-full flex-col space-y-1 md:space-y-6">
            <header className="sticky w-full top-0  z-40 bg-background">
                <div className="flex items-center container max-w-screen-xl mx-auto w-full justify-between py-3 md:py-4">
                    <MainNav 
                    items={dashboardConfig.mainNav} 
                    />
                    <nav className="flex items-center gap-2">
                        <UserCart user={user}/>
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
            <main className="w-full flex flex-col pb-4 flex-1 gap-4">{children}</main>
            {/* <SiteFooter /> */}
        </div>
    )
}
