import Link from "next/link"
import { Post, Product } from "@prisma/client"

import { formatDate, vndFormat } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductOperation } from "./product-operations"
import Image from "next/image"

interface ProductItemProps {
  product: Product
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex items-center shadow-sm gap-2 justify-between px-3 py-2">
      <Image alt='' width={60} height={60} className="ring-1 rounded-sm object-cover ring-gray-900/5 bg-secondary outline-none" src={product?.images?.['url'] ?? null} />
      <div className="flex items-center justify-between flex-1">
        <div className="grid">

          <Link
            href={`/business/${product?.businessId}/product/${product.id}`}
            className="font-heading hover:underline text-ellipsis overflow-hidden"
          >
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{vndFormat(product.price)}</p>
          <div>
            <p className="text-sm text-muted-foreground">
              {formatDate(product.createdAt?.toDateString())}
            </p>
          </div>
        </div>
        <ProductOperation item={product} />
      </div>
      {/* <PostOperations post={{ id: product.id, title: product.name }} /> */}
    </div>
  )
}

ProductItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
