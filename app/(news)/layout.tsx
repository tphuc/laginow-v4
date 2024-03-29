import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserCart } from "@/components/user-cart-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { NewsNav } from "./NewTabs"

interface MarketingLayoutProps {
    children: React.ReactNode
}



export const metadata = {
    title:"Tin tức, báo chí",
    description: "Tin tức mới nhất về thông tin địa phương, tìm hiểu những gì đang diễn ra.",
    keywords: [
        "tin tức mới nhất",
        "thế giới",
        "kinh doanh",
        "công nghệ",
        "giải trí",
        "thông tin đáng tin cậy"
    ]
}


export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <header className="sticky backdrop-blur-lg w-full top-0  z-40 bg-background/90 border-b border-border">
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
            <div className="relative grid mb-8 grid-cols-6 w-full md:max-w-screen-2xl gap-4 mx-auto px-2 md:px-4 pt-1 md:pt-6">

                <div className="col-span-6 w-full overflow-hidden md:col-span-1">
                    <NewsNav items={dashboardConfig.newsNav} />
                </div>

                <main className="flex col-span-6 md:col-span-5 pt-2 relative w-full flex-1 flex-col">
                    {children}
                </main>

            </div>
            <SiteFooter />
        </div>
    )
}
