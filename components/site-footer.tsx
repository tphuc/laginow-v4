import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <p className="font-heading text-2xl">Lagi Now ©2024</p>
          <p className="text-center gap-2 text-sm leading-loose md:text-left">
            
            <a
              href={'/dieu-khoan-dieu-kien?lang=vn'}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 pr-2"
            >
              Điều khoản
            </a>
            
  
         

            <a
              href={'/chinh-sach-rieng-tu?lang=vn'}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 px-2"
            >
              Chính sách riêng tư
            </a>

          </p>
        </div>
      </div>
    </footer>
  )
}