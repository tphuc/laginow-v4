import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { UserCart } from "@/components/user-cart-nav"
import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Chrome } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"

interface MarketingLayoutProps {
    children: React.ReactNode,
    params: any
}


export default async function MarketingLayout({
    children,
    params
}: MarketingLayoutProps) {
    const headersList = headers()
    const userAgent = headersList.get('User-Agent')

    let isNotAllowed = false
    if (userAgent?.includes('FB') || userAgent?.includes('Zalo')) {
        isNotAllowed = true
    }
    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);



    return (
        <div className="relative flex min-h-screen flex-col">
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
                                buttonVariants({ variant: "default", size: "default" }),
                                "px-4"
                            )}
                        >
                            Đăng nhập
                        </Link>}
                    </nav>
                </div>
            </header>
            <main className="container flex flex-col pb-4 md:grid flex-1 gap-12 pt-4 ">{children}</main>
            <SiteFooter />
            {isNotAllowed &&
                <div style={{zIndex:2000}} className="fixed bg-gray-200/80 overflow-hidden backdrop-blur-md z-100 top-0 left-0 w-[100vw] h-[100vh] flex flex-col">

                    <main className="container min-h-screen mx-auto flex flex-col items-center justify-center  gap-4 ">
                        <Link href="/" prefetch={false} className="flex">
                            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text whitespace-nowrap text-transparent font-heading text-2xl">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <p className="text-muted-foreground">Vui lòng chuyển hướng để xem</p>
                        <a className="px-4 py-2 flex items-center gap-2 bg-white rounded-md border border-input shadow-sm" target="_blank" href={`https://laginow.com/event/${params.id}`}>
                            Mở trong trình duyệt điện thoại  <Icons.google className="mr-2 h-4 w-4" />
                        </a>
                        <a className="px-4 py-2 flex items-center gap-2 bg-white rounded-md border border-input shadow-sm" target="_blank" href={`googlechrome://laginow.com/event/${params.id}`}>
                            Mở trong trình duyệt CHROME <Icons.google className="mr-2 h-4 w-4" />
                        </a>
                    </main>
                </div>}

        </div>
    )
}
