import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface LayoutProps {
    children: React.ReactNode
}


export default async function Layout({
    children,
}: LayoutProps) {

    const [user, businesses] = await Promise.all([getCurrentUser(), getUserBusiness()]);

    return (
        <div className="relative flex min-h-screen flex-col space-y-1 md:space-y-6">
            <header className="sticky top-0 container z-40 bg-background">
                <div className="flex items-center justify-between py-3 md:py-4">
                    <MainNav 
                    items={dashboardConfig.mainNav} 
                    />
                    <nav className="flex items-center gap-2">
                        
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
            {/* <SiteFooter /> */}
        </div>
    )
}