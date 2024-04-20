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
import SearchBarFilter from "./search-bar"
import useSWR from "swr"
import Image from "next/image"

interface MainNavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean | undefined;
    icon? : any
  }[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const { data: masterTags } = useSWR(`/api/masterTags`, async (url) => {
    let res = await fetch(url)?.then(res => res.json())
    console.log(res)
    return res
  })
  return (
    <div className="flex px-4 gap-6 md:gap-10">
      <Link href="/" prefetch={false} className="hidden items-center space-x-2 md:flex">
        <span className="hidden text-primary text-accent-foreground font-heading text-2xl sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>


      {items?.length ? (
        <nav className="hidden gap-4 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center font-medium transition-colors text-xl hover:text-accent-foreground sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-accent-foreground"
                  : "text-accent-foreground/90",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              <span className="text-lg">{item.title}</span>
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
        <div className="flex items-center gap-2">
          <SheetTrigger asChild>
            <Badge variant={'secondary'} className="p-1 block md:hidden rounded-sm border border-indigo-900">
              <Menu className="aspect-square px-0 text-accent-foreground" />
            </Badge>
          </SheetTrigger>

        </div>
        <SheetContent side="left" className="w-[90vw] px-0">

          <div className="divide-y h-[100vh] pb-40 scrollbar-hide overflow-scroll mt-[20px] divide-border  border-t">
            <Link href="/" className="flex px-4 text-accent-foreground py-2 items-center gap-2 text-xl font-heading">
              <Home className="w-5 h-5 stroke-indigo-900 fill-blue-200" strokeWidth={2} /> Lagi Now
            </Link>
            {items?.length ? (
              <nav className="divide-y">
                {items?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-[1.1rem] transition-colors hover:text-foreground",
                      item.href.startsWith(`/${segment}`)
                        ? "text-accent-foreground bg-secondary"
                        : "text-accent-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >

                    {item.title}
                  </Link>
                ))}
              </nav>
            ) : null}

            <nav >
              {masterTags?.map((item, index) => (
                <Link
                  className="flex text-sm items-center px-2 py-1 text-lg transition-colors hover:text-foreground/80 sm:text-sm"
                  key={index}
                  href={`/timkiem?tags=${item?.tags?.map(item => item.id)?.join(',')}`}
                >
                  <Image src={item?.url ?? ''} alt='' width={50} height={50} className="w-[50px] h-auto aspect-square"></Image>
                  {item?.name}
                </Link>
              ))}
            </nav>
          </div>


        </SheetContent>
      </Sheet>

    </div>
  )
}
