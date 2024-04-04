'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function ClientPagination({ totalPages, perPage }) {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = parseInt(searchParams?.get('page') || '1')

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams ?? '');
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    function getPageRange(totalPages, currentPage) {
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(start + 4, totalPages);
        start = Math.max(1, end - 4);
        return { start: start, end: end };
    }

    const renderPaginationLinks = () => {
        const { start, end } = getPageRange(totalPages, currentPage);
        const links: any[] = [];

        for (let i = start; i <= end; i++) {
            links.push(
                <PaginationItem key={`${currentPage}${i}`}>
                    <PaginationLink
                        href={createPageURL(i)}
                        isActive={i === currentPage}
                     
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return links;
    };


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                   
                    />
                </PaginationItem>
                
                {renderPaginationLinks()}
              
                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                     
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}