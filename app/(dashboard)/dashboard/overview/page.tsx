import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard-header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import RecentPostMetric from "./RecentPostMetric"
import { Card, DateRangePicker, Metric } from "@tremor/react"
import FilterTime from "./FilterTime"
import { startOfDayVN } from "@/lib/utils"
import { format, subDays } from "date-fns"
import { PostViewByDayChart } from "./PostViewByDayChart"


export const metadata = {
  title: "Dashboard",
}



async function getReadTimes({user, from, to}){
  let data = await prisma.postEvent.count({
    where: {
      eventType:"PAGE_VIEW",
      post: {
        userId: user?.id
      },
      tzTimestamp: {
        lte: to,
        gte: from
      }
    }
  })
  return data
}

async function getPostEventsByUserPost({user}){
  const from = startOfDayVN(subDays(new Date(), 7))
  const to = startOfDayVN(new Date())

  let data = await prisma.postEvent?.groupBy({
    by: ['tzTimestamp'],
    where: {
      post: {
        userId: user?.id
      },
      tzTimestamp: {
        gte: from,
        lte: to
      },
  
    },
    orderBy: {
      tzTimestamp: 'asc'
    },
    _count: {
      id: true
    }
  })
  return data
}


async function countPostDuring({user, from, to}){
  let data = await prisma.post?.count({
    where: {
      userId: user?.id,
      createdAt: {
        gte: from,
        lte: to
      },
    },    
  })

  return data
}

async function getRecentViews5Post({user, from, to}){
  let data = await prisma.post?.findMany({
    where: {
      userId: user?.id
    },
    take: 5,

    select: {
      title: true,
      PostEvent: {
        select: {
          id: true
        },
        where: {
          tzTimestamp: {
            gte: from,
            lte: to
          },
        }
      }
    },
    orderBy: {
      createdAt:'desc'
    }
    
  })

  return data
}

export default async function DashboardPage({searchParams}) {
  const user: any = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }



  // let totalViewEvents = await prisma.pageEvent?.groupBy({
  //   by: ['tzTimestamp'],
  //   where: {
  //     tzTimestamp: {
  //       gte: from,
  //       lte: to
  //     },

  //     eventType:"PAGE_VIEW"
  //   },
  //   // orderBy: {
  //   //   tzTimestamp: 'asc'
  //   // },
  //   _count: {
  //     id: true
  //   }
  // })

  const from = searchParams?.from ? startOfDayVN(new Date(searchParams?.from)) : startOfDayVN(new Date())
  const to = searchParams?.to ? startOfDayVN(new Date(searchParams?.to)) : startOfDayVN(new Date())
 

  const [readTimes, readTimesByPosts, recentView5Posts, countPosts] = await Promise.all([
      getReadTimes({user, from, to}), 
      getPostEventsByUserPost({user}),
      getRecentViews5Post({user, from, to}),
      countPostDuring({user, from, to})
  ])


  return (
    <DashboardShell>
    
      <div className="grid  grid-cols-12 gap-1">
    
     
        <div className="col-span-12 space-y-2 md:col-span-4 px-2">
          <FilterTime/>
          <Card>
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
              Bài viết của bạn được đọc
            </p>
            <div className="mt-2 flex items-baseline space-x-2.5">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {JSON.stringify(readTimes)} <span className="text-sm font-normal">lần</span>
              </p>
           
            </div>
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Từ {format(new Date(from), 'dd/MM/yyyy')} - {format(new Date(to), 'dd/MM/yyyy')}
            </p>
          </Card>
          <Card>
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
             Bạn đã đăng
            </p>
            <div className="mt-2 flex items-baseline space-x-2.5">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {JSON.stringify(countPosts)} <span className="text-sm font-normal">bài</span>
              </p>
           
            </div>
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Từ {format(new Date(from), 'dd/MM/yyyy')} - {format(new Date(to), 'dd/MM/yyyy')}
            </p>
          </Card>
        </div>
        <div className="col-span-12 space-y-2 md:col-span-8 px-2">
        <p className="text-tremor-default text-lg text-tremor-content dark:text-dark-tremor-content">
              Lượt đọc bài viết gần nhất
            </p>
          <Card>
          
            <RecentPostMetric data={recentView5Posts?.map((item) => ({name:item?.title, value: item?.PostEvent?.length}))}/>
          </Card>
        </div>

        <div className="col-span-12">
          <p className="text-muted-foreground py-4">Lượt xem 7 ngày gần nhất</p>
          <PostViewByDayChart data={readTimesByPosts} from={subDays(new Date(), 7)} to={new Date()}/>
        </div>
      </div>
      <p className="text-muted-foreground">Lưu ý: Hệ thống ghi nhận dữ liệu từ ngày 01/04/2024 trở đi</p>
    </DashboardShell>
  )
}
