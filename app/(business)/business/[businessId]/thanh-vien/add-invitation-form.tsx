'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AddInvitationForm({businessId}: {businessId: string}){

    const router = useRouter()
    const [email, setEmail] = useState('')
    const mutation = useMutation({
        mutationFn: (body) => {
          
          let res = fetch(`/api/business/${businessId}/invite`, {
            body: JSON.stringify(body),
            method:'POST'
          })

          return res
        },
    })


    const create = async () => {
      if(!email){
        return
      }

      let res = await mutation.mutateAsync({email: email} as any)
      if(res?.status === 200){
        toast({
          title: "Đã gửi lời mời thành công"
        })
        router.refresh()
      }
    }

  
    
    return <div className="flex items-center gap-1 flex-wrap">
        <Input placeholder="email của thành viên" value={email} onChange={(e) => setEmail(e?.target?.value)} />
        <Button onClick={create} disabled={mutation.isLoading} className="flex gap-2">
          Gửi lời mời  
          {mutation.isLoading ? <Loader2 className="animate-spin text-muted-foreground w-5 h-5" /> :  <Mail className="w-4 h-4"/>}
        </Button>
    </div>
}