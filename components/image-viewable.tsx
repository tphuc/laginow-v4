/* eslint-disable @next/next/no-img-element */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from "next/image"

export default function ImageViewable(props){
    return <Dialog>
    <DialogTrigger asChild>
      <Image alt='' {...props}/>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <div className="grid bg-transparent gap-4 py-4">
        <img alt='' {...props} className="w-[90vw] height-auto" />
      </div>
    </DialogContent>
  </Dialog>
}