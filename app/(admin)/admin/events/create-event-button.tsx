'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateEventForm } from "./create-event-form";



export default function CreateEventButton({children}){
    return <Sheet>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent>
            <CreateEventForm/>
        </SheetContent>
    </Sheet>
}