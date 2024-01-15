'use client';

import { Briefcase, Coins, Landmark, Newspaper, ShoppingBasket } from "lucide-react";
import Link from "next/link";


export default function PostTypeSection() {
    return <div className="w-full  relative mx-auto max-w-screen-md px-4 grid grid-cols-1 py-2 md:grid-cols-2 gap-4">
        <Link  href='/bds' className="p-6 bg-secondary/80 cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-purple-500 rounded-2xl">
            <div className="bg-purple-100 border border-purple-500 rounded-xl p-2">
                <Landmark className="w-10 h-10 text-purple-500" />
            </div>
            <div className="text-left space-y-1">
                <h5 className="font-heading hover:underline text-purple-700 text-2xl">Bất động sản</h5>
                <p className="text-secondary-foreground/80">Bài viết bất động sản mua bán cho thuê trong khu vực. Mua bán, cho thuê nhà cửa, văn phòng, đất... </p>
            </div>
        </Link>
        <Link href='/mua-ban' className="p-6 bg-secondary/80 cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-yellow-500 rounded-2xl">
            <div className="bg-yellow-100 border border-yellow-600 rounded-xl p-2">
                <ShoppingBasket className="w-10 h-10 text-yellow-500" />
            </div>
            <div className="text-left space-y-1">
            <h5  className="font-heading hover:underline text-yellow-600 text-2xl">Buôn bán</h5>
                <p className="text-secondary-foreground/80">Bài viết mua bán, rao vặt thuộc nhiều lĩnh vực như xe cộ, thú cưng, thời trang, đồ điện tử... </p>
            </div>
        </Link>
        <Link href='/tuyen-dung' className="p-6 bg-secondary/80 cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-cyan-500 rounded-2xl">
            <div className="bg-cyan-100 border border-cyan-500 rounded-xl p-2">
                <Briefcase className="w-10 h-10 text-cyan-500" />
            </div>
            <div className="text-left space-y-1">
                <h5  className="font-heading hover:underline text-cyan-700 text-2xl">Tuyển dụng</h5>
                <p className="text-secondary-foreground/80">Bài viết tuyển dụng, tìm kiếm việc làm toàn thời gian, bán thời gian... </p>
            </div>
        </Link>
        <Link href='/news' className="p-6 bg-secondary/80 cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-rose-500 rounded-2xl">
            <div className="bg-rose-100 border border-rose-500 rounded-xl p-2">
                <Newspaper className="w-10 h-10 text-rose-500" />
            </div>
            <div className="text-left space-y-1">
                <h5  className="font-heading hover:underline text-rose-700 text-2xl">Tin tức</h5>
                <p className="text-secondary-foreground/80">Thông tin kinh tế chính trị tại Lagi, Bình Thuận</p>
            </div>
        </Link>

    </div>
}