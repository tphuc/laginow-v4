"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Flag } from "lucide-react"

interface BusinessDashboardNavProps {
  title?: string;
  items: SidebarNavItem[]
}

export function BusinessDashboardNav({ items, title }: BusinessDashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="w-[100vw] scrollbar-hide border-b md:border-b-0 pb-1 pl-2 pr-2 md:pl-0 absolute md:w-auto overflow-scroll md:relative top-0 left-[-1em] flex md:grid  items-start gap-2">
      {items.map((item, index) => {
        const Icon =  Icons[item?.icon ?? 'arrowRight']
        return (
          item?.href && (
            <Link key={index} prefetch={false} href={item?.disabled ? "/" : item?.href}>
              <span
                className={cn(
                  "group flex flex-nowrap whitespace-nowrap items-center rounded-md px-3 py-2 text-sm font-medium",
                  path === item?.href ? "bg-secondary text-accent-foreground border shadow-sm" : "transparent hover:bg-secondary",
                  item?.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item?.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
