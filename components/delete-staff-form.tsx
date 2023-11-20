"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import { toast, useToast } from "./ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Icons } from "./icons"
import { useRouter } from "next/navigation"




async function remove(businessId: string, id: string) {
  const response = await fetch(`/api/business/${businessId}/staff?id=${id}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Có lỗi xảy ra",
      description: "Xoá thất bại.",
      variant: "destructive",
    })
    return false
  }


  return true
}


export function DeleteStaffForm({businessId, id }: { businessId: string, id: string }) {

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const router = useRouter()

  return (
    <>
      <div className="space-y-2">

        <Button size='sm' type="submit" variant={'ghost'} className={isDeleteLoading ? "pointer-events-none w-full" : "gap-2 items-center w-full"} onClick={() => setShowDeleteAlert(true)}>
          Xoá thành viên <Trash className="w-4 h-4" strokeWidth={1.5} />
          {isDeleteLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
        </Button>
      </div>


      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xoá?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await remove(businessId, id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router?.refresh()

                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Xoá</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
