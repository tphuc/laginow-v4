'use client';

import { BarList } from "@tremor/react";



export default function RecentPostMetric({data}){
    return <div>
            <BarList data={data} className="mt-2" />
    </div>
}