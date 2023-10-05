import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
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
}
