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
import AddInvitationForm from "./add-invitation-form"

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

  const data = await prisma.invite.findMany({
    where: {
      businessId: params.businessId,
    },
    include: {
      // business: true,
      // items: true,
      // user: true
    }
  }) ?? []

  const staffs = await prisma.staff.findMany({
    where: {
      businessId: params.businessId,
    },
    include: {
      user: true
      // business: true,
      // items: true,
      // user: true
    }
  }) ?? []


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Thành viên"
        text="Thêm thành viên quản lí trang"
      >
        {/* <ProductCreateButtonSheet businessId={params.businessId}>Thêm</ProductCreateButtonSheet> */}
      </DashboardHeader>
      <AddInvitationForm businessId={params.businessId} />

      <div className="flex flex-col">
        <h1 className="font-heading text-xl">Đã mời</h1>
        {!data?.length && <div className="text-muted-foreground"> Không tìm thấy email </div>}
        <div className="flex flex-wrap gap-2">
          {data?.map(item => <div className="text-muted-foreground text-sm px-4 py-1 border border-input rounded-full bg-secondary inline-block" key={item?.id}>{item?.email}</div>)}
        </div>
      </div>
      <DataTable data={staffs ?? []} columns={columns} />




    </DashboardShell>
  )
}
