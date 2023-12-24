'use client';
import { usePathname, useSearchParams } from "next/navigation";
import { NewsCardHorizontal, SubNewsCard } from "../NewsCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function NewspaperList({ data, maxPage }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = parseInt(searchParams?.get('pageNewspaper') ?? '1')

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams ?? '');
        params.set('pageNewspaper', pageNumber.toString());
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

    return <div className="col-span-5 md:col-span-3 space-y-2">
        <div className='space-y-1'>
                    {data?.map((item, id) => <SubNewsCard key={id} data={item} />)}
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