"use client"

import * as React from "react"
import { addDays, subDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { vi } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    onChange?: (date: DateRange | undefined) => void;
    defaultValue?: DateRange;
    className?: string
  }
  
  export function DatePickerWithRange({
    className,
    onChange,
    defaultValue,
  }: DatePickerWithRangeProps) {
  
    const [date, setDate] = React.useState<DateRange | undefined>(defaultValue || {
      from: subDays(new Date(), 7),
      to: new Date(),
    });
  
    const handleDateChange = (selectedDate: DateRange | undefined) => {
      setDate(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    };
  
    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd LLL, y", {locale:vi})} -{" "}
                    {format(date.to, "dd LLL, y", {locale:vi})}
                  </>
                ) : (
                  format(date.from, "dd LLL, y", {locale: vi})
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              // initialFocus
              // showOutsideDays={false}
              locale={vi}
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }