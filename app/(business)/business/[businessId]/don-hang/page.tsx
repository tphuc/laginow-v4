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
import { DataTable } from "./table/data-table"
import { columns } from "./columns"
import { ProductCreateButtonSheet } from "@/components/product-create-button-sheet"

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

  const data = await prisma.order.findMany({
    where: {
      businessId: params.businessId,
    },
    include: {
      // business: true,
      items: true,
      user: true
    }
  }) ?? []

  // console.log(data)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Đơn hàng"
        text="Xem đơn đặt hàng"
      >
           <ProductCreateButtonSheet businessId={params.businessId}>Thêm</ProductCreateButtonSheet>
      </DashboardHeader>
     
      <DataTable data={data ?? []} columns={columns}/>




    </DashboardShell>
  )
}
