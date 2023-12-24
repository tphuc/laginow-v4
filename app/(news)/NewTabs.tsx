"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function NewsNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="w-full border-b pb-1 mx-auto max-w-screen-2xl scrollbar-hide z-10 md:border-b-0 md:w-auto overflow-scroll md:relative top-0 flex md:grid  items-start gap-1">
      {items.map((item, index) => {
        const Icon =  Icons[item?.icon ?? 'arrowRight']
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href} prefetch={!!item?.prefetch}>
              <span
                className={cn(
                  "group flex flex-nowrap whitespace-nowrap items-center rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-accent-foreground",
                  path === item.href ? "bg-secondary border border-primary/50" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
     
    </nav>
  )
}
