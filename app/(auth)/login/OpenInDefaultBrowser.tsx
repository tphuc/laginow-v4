'use client';

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import copy from 'copy-to-clipboard';
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons";



export default function OpenInDefaultBrowser(){
    const searchParams = useSearchParams()
    return <div className="flex flex-col items-center space-y-2">
      

      <a className="px-4 py-2 flex items-center gap-2 bg-white rounded-md border border-input shadow-sm" target="_blank" href={`googlechrome://laginow.com/login?redirect=${searchParams?.get('redirect')}`}>
                            Mở trong trình duyệt Google <Icons.google className="mr-2 h-4 w-4" />
                        </a>
        {/* <p className="text-center text-muted-foreground">Copy đường dẫn & mở trong trình duyệt của điện thoại </p>



        <Button onClick={() => {
            copy(`https://laginow.com?redirect=${searchParams?.get('redirect')}`)
            toast({
                title:"Copy thành công",
                description:'Dán trong trình duyệt điện thoại của bạn để tiếp tục'
            })
        }} className="flex gap-2" variant={'outline'}> <Copy className="w-4 h-4"/> ấn để sao chép </Button> */}
    </div>
}