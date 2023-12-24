import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Table } from "@tanstack/react-table"
  

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }
  
  export function DataTablePagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
      <div className="flex items-center justify-between px-2 gap-2 flex-wrap">
        <div className="flex-1 text-sm text-muted-foreground w-full md:w-auto">
          {table.getFilteredSelectedRowModel().rows.length} in {" "}
          {table.getFilteredRowModel().rows.length} selected
        </div>
        <div className="flex items-center space-x-4 lg:space-x-8 gap-2 flex-wrap">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows Per Page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className=" h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">First</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex w-[60px] whitespace-nowrap  items-center justify-center text-sm font-medium">
            {table.getState().pagination.pageIndex + 1} {" / "}
            {table.getPageCount()}
          </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">End</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }