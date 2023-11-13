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




async function deleteBusiness(id: string) {
    const response = await fetch(`/api/business/${id}`, {
      method: "DELETE",
    })
  
    if (!response?.ok) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Xoá thất bại.",
        variant: "destructive",
      })
    }
  
    return true
  }

  
export function DeleteBusinessForm({ businessId }: { businessId: string }) {

    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
    const router = useRouter()


    return (
        <>
        <div className="space-y-2">
           
            <Button size='sm' type="submit" variant={'destructive'} className={isDeleteLoading ? "pointer-events-none" : "gap-2 items-center"} onClick={() => setShowDeleteAlert(true)}>
               Xoá trang <Trash className="w-4 h-4" strokeWidth={1.5}/>
                {isDeleteLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
            </Button>
            <p className="text-muted-foreground text-sm"> Cẩn thận, hành động này không thể hoàn tác </p>
            </div>


        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xoá?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteBusiness(businessId)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.push('/dashboard/pages')
                  
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
