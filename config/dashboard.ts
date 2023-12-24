import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Tìm kiếm",
      href: "/timkiem",
    },
    {
      title: "Bài viết",
      href: "/news",
    },
  ],
  sidebarNav: [
    {
      title: "Bài viết",
      href: "/dashboard",
      icon: "post",
    },
    // {
    //   title: "Thanh toán",
    //   href: "/dashboard/billing",
    //   icon: "billing",
    // },
    // {
    //   title: "Cài đặt",
    //   href: "/dashboard/settings",
    //   icon: "settings",
    // },
    {
      title: "Trang",
      href: "/dashboard/pages",
      icon: "globe",
    },
  ],
  newsNav: [
    {
        href:'/news',
        title:"Bản tin",
        icon: "Newspaper"
    },
    {
        href:'/mua-ban',
        title:"Mua bán",
        icon: "Banknote"
    },
    {
        href:'/bds',
        title:"Bất động sản",
        icon: "Landmark"
    },
    {
        href:'/tuyen-dung',
        title:"Tuyển dụng",
        icon: "Briefcase"
    },
    

]
}
