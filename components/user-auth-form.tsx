"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}



export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const redirect = searchParams?.get('redirect') ?? '/'

  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
     
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Tiếp tục với
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "secondary" }), 'border border-input')}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("google", {callbackUrl: `/${redirect?.replace('.', '/')}`})
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}
