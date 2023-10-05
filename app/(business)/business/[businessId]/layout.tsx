import { BusinessDashboardNav } from "@/components/business-dashboard-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import prisma from "@/lib/prisma"
import { BusinessHeaderNav } from "@/components/business-header-nav"
import { redirect } from "next/navigation"
interface BusinessProps {
  children?: React.ReactNode,
  params: { businessId: string }
}


async function getBusinessOfUser(id: string) {
  try {


    return await prisma.business.findUnique({
      where: {
        id,
      },
      include: {

      }
    })
  } catch (e) {
    return null
  }
}

async function getBusinessesOfUser(userId: string) {
  try {


    return await prisma.business.findMany({
      where: {
        ownerId: userId,
      },
      include: {

      }
    })
  } catch (e) {
    return null
  }
}

export default async function BusinessLayout({ children, params }: BusinessProps) {
  const user = await getCurrentUser();
  if(!user){
    redirect("/login")
  }

  const business = await getBusinessOfUser(params.businessId) ?? null
  const allUserBusinessPages = await getBusinessesOfUser(user?.id) ?? []

  return (
    <div className="flex min-h-screen flex-col space-y-1 md:space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <BusinessHeaderNav userBusinesses={allUserBusinessPages?.map((item) => ({
            value: item.id,
            label: item.title
          })) } title={business?.title} />
          <UserAccountNav
            user={{
              name: user?.name,
              image: user?.image,
              email: user?.email,
            }}
          />
        </div>
      </header>
      <div className="container flex flex-col md:grid flex-1 gap-12 md:grid-cols-[200px_1fr]">

        <div className="relative border-gray-200 sm:w-full md:w-[200px] flex-col md:flex">
          <BusinessDashboardNav
            title={business?.title}
            items={[
              {
                title: 'Tổng quan',
                href: `/business/${params.businessId}`,
                icon:'barChart'
              },
              {
                title: 'Thông tin',
                href: `/business/${params.businessId}/thong-tin`,
                icon: 'penSquare'
              },
              {
                title: 'Sản phẩm & Dịch vụ',
                href: `/business/${params.businessId}/san-pham`,
                icon:'package'
              },
             
              {
                title: 'Hình ảnh',
                href: `/business/${params.businessId}/hinh-anh`,
                icon: 'media'
              },
              {
                title: 'Khác',
                href: `/business/${params.businessId}/khac`,
                icon: 'settings'
              }
            ]} />
        </div>

        <main className="flex relative w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
