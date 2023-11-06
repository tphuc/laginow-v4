
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
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import MapWrapper from "@/components/map-wrapper"
// import { fontHeading, fontSans } from "@/lib/font"


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


export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)
  return (

    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontHeading.variable}`} >
      <head />
      <QueryWrapper>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
          )}
        >
          <AuthProvider session={session}>
            {/* <MapWrapper> */}
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
              {children}
              {/* <Analytics /> */}
              <Toaster />
            </ThemeProvider>
            {/* </MapWrapper> */}
          </AuthProvider>
        </body>
      </QueryWrapper>
    </html>
  )
}