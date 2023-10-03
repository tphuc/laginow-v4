import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
// import { stripe } from "@/lib/stripe"
// import { getUserSubscriptionPlan } from "@/lib/subscription"
import { DashboardShell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Dot, Link2 } from "lucide-react"
import Link from "next/link"
import { Card, Text, Metric, LineChart, ProgressBar } from "@tremor/react";
import { BusinessViewChart } from "@/components/business-views-chart"
export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

interface PageProps {
  params: { businessId: string }
}

// const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

export default async function Page(props: PageProps) {
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
      {/* <DashboardHeader
        heading=""
        text=""
      /> */}
      <div className="relative w-full p-1 space-y-2">
        <Link className="underline inline-flex items-center" href={`/t/${props.params.businessId}`}>
          <Badge className="py-0 px-0 pr-2 cursor-pointer" variant={'outline'}> <Dot className="text-green-500 w-8 h-8" />
            Xem trang hiển thị công khai <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Badge>
        </Link>

        <div className="w-full grid">
          <BusinessViewChart businessId={props.params?.businessId}  />

        </div>
      </div>
    </DashboardShell>
  )
}
