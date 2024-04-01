import { redirect } from "next/navigation";

export default async function Page(){
    await redirect('/dashboard/overview')
    return <div>
        
    </div>
}