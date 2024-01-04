"use client"

import Link from "next/link"
// import { User } from "next-auth"
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
import { Globe2, Pen, Settings } from "lucide-react"
import { User } from "@prisma/client"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User & { businesses?: any}
  businesses: any
}

export function UserAccountNav({ user, businesses }: UserAccountNavProps) {


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
          <Link className="flex items-center gap-2 font-medium" href="/dashboard"> <Pen className="w-4 h-4"/>  Quản lí bài viết</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="flex items-center gap-2 font-medium" href="/dashboard/pages"> <Globe2 className="w-4 h-4"/> Trang của bạn</Link>
        </DropdownMenuItem>
        {user?.isAdmin && <DropdownMenuItem asChild>
          <Link className="flex items-center gap-2 font-medium" href="/admin"> <Settings className="w-4 h-4"/> Admin</Link>
        </DropdownMenuItem>}
        <DropdownMenuSeparator />
        <div>
          {businesses?.map((item) => <DropdownMenuItem key={item?.id} asChild>

            <Link href={`/business/${item?.id}`} className="gap-2">
              {/* <Icons.globe className="w-4 h-4" strokeWidth={1.5} /> */}
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
