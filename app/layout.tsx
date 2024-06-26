
import localFont from "next/font/local"

import { Inter } from 'next/font/google'
import 'styles/globals.css'
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
// import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import QueryWrapper from "@/components/query-wrapper"
import AuthProvider from "@/components/auth-provider"
// import { fontHeading, fontSans } from "@/lib/font"
import { Analytics } from '@vercel/analytics/react';
import { auth } from "@/lib/auth"


const fontSans = localFont({
  src: "./Inter-VariableFont.ttf",

  display: 'swap',
  // weight: ["400"],
  variable: '--font-sans',
})


const fontHeading = localFont({
  // preload: true,
  src: "./CalSans-SemiBold.woff2",
  // subsets: ['latin'],
  // weight: "600",
  display: 'swap',
  variable: "--font-heading",
});


interface RootLayoutProps {
  children: React.ReactNode,
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Lagi",
    "Binh Thuan",
    "Quan An",
    "Dich vu",
    "Du lich",
  ],
  creator: "@tphuc",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph.webp`,
        width: 1504,
        height: 879,
        alt: '',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph.webp`],
    creator: "@tphuc",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,

}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()
  return (

    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontHeading.variable}`} >
      <head />
      <div id="fb-root"></div>
<script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0&appId=1639567779782201" nonce="bgO7Zkrw"></script>
      <QueryWrapper>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
          )}
        >
          <AuthProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
              {children}
              {/* <Analytics /> */}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
          <Analytics />
        </body>
      </QueryWrapper>
    </html>
  )
}