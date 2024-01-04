import Link from "next/link"
import { Post } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"
import { Badge } from "./ui/badge"
import { Banknote, Briefcase, Landmark, Newspaper } from "lucide-react"
// Badge

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
    
      <div className="space-y-1">
      {post.postType === 'JOB' && <Badge className="w-auto bg-violet-600 gap-2 hover:bg-violet-700 inline-flex"> <Briefcase className="w-4 h-4"/> Tuyển dụng</Badge>}
      {post.postType === 'NEWS' && <Badge className=" w-auto inline-flex gap-2"> <Newspaper className="w-4 h-4"/> Báo chí</Badge>}
      {post.postType === 'NORMAL' && <Badge variant={'secondary'} className="w-auto inline-flex"> Tin thường</Badge>}
      {post.postType === 'REALESTATE' && <Badge className="w-auto  bg-green-600 gap-2 hover:bg-green-700 inline-flex"> <Landmark className="w-4 h-4"/> Bất động sản </Badge>}
      {post.postType === 'SELLING' && <Badge className="w-auto bg-yellow-600 gap-2 hover:bg-yellow-700 inline-flex"> <Banknote className="w-4 h-4"/>  Buôn bán </Badge>}
      <br/>
        <Link
          href={`/editor/${post.id}`}
          prefetch={false}
          className="font-heading hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post?.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: post?.id, title: post?.title, slug: post?.slug }} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
