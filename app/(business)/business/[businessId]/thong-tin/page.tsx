import { redirect } from "next/navigation"
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
import { DeleteBusinessForm } from "@/components/delete-business-form"
import { UpdateBusinessContactVerified } from "@/components/update-business-contact-verified"

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
        heading="Thông tin liên hệ"
        // text="Xác minh trang của bạn để làm đối tác và sử dụng nhiều tính năng nâng cao"
      />

        <div className="grid gap-8 pb-10">
          <UpdateBusinessContactVerified businessId={params.businessId} />
        </div>


      <DashboardHeader
        heading="Giờ hoạt động"
      // text="Manage billing and your subscription plan."
      />

        <div className="grid gap-8 pb-10">
          <UpdateBusinessWorkingHrsForm businessId={params.businessId} />
        </div>


        <DashboardHeader
        heading="Xoá"
      // text="Manage billing and your subscription plan."
      />

        <div className="grid gap-8 pb-10">
          <DeleteBusinessForm businessId={params.businessId} />
        </div>

    </DashboardShell>
  )
}
