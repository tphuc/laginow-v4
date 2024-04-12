'use client';


import { ClientPagination } from "./client-pagination";
import { columns } from "./columns";
import { DataTable } from "./table/data-table";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateEventForm } from "./create-event-form";



export default function DataPage({ data }) {


    return <div className="space-y-2">
        {/* <Sheet>
            <SheetTrigger asChild>
                <Button className="max-w-[200px] gap-2 rounded-sm"> <Plus className="w-4 h-4" /> Thêm Câu hỏi</Button>
            </SheetTrigger>
            <SheetContent>
                <CreateEventForm />
            </SheetContent>
        </Sheet>
        <DataTable data={data?.data ?? []} columns={columns} />
        {!data?.data?.length && <p className="text-muted-foreground">không có dữ liệu</p>}
        <ClientPagination totalPages={Math.ceil(data?.total / 10)} perPage={10} /> */}
    </div>
}