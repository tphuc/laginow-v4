import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserCart } from "@/components/user-cart-nav"
import { UserTrophy } from "@/components/user-trophy"
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
        <div className="relative flex min-h-screen w-full flex-col">
            <header className="absolute backdrop-blur-lg w-full top-0  z-40 ">
                <div className="flex items-center  max-w-screen-xl mx-auto w-full justify-between py-3 md:py-4">
                    <MainNav 
                    items={dashboardConfig.mainNav} 
                    />
                   
                    <nav className="flex items-center gap-2 px-4">
                        <UserCart user={user}/>
                        <UserTrophy/>
                        {user ? <UserAccountNav user={user} businesses={businesses}/> : <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ variant: "default", size:"default" }),
                                "px-4 border border-1.5"
                            )}
                        >
                            Đăng nhập
                        </Link>}
                    </nav>
                </div>
            </header>
            <main className="w-full overflow-hidden flex flex-col flex-1 gap-4 ">{children}</main>
            <SiteFooter />
        </div>
    )
}
