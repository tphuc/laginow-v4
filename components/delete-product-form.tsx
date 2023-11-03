"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useGetBusinessInfo, useGetBusinessTags } from "@/lib/http"
import { FormBusinessCreateSchema } from "@/lib/dto"
import slugify from "slugify"
import { toast, useToast } from "./ui/use-toast"
import { useEffect, useRef, useState } from "react"
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
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Icons } from "./icons"
import { useRouter } from "next/navigation"




async function deleteRecord(id: string) {
    const response = await fetch(`/api/products/${id}`, {
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

  
export function DeleteProductFormButton({ productId }: { productId: string }) {

    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
    const router = useRouter()

    const closeRef = useRef(null)


    return (


        <AlertDialog 
        
          // open={showDeleteAlert} onOpenChange={setShowDeleteAlert}
          >
          <AlertDialogTrigger asChild>
          <Button className="w-full justify-between px-2" variant={'ghost'}  >
                Xoá <Trash className="w-4 h-4" strokeWidth={1.5}/>
                {isDeleteLoading && <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />}
            </Button>
          </AlertDialogTrigger>
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
            <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteRecord(productId)

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  (closeRef?.current as any)?.click()
                  router.refresh()
                
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

    )
}
