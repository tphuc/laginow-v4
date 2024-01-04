'use client';

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import copy from 'copy-to-clipboard';
import { toast } from "@/components/ui/use-toast";



export default function OpenInDefaultBrowser(){
    return <div className="flex flex-col items-center space-y-2">
      
        <p className="text-center text-muted-foreground">Copy đường dẫn & mở trong trình duyệt của điện thoại </p>
        <span className="text-lg">laginow.com</span>

        <Button onClick={() => {
            copy('laginow.com')
            toast({
                title:"Copy thành công",
                description:'Dán trong trình duyệt điện thoại của bạn để tiếp tục'
            })
        }} className="flex gap-2" variant={'outline'}> <Copy className="w-4 h-4"/> ấn để sao chép </Button>
    </div>
}