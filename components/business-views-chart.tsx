'use client';
import { Card, Flex, LineChart, Metric, Text } from "@tremor/react";
import { DatePickerWithRange } from "./ui/date-range-picker";
import { useState } from "react";
import { addDays, format, startOfDay, subDays } from 'date-fns'
import { fillEmptyDates, fillMissingDates, getDayVN, startOfDayVN } from "@/lib/utils";
import { useGetBusinessPageEvents } from "@/lib/http";
import { Bot } from "lucide-react";



const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey === 'count' ? 'lượt xem' : ''}</p>
            <p className="font-medium text-tremor-content-emphasis">{category.value}</p>  
          </div>
        </div>
      ))}
    </div>
  );
};

export function BusinessViewChart({businessId}: {businessId: string}) {

  const [dateFilter, setDateFilter] = useState({
    from: startOfDayVN(subDays(new Date(), 7)),
    to: startOfDayVN(new Date())
  })

  let {data} = useGetBusinessPageEvents(businessId, { from: dateFilter?.from, to: dateFilter?.to })
  let _formattedData = (data?.pageViews ?? [])?.map((item: any) => ({
    count: item._count?.id,
    timestamp: getDayVN(new Date(item?.tzTimestamp))
  }))

  let formattedData = fillEmptyDates(_formattedData, dateFilter?.from, dateFilter?.to)
  return <div className="space-y-2">
    <DatePickerWithRange onChange={(val: any) => setDateFilter(val)} defaultValue={dateFilter}/>
    <div>
      <Flex justifyContent="start" className="gap-2">
    <Card className="max-w-xs">
      <Text>Lượt xem hôm nay</Text>
      <Metric>{data?.todayPageViews}</Metric>
      {/* <ProgressBar value={32} className="mt-2" /> */}
    </Card>

    <Card className="max-w-xs">
      <Text>Lượt hiển thị tìm kiếm hôm nay</Text>
      <Metric>{data?.todaySearchViews}</Metric>
      {/* <ProgressBar value={32} className="mt-2" /> */}
    </Card>
    </Flex>
    
    <br/>
    
    <Text>Lượt view</Text>
    <LineChart
      className="overflow-scroll pr-4 scrollbar-hide"
      data={formattedData}
      index="timestamp"
      // showLegend={true}
      showLegend={false}
      categories={["count"]}
      
      colors={["cyan"]}
      showXAxis
      showYAxis

      valueFormatter={(number: number) => number?.toString()}
      customTooltip={customTooltip}
      yAxisWidth={30}
    />
    </div>
    <div className="flex items-center gap-2 text-muted-foreground"> Thống kê về các thông số khác đang được phát triển... <Bot className="w-5 h-5"/></div>
  </div>
}