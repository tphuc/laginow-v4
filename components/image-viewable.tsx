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
import { getResourceType } from "@/lib/utils"
import Image from "next/image"

export default function ImageViewable(props){
    return <Dialog>
    <DialogTrigger asChild>
      {getResourceType(props?.src) === 'image' ? <Image alt='' {...props}/> : <video {...props} autoPlay={false}></video>}
     
    </DialogTrigger>
    <DialogContent className="max-w-[425px] md:maw-w-[700px]">
      <div className="grid bg-transparent gap-4 py-4">
        {/* <img  alt='' {...props} className="w-[90vw] height-auto" /> */}
        {getResourceType(props?.src) === 'image' ? <Image alt='' {...props} className="w-[90vw] height-auto"/> : <video {...props}  className="w-[90vw] height-auto" controls autoPlay={false}></video>}
      </div>
    </DialogContent>
  </Dialog>
}