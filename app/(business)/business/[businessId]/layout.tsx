import { BusinessDashboardNav } from "@/components/business-dashboard-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser, getUserBusiness } from "@/lib/session"
import prisma from "@/lib/prisma"
import { BusinessHeaderNav } from "@/components/business-header-nav"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, ImagePlus } from "lucide-react"
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
        Product: {
          select: {
            id: true,
            name: true
          }
        }
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
        OR: [
          {
            ownerId: userId
          },
          {
            Staff: {
              some: {
                user: {
                  id: {
                    equals: userId
                  }
                }
              }
            }
          }

        ]
      },
      include: {

      }
    })
  } catch (e) {
    return null
  }
}

export default async function BusinessLayout({ children, params }: BusinessProps) {
  const [user] = await Promise.all([getCurrentUser()]);
  if (!user) {
    redirect("/login")
  }

  const business = await getBusinessOfUser(params.businessId) ?? null
  const businessImages = parseInt(JSON.parse(JSON.stringify(business?.images))?.length) ?? 0

  const businessInfoFilled = [!!business?.googleMapsUrl, !!business?.address, !!business?.phone]?.filter(item => !!item)
  const businessProducts = business?.Product?.length ?? 0

  const allUserBusinessPages = await getBusinessesOfUser(user?.id) ?? []


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky backdrop-blur-lg w-full top-0  z-40 bg-background/90 border-b border-border">
        <div className="flex items-center max-w-screen-2xl mx-auto w-full justify-between py-3 md:py-4">
          <BusinessHeaderNav userBusinesses={allUserBusinessPages?.map((item) => ({
            value: item.id,
            label: item.title
          }))} title={business?.title} />
          <UserAccountNav
            user={user}
            businesses={allUserBusinessPages}
          />
        </div>
      </header>
      <div className="p-2 max-w-screen-xl overflow-x-scroll scrollbar-hide border-b md:border-b-0 w-full gap-2 flex items-center mx-auto">

      <Link href='#' className="p-4 hover:bg-gray-100/50 transition-all space-y-1 bg-white rounded-md border border-input shadow-sm min-w-[300px]">
          <div className="flex justify-between">
          <p className="font-heading flex items-center gap-2 text-primary">Thêm thông tin liên hệ { businessInfoFilled?.length === 3 && <CheckCircle className="w-4 h-4"/>} </p>
         <div> 🏠 </div>
          </div>
          <span className="text-sm text-muted-foreground">Địa chỉ trên googlemaps, SĐT, giờ hoạt động...</span>
         
          <Progress className="h-2" value={ businessInfoFilled?.length / 3 * 100}/>
        </Link>

        <Link href='#' className="p-4 hover:bg-gray-100/50 transition-all space-y-1 bg-white rounded-md border border-input shadow-sm min-w-[300px]">
          <div className="flex justify-between">
          <p className="font-heading text-primary">Thêm hình ảnh cho trang { businessImages === 5 && <CheckCircle className="w-4 h-4"/>}</p>
         <div> 📸 </div>
          </div>
          <span className="text-sm text-muted-foreground">{businessImages} / 5 ảnh</span>
         
          <Progress className="h-2" value={ businessImages / 5 * 100}/>
        </Link>

        <Link href='#' className="p-4 hover:bg-gray-100/50  transition-all space-y-1 bg-white rounded-md border border-input shadow-sm min-w-[300px]">
          <div className="flex justify-between">
          <p className="font-heading text-primary">Thêm sản phẩm / dịch vụ { businessProducts === 1 && <CheckCircle className="w-4 h-4"/>}</p>
         <div> 🍔 </div>
          </div>
          <span className="text-sm text-muted-foreground">Liệt kê một sản phẩm dịch vụ của trang</span>
         
          <Progress className="h-2" value={ businessProducts / 1 * 100}/>
        </Link>

      </div>
      <div className="container flex flex-col md:grid flex-1 gap-12 md:grid-cols-[200px_1fr] pt-1 md:pt-6">

        <div className="relative border-gray-200 sm:w-full md:w-[200px] flex-col md:flex">
          <BusinessDashboardNav
            title={business?.title}
            items={[
              {
                title: 'Đơn hàng',
                href: `/business/${params.businessId}/don-hang`,
                icon: 'listTodo'
              },
              {
                title: 'Tổng quan',
                href: `/business/${params.businessId}`,
                icon: 'barChart'
              },
              {
                title: 'Thông tin',
                href: `/business/${params.businessId}/thong-tin`,
                icon: 'penSquare'
              },
              {
                title: 'Sản phẩm & Dịch vụ',
                href: `/business/${params.businessId}/san-pham`,
                icon: 'package',
                prefetch: true
              },
              {
                title: 'Hình ảnh',
                href: `/business/${params.businessId}/hinh-anh`,
                icon: 'media'
              },
              {
                title: 'Mã thưởng',
                href: `/business/${params.businessId}/voucher`,
                icon: 'voucher'
              },
              {
                title: 'Thành viên',
                href: `/business/${params.businessId}/thanh-vien`,
                icon: 'user2'
              },
              {
                title: 'Quảng cáo',
                href: `/business/${params.businessId}/quang-cao`,
                icon: 'rocket'
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
