"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Circle } from "lucide-react"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Tim kiem"
          value={(table.getColumn("deliveryPhone")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("deliveryPhone")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Trạng thái"
            options={[
                {
                  value: "REQUESTED",
                  label: "Đã đặt",
                  icon: Circle
                },
                {
                  value: "DONE",
                  label: "Hoàn tất",
                  icon: Circle
  
                },
              ]}
          />
        )}
       
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            hoàn tác
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}