'use client';

import { DateRangePicker, DateRangePickerItem } from "@tremor/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { vi } from 'date-fns/locale';
import { startOfMonth, subDays } from "date-fns";

export default function FilterTime() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const startOfCurrentMonth = subDays(new Date(), 30);

    const createPageURL = ({ from, to }) => {
        const params = new URLSearchParams(searchParams ?? '');
        params.set('from', from.toString());
        params.set('to', to.toString());
        return `${pathname}?${params.toString()}`;
    };

    return <div>
        <DateRangePicker className="max-w-[340px]" defaultValue={{selectValue:'today'}} locale={vi} onValueChange={(val) => {
            router?.push(createPageURL({ from: val.from?.toISOString(), to: val.to?.toISOString() }))
        }}>
            <DateRangePickerItem key="ytd" value="today" from={new Date()} to={new Date()}>
                Hôm nay
            </DateRangePickerItem>
            <DateRangePickerItem
                key="half"
                value="30days"
                from={startOfCurrentMonth}
                to={new Date()}
            >
                30 ngày
            </DateRangePickerItem>
        </DateRangePicker>
    </div>
}