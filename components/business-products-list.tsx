import { siteConfig } from "@/config/site"
import db from "@/lib/prisma"
import { ProductItem } from "./product-item"
import Image from "next/image"
import { formatDate, vndFormat } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"
import { Plus, ShoppingBag, ShoppingCart } from "lucide-react"




export function BusinessProductList({ products, ...props }: { products: any }) {
  // let products = await getBusinessProduct(businessId)
  return (
    <div className="w-full items-center flex flex-wrap relative mt-4 gap-2  rounded-lg">
      {products.map((product: any) => (
        <div key={product?.id} className="inline-flex shadow-sm flex-wrap min-w-[300px] border border-input rounded-xl items-center gap-2 justify-between p-2">
          <div className="aspect-video rounded-md overflow-hidden h-16 w-16 text-white text-center flex items-center justify-center">
            <Image alt='' width={60} height={60} className="object-cover rounded-sm" src={product?.images?.['url'] ?? '/placeholder.svg'} />
          </div>

          <div className="flex items-center justify-between flex-1">
            <div className="grid">
              <Link
                href={`/business/${product?.businessId}/product/${product.id}`}
                className="font-medium hover:underline text-ellipsis overflow-hidden"
              >
                {product?.name ? product?.name : "Không có tiêu đề"}
              </Link>
              <p className="text-sm text-muted-foreground">{vndFormat(product.price)}</p>
            </div>

          </div>
          <Button size='sm' className="w-10 h-10 rounded-lg border border-input shadow-sm mr-1"><ShoppingBag className="w-4 h-4"/></Button>
          {/* <PostOperations post={{ id: product.id, title: product.name }} /> */}
        </div>
      ))}
    </div>
  )
}