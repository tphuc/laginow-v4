'use client';

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"


import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { Menu, X } from "lucide-react"
import { UserAccountNav } from "./user-account-nav"
import { BusinessSelectCombobox } from "./select-business-site-combobox"

interface MainNavProps {
  title?: string;
  userBusinesses: { value: string, label: string }[];
  items?: {
    title: string;
    href: string;
    disabled?: boolean | undefined;
  }[]
  children?: React.ReactNode
}

export function BusinessHeaderNav({ items, title, userBusinesses, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-heading sm:inline-block">
          {siteConfig.name}
        </span>


      </Link>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu />
        {showMobileMenu ?? <X />}
      </button>

      <BusinessSelectCombobox items={userBusinesses} />
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}



    </div>
  )
}
