'use client';
import { Card, Flex, LineChart, Metric, Text } from "@tremor/react";
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

export function PostViewByDayChart({ data, from, to}) {

  console.log(33, data?.map(item => getDayVN(new Date(item?.tzTimestamp))))


  let formattedData = fillEmptyDates(data, from, to)

  return <div className="space-y-2">
  

    <LineChart
      className="overflow-scroll pr-4 scrollbar-hide"
      data={formattedData}
      index="timestamp"
      // showLegend={true}
      showLegend={false}
      categories={["count"]}
      
      colors={["indigo"]}
      showXAxis
      showYAxis

      valueFormatter={(number: number) => number?.toString()}
      customTooltip={customTooltip}
      yAxisWidth={30}
    />

   
  </div>
}