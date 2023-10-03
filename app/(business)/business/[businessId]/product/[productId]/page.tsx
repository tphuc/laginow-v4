import { redirect } from "next/navigation"

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
import { UpdateBusinessProductForm } from "@/components/update-business-product-form"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

interface PageProps {
  params: { businessId: string; productId: string }
}


export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sản phẩm"
      // text="Manage billing and your subscription plan."
      />

 
      <UpdateBusinessProductForm businessId={params.businessId} productId={params.productId}/>
      

    </DashboardShell>
  )
}
