import Link from "next/link"


import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Flag, Globe2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "./icons"
interface PageItemsProps {
  page: any
}

export function PageItems({ page }: PageItemsProps) {
  return (
    <div className="flex items-center justify-between p-4">
        
         

      <div className="grid gap-1">
     
        <Link
          href={`/business/${page?.id}`}
          className="font-semibold flex gap-2 hover:underline"
        >
           <Flag strokeWidth={1.5}/> {page?.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(page?.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Globe2 className="w-4 h-4"/>
            <Link href={`/t/${page?.id}`} className="flex w-full">
              Xem trang hiển thị trên web 
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

PageItems.Skeleton = function PageItemsSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
