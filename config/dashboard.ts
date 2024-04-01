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
      title:"Tổng quan",
      href: "/dashboard/overview",
      icon: "grid",
    },
    {
      title: "Bài viết",
      href: "/dashboard/posts",
      icon: "post",
    },
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
