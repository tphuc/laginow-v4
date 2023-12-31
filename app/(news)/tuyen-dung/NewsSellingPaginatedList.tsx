'use client';
import { usePathname, useSearchParams } from "next/navigation";
import { NewsCardHorizontal, SellingCard } from "../NewsCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function NewsSellingPaginatedList({ data, maxPage }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = parseInt(searchParams?.get('page') ?? '1')

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams ?? '');
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const showPages = () => {
        const pages: any = [];
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 0 && i <= maxPage) {
                pages.push(
                    <PaginationLink key={`${currentPage}${i}`} isActive={i === currentPage} href={createPageURL(i)}>{i}</PaginationLink>
                );
            }
        }
        return pages;
    };

    return <div className="space-y-2">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 align-start'>
                {data?.map((item, id) => <SellingCard key={id} data={item} />)}
            </div>
       
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationPrevious href="#" />
                    {showPages()}
                    <PaginationEllipsis />
                    <PaginationNext href="#" />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
}