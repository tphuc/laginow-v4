import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { headers } from "next/headers"
import { fetchAvailableVouchers, fetchEvents } from "./actions"
import { Suspense } from "react"

import { ClientPagination } from "./client-pagination";
import { columns } from "./columns";
import { DataTable } from "./table/data-table";
import { useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateEventForm } from "./create-event-form";





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


  let availableVouchers = await fetchAvailableVouchers()



  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sự kiện"
        text=""
      >

      </DashboardHeader>

      <Suspense fallback={<p>Loading...</p>}>
        <div className="space-y-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="max-w-[200px] gap-2 rounded-sm"> <Plus className="w-4 h-4" /> Thêm Câu hỏi</Button>
            </SheetTrigger>
            <SheetContent>
              <CreateEventForm availableVouchers={availableVouchers ?? []} />
            </SheetContent>
          </Sheet>
          <DataTable data={data?.data ?? []} columns={columns} />
          {!data?.data?.length && <p className="text-muted-foreground">không có dữ liệu</p>}
          <ClientPagination totalPages={Math.ceil((data?.total ?? 0) / 10)} perPage={10} />
        </div>
      </Suspense>




    </DashboardShell>
  )
}
