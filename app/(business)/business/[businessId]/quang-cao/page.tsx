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
import { EmptyPlaceholder } from "@/components/empty-placeholder"
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

  //   const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  //   // If user has a pro plan, check cancel status on Stripe.
  //   let isCanceled = false
  //   if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //     const stripePlan = await stripe.subscriptions.retrieve(
  //       subscriptionPlan.stripeSubscriptionId
  //     )
  //     isCanceled = stripePlan.cancel_at_period_end
  //   }

  return (
    <DashboardShell>

      <DashboardHeader
        heading="Quảng cáo"
        text="Nâng cao thương hiệu của bạn, thu hút khách hàng mới và thúc đẩy tăng trưởng bằng các giải pháp quảng cáo trên nền tảng Lagi Now"
      >
        
      </DashboardHeader>

        <div className="grid gap-8 pb-10">
        { (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='rocket' />
            <EmptyPlaceholder.Title>Chưa có chiến dịch quảng cáo nào</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
             Tính năng đang phát triển, sẽ ra mắt sớm
            </EmptyPlaceholder.Description>
            {/* <ProductCreateButton bussinessId={params.businessId} variant={'outline'}>Thêm</ProductCreateButton> */}
          </EmptyPlaceholder>
        )}
        </div>

       

    </DashboardShell>
  )
}
