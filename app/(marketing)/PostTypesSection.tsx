'use client';

import { Coins, Landmark } from "lucide-react";
import Link from "next/link";


export default function PostTypeSection() {
    return <div className="w-full relative mx-auto max-w-screen-2xl grid grid-cols-1 pt-8 md:grid-cols-4 gap-4">
        <div className="p-6 bg-background cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-purple-500  rounded-lg">
            <div className="bg-purple-100 border border-purple-500 rounded-lg p-2">
                <Landmark className="w-10 h-10 text-purple-500" />
            </div>
            <div className="text-left space-y-1">
                <Link href='/bds' className="font-heading text-purple-700 text-2xl">Bất động sản</Link>
                <p className="text-muted-foreground">Tin bất động sản mua bán cho thuê trong khu vực. Mua bán, cho thuê nhà cửa, văn phòng, đất... </p>
            </div>
        </div>
        <div className="p-6 bg-background cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-yellow-500  rounded-lg">
            <div className="bg-yellow-100 border border-yellow-600 rounded-lg p-2">
                <Coins className="w-10 h-10 text-yellow-500" />
            </div>
            <div className="text-left space-y-1">
            <Link href='/mua-ban' className="font-heading text-yellow-600 text-2xl">Buôn bán</Link>
                <p className="text-muted-foreground">Tin mua bán, rao vặt thuộc nhiều lĩnh vực như xe cộ, thú cưng, thời trang, đồ điện tử... </p>
            </div>
        </div>
        <div className="p-6 bg-background cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-cyan-500  rounded-lg">
            <div className="bg-cyan-100 border border-cyan-500 rounded-lg p-2">
                <Coins className="w-10 h-10 text-cyan-500" />
            </div>
            <div className="text-left space-y-1">
                <Link href='/tuyen-dung' className="font-heading text-cyan-700 text-2xl">Tuyển dụng</Link>
                <p className="text-muted-foreground">Tin mua bán, rao vặt thuộc nhiều lĩnh vực như xe cộ, thú cưng, thời trang, đồ điện tử... </p>
            </div>
        </div>
        <div className="p-6 bg-background cursor-pointer hover:bg-secondary transition-all text-secondary-foreground flex items-start gap-4  border-rose-500  rounded-lg">
            <div className="bg-rose-100 border border-rose-500 rounded-lg p-2">
                <Coins className="w-10 h-10 text-rose-500" />
            </div>
            <div className="text-left space-y-1">
                <Link href='/tin-tuc' className="font-heading text-rose-700 text-2xl">Tin tức</Link>
                <p className="text-muted-foreground">Thông tin kinh tế chính trị tại Lagi, Bình Thuận</p>
            </div>
        </div>

    </div>
}