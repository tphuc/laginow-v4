import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"
import CreateEventButton from "./create-event-button"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DataPage from "./Data"
import { headers } from "next/headers"
import { fetchEvents } from "./actions"
import { Suspense } from "react"





export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}


export default async function Page({ params, searchParams }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }


  let data = await fetchEvents({
    limit: searchParams.limit,
    page: searchParams?.page
  })




  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sự kiện"
        text=""
      >

      </DashboardHeader>

      <Suspense fallback={<p>Loading...</p>}>
      <DataPage data={data}/>
      </Suspense>




    </DashboardShell>
  )
}
