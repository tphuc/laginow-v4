import { siteConfig } from "@/config/site"
import { Link } from "lucide-react"
import { usePathname } from "next/navigation"

export function DashboardNav() {
    const path = usePathname()
  
    
  
    return (
      <nav className="grid items-start gap-2">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
       
        <span className="hidden font-heading sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      </nav>
    )
  }