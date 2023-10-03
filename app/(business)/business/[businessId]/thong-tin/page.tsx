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
import { UpdateBusinessWorkingHrsForm } from "@/components/update-business-working-hours-form"
import { useRouter } from 'next/router'

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
        heading="Thông tin căn bản"
      // text="Manage billing and your subscription plan."
      />

        <div className="grid gap-8 pb-10">
          <UpdateBusinessForm businessId={params.businessId} />
        </div>


      <DashboardHeader
        heading="Giờ hoạt động"
      // text="Manage billing and your subscription plan."
      />

        <div className="grid gap-8 pb-10">
          <UpdateBusinessWorkingHrsForm businessId={params.businessId} />
        </div>

    </DashboardShell>
  )
}
