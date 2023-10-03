'use client';
import { Card, LineChart, Metric, Text } from "@tremor/react";
import { DatePickerWithRange } from "./ui/date-range-picker";
import { useState } from "react";
import { format, subDays } from 'date-fns'
import { fillMissingDates } from "@/lib/utils";
import { useGetBusinessPageEvents } from "@/lib/http";
import { Bot } from "lucide-react";

export function BusinessViewChart({businessId}: {businessId: string}) {

  const [dateFilter, setDateFilter] = useState({
    from: subDays(new Date(), 7),
    to: new Date()
  })

  let {data} = useGetBusinessPageEvents(businessId, { from: dateFilter?.from, to: dateFilter?.to })




  return <div className="space-y-2">
    <DatePickerWithRange onChange={(val: any) => setDateFilter(val)} defaultValue={dateFilter}/>
    <div>
    <Card className="max-w-xs">
      <Text>Lượt xem hôm nay</Text>
      <Metric>{data?.todayPageViews}</Metric>
      {/* <ProgressBar value={32} className="mt-2" /> */}
    </Card>
    
    <br/>
    
    <Text>Lượt view</Text>
    <LineChart
      className="overflow-scroll pr-4 scrollbar-hide"
      data={fillMissingDates(data?.pageViews ?? [])?.map((item: any) => ({
        count: item._count?.id,
        timestamp: format(new Date(item?.timestamp), 'MM-dd')
      }))}
    
      // data={[]}
      index="timestamp"
      
      showLegend={false}
    
      categories={["count"]}
      colors={["cyan"]}
      showXAxis
      showYAxis

      valueFormatter={(number: number) => number?.toString()}
      yAxisWidth={30}
    />
    </div>
    <div className="flex items-center gap-2 text-muted-foreground"> Thống kê về các thông số khác đang được phát triển... <Bot className="w-5 h-5"/></div>
  </div>
}