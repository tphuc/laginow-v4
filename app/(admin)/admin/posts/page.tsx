import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
// import { stripe } from "@/lib/stripe"
// import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// import { BillingForm } from "@/components/billing-form"
import { DashboardHeader } from "@/components/dashboard-header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { UpdateBusinessForm } from "@/components/update-business-form"
import { ProductItem } from "@/components/product-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ProductCreateButton } from "@/components/product-create-button"
import { DataTable } from "./table/data-table"
import { columns } from "./columns"
import { ProductCreateButtonSheet } from "@/components/product-create-button-sheet"
import { UpdateMarketingPosts } from "./UpdateMarketingPostForm"
import { Card, Divider } from "@tremor/react"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

interface PageProps {
  params: { businessId: string }
}

async function fetchMarketingPost() {
  const data = await prisma.newsCollection?.findUnique({
      where: {
          id: 'marketing'
      },
      include: {
          posts: true
      }
  })
  return data?.posts ?? []
}

async function fetchPosts(){
  const data = await prisma.post?.findMany({
    orderBy:{
      createdAt: 'desc'
    }
})
return data
}




export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }



  const [marketingPosts, allPosts] = [await fetchMarketingPost(), await fetchPosts()]
  // console.log(data)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Bài viết"
        // text="Xem trang"
      >
        {/* <ProductCreateButtonSheet businessId={params.businessId}>Thêm</ProductCreateButtonSheet> */}
      </DashboardHeader>
      
      <UpdateMarketingPosts defaultValue={marketingPosts ?? []} allPosts={allPosts}/>
      <Divider/>
      <h1 className="font-heading text-2xl">Tất cả bài viết</h1>
      <DataTable  data={allPosts ?? []} columns={columns}/>




    </DashboardShell>
  )
}
