import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
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

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

interface PageProps {
  params: { businessId: string }
}


export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const data = await prisma.product.findMany({
    where: {
      businessId: params.businessId,
    },
    include: {
      business: true
    }
  })


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sản phẩm / dịch vụ"
      // text="Manage billing and your subscription plan."
      >
        <ProductCreateButton bussinessId={params.businessId}>Thêm</ProductCreateButton>
      </DashboardHeader>

      {data?.length ? <div className="divide-y divide-border rounded-md border">
        {data?.map((item: any) => (
          <ProductItem key={item?.id} product={item} />
        ))}
      </div>

        : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='package' />
            <EmptyPlaceholder.Title>Chưa có sản phẩm nào</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Tạo và quản lí sản phẩm / dịch vụ của kinh doanh của bạn.
            </EmptyPlaceholder.Description>
            <ProductCreateButton bussinessId={params.businessId} variant={'outline'}>Thêm</ProductCreateButton>
          </EmptyPlaceholder>
        )}



    </DashboardShell>
  )
}
