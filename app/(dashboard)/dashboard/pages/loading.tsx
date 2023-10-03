import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Trang kinh doanh"
        text="Tạo và quản lí trang"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}