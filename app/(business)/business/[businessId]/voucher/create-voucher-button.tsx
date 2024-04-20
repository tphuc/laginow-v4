'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateVoucherForm } from "./create-voucher-form";



export default function CreateVoucherButton({children, businessId}){
    return <Sheet modal>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent>
            <CreateVoucherForm businessId={businessId}/>
        </SheetContent>
    </Sheet>
}