import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserCart } from "@/components/user-cart-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { NewsNav } from "../NewTabs"

interface MarketingLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title:"Mua bán rao vặt",
    description: "Mua bán rao vặt được đăng mỗi ngày. Đăng tin mua bán UY TÍN, NHANH CHÓNG, AN TOÀN với Lagi Now"
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

    return (
        <div className="relative flex min-h-screen w-full flex-col ">
           <header className="sticky backdrop-blur-lg w-full top-0 z-40 bg-background/90 border-b border-border">
                <div className="flex items-center max-w-screen-2xl mx-auto w-full justify-between py-3 md:py-4">
                    <MainNav
                        items={dashboardConfig.mainNav}
                    />
                     <nav className="flex items-center gap-2 px-4">
                        <UserCart user={user} />
                        {user ? <UserAccountNav user={user} businesses={businesses} /> : <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ variant: "default", size:"default" }),
                                "px-4"
                            )}
                        >
                            Đăng nhập
                        </Link>}
                    </nav>
                </div>
            </header>
            <div className="relative grid grid-cols-8 mb-8 max-w-screen-2xl gap-4 mx-auto px-4 pt-1 md:pt-6">

                <div className="col-span-8 w-full overflow-hidden md:col-span-1">
                    <NewsNav items={dashboardConfig.newsNav} />
                </div>

                <main className="flex col-span-8 md:col-span-7 md:pt-0 relative w-full flex-1 flex-col">
                    {children}
                </main>

            </div>
            <SiteFooter />
        </div>
    )
}
