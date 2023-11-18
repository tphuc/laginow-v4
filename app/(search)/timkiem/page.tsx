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

async function getTags(){
    let data = await db.tag?.findMany({
        
    })
    return data;
}

export default async function Page() {
    let _masterTags = getMasterTags()
    let _tags =  getTags()
    let [masterTags, tags] = await Promise.all([_masterTags, _tags])
    
    return <div className="relative w-full">
        <SearchPage masterTags={masterTags} businessTags={tags}/>
    </div>
}