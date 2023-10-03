import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { Icons } from "@/components/icons"
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft/>
          Trở về
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
       
          <h1 className="text-2xl font-semibold tracking-tight">
            Chào mừng bạn
          </h1>
          
        </div>
        <UserAuthForm />
        <p className="px-4 text-center text-sm text-muted-foreground">
            Bằng tạo tài khoản và đăng nhập, bạn đồng ý với {" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Điều Khoản Dịch Vụ {" "}
            </Link>{" "}
            và{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Chính Sách Riêng tư
            </Link>
            .
          </p>
      </div>
    </div>
  )
}
