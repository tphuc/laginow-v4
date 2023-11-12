"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"


import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { Home, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Badge } from "./ui/badge"

interface MainNavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean | undefined;
  }[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" prefetch={false} className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-heading text-xl sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
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




      {/* <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu />
        {showMobileMenu ?? <X />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}

      <Sheet>
        <SheetTrigger asChild>
          <Badge variant={'secondary'} className="p-1 block md:hidden rounded-sm border border-input">
          <Menu className="aspect-square px-0 text-secondary-foreground" />
          </Badge>
        </SheetTrigger>
        <SheetContent side="left" className="w-[90vw] px-2">

          <div className="divide-y mt-[20px] divide-border rounded-md border-t">
            <Link href="/" className="flex px-2 py-2 items-center gap-2 text-xl font-heading">
             <Home className="w-5 h-5"/> Lagi Now
            </Link>
            {items?.length ? (
              <nav className="">
                {items?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-lg transition-colors hover:text-foreground/80 sm:text-sm",
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
          </div>

        </SheetContent>
      </Sheet>

    </div>
  )
}
