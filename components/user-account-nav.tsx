"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { useGetUserInfo } from "@/lib/http"
import { Icons } from "./icons"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User & { businesses?: any}
}

export function UserAccountNav({ user }: UserAccountNavProps) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Quản lí chung</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/pages">Trang của bạn</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div>
          {user?.businesses?.map((item) => <DropdownMenuItem key={item?.id} asChild>

            <Link href={`/business/${item?.id}`} className="gap-2">
              <Icons.globe className="w-4 h-4" strokeWidth={1.5} />
              <p>{item?.title}</p>
            </Link>

          </DropdownMenuItem>)}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
