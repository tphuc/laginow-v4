import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Không tìm thấy trang bạn đang tìm</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Trang không khả dụng
      </EmptyPlaceholder.Description>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        Quay về trang chủ
      </Link>
    </EmptyPlaceholder>
  )
}
