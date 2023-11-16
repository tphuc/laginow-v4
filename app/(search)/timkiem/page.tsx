import BusinessPageCard from "@/components/public-page-card";
import SearchPage from "@/components/search-page";
import db from '@/lib/prisma'



async function getMasterTags(){
    let data = await db.masterTag?.findMany({
        include: {
            tags: true
        }
    })
    return data;
}

export default async function Page() {
    let masterTags = await getMasterTags()
    
    return <div className="relative w-full">
        <SearchPage masterTags={masterTags}/>
    </div>
}