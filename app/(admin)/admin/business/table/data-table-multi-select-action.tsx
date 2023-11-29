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
import { Check, Delete, Loader2, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTableMultiSelectActions<TData>({
  table,
}: DataTablePaginationProps<TData>) {

  const [isLoading, setIsLoading] = useState(false);
  const router  = useRouter()

  const updateAll = async () => {
    // console.log(table.getSelectedRowModel().rows)
    let orderIds = table.getSelectedRowModel().rows?.map((item) => item?.original?.[`id`])
    setIsLoading(true)
    try {


      const response = await fetch(`/api/order`, {
        method: "PUT",
        body: JSON.stringify({
          orderIds,
          status: 'DONE'
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json())

      toast({
        title: "Cập nhật thành công"
      })
      router.refresh()
    }
    catch (e) {

    }

    setIsLoading(false)

  }

  const deleteAll = async () => {
    // console.log(table.getSelectedRowModel().rows)
    let orderIds = table.getSelectedRowModel().rows?.map((item) => item?.original?.[`id`])
    setIsLoading(true)
    try {


      const response = await fetch(`/api/order/batch-delete`, {
        method: "POST",
        body: JSON.stringify({
          orderIds,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json())

      router.refresh()
      toast({
        title: "Cập nhật thành công"
      })
    }
    catch (e) {

    }

    setIsLoading(false)

  }


  return (
    <div className="flex items-center justify-between px-2 gap-2 flex-wrap">
      {/* <div className="flex-1 flex text-sm gap-1 text-muted-foreground w-full md:w-auto">
        {table.getSelectedRowModel().rows.length >= 1 && <Button
          disabled={isLoading}
          className="gap-2"
          size={'sm'}
          onClick={updateAll}
        >
          Hoàn tất
          {isLoading ? <Loader2 className="animate-spin text-muted-foreground w-5 h-5" /> : <Check className="w-4 h-4" />}

        </Button>}

        {table.getSelectedRowModel().rows.length >= 1 && <Button
          disabled={isLoading}
          className="gap-2"

          size={'sm'}
          onClick={deleteAll}
        // disabled={!table.getCanPreviousPage()}
        >
          Xoá

          {isLoading ? <Loader2 className="animate-spin text-muted-foreground w-5 h-5" /> : <Trash className="w-4 h-4" />}

        </Button>}
      </div> */}


    </div>
  )
}