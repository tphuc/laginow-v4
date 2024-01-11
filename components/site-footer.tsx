import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="relative border-t border-gray-300">
    <footer className="relative max-w-screen-2xl mx-auto px-4 py-8 space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl">Lagi Now</h1>
        <nav aria-label="Footer links" className="space-y-2">
          <Link className="block text-base" href="/">
            Trang chủ
          </Link>
          <Link className="block text-base" href="/timkiem">
            Khám phá
          </Link>
          <Link className="block text-base" href="/news">
            Bài đăng
          </Link>
        </nav>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Theo dõi chúng tôi</h2>
        <div className="flex space-x-4">
          <Link href="https://web.facebook.com/laginow" rel="noopener noreferrer" target="_blank">
            <FacebookIcon className="w-6 h-6" />
          </Link>
         

        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Liên hệ</h2>
        <p>
          
          <a className="block text-base" href="#">
            +84 038 867 2976
          </a>
          <a className="block text-base" href="#">
            contact@laginow.com
          </a>
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Chính sách</h2>
        <div>
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
            </div>
      </div>
     
    </footer>
    <div className="col-span-full font-heading border-t py-6 mt-8 text-center">
        Lagi Now © 2024
      </div>
    </div>
  )
}





function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
