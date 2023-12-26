'use client'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function CategoriesHeading({ productTypes }) {
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const router = useRouter()

    const createPageURL = (reType, reAssetType) => {
        const params = new URLSearchParams(searchParams ?? '');
        if (reType?.length)
            params.set('realEstateType', reType.toString());

        if (reAssetType?.length)
            params.set('realEstateAssetType', reAssetType.toString());

        if (reType === '')
            params.delete('realEstateType');

        if (reAssetType === '')
            params.delete('realEstateAssetType');

        params.set('page', '1');
        return `${pathname}?${params.toString()}`;
    };

    return <div className="flex items-center gap-2">
        {/* <p className="text-muted-foreground font-heading">Tìm kiếm </p> */}
        <Select defaultValue={searchParams?.get('realEstateType') ?? ''} onValueChange={(value) => router?.push(createPageURL(value, null))}>
            <SelectTrigger placeholder="Hình thức" className='w-auto rounded-full border border-input shadow-sm'>
                <SelectValue placeholder='Hình thức'></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="SELL">

                    Mua

                </SelectItem>
                <SelectItem value="RENT">

                    Thuê

                </SelectItem>

                <SelectItem value="">

                    Tất cả

                </SelectItem>


            </SelectContent>
        </Select>
        <Select defaultValue={searchParams?.get('realEstateAssetType') ?? ''} onValueChange={(value) => router?.push(createPageURL(null, value))} >
            <SelectTrigger placeholder='Loại tài sản' className='w-auto rounded-full border border-input shadow-sm'>
                <SelectValue className="text-primary-foreground" placeholder='Loại tài sản'></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="APARTMENT">

                    Căn hộ / chung cư

                </SelectItem>
                <SelectItem value="HOME">

                    Nhà

                </SelectItem>
                <SelectItem value="OFFICE">

                    Văn phòng

                </SelectItem>
                <SelectItem value="LAND">

                    Đất

                </SelectItem>
                <SelectItem value="FLAT">

                    Mặt bằng

                </SelectItem>
                <SelectItem value="ALL">

                    Tất cả loại tài sản

                </SelectItem>

            </SelectContent>
        </Select>

    </div>
}
