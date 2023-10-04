import BusinessPageCard from "@/components/public-page-card";
import PublicPostCard from "@/components/public-post-card";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";



async function fetchData(url: string) {

    try {
        let res = await fetch(`${url}`, {
            method: "GET",
            cache: 'default',
            next: {
                revalidate: 3600
            }
        })

        return res.json()
    }
    catch (e) {
        console.log(e)
        return null
    }
}




export const preferredRegion = 'home'
export const dynamic = 'auto'



export default async function Page() {

    // function getHost(){
    //     const host = headers().get("host");
    //     const protocal = process?.env.NODE_ENV === "development"?"http":"https"
    //     return `${protocal}://${host}`
    // }


    let businessPages = await fetchData(`https://laginow-v4.vercel.app/api/public/business?take=10`)
    let posts = await fetchData(`https://laginow-v4.vercel.app/api/public/post?take=10`)


    return <div className="relative space-y-5 max-w-screen-xl w-full gap-2">


        <div className="shadow-sm border bg-gray-100 border-input aspect-video rounded-lg overflow-hidden h-80 w-full text-white text-center flex items-center justify-center">
            <Image alt='' width={400} height={300} className="ml-[40%] object-cover rounded-sm" src={'/hero.svg'} />
            <div className="absolute top-2 left-2 p-[4.5%] space-y-4">
                <p className="text-secondary-foreground text-3xl md:text-5xl font-heading text-left pr-[10%] md:pr-[45%]">Tạo trang kinh doanh của bạn trên Laginow</p>
                <p className="text-secondary-foreground text-xl text-2xl text-left text-gray-400 pr-[10%]">Kết nối và quảng bá đến cộng đồng</p>
                <Link
                    href="/login"
                    className="flex"
                >
                    <Button variant={'default'}> Đăng ký </Button>
                </Link>

            </div>
        </div>

        <br />
        <p className="text-3xl font-heading">Trang nổi bật</p>

        <div className="flex gap-2 flex-wrap">
            {
                businessPages?.map((item: any) => <BusinessPageCard
                    data={item}
                    key={item?.id}
                />)
            }
        </div>

        <br />
        <p className="text-3xl font-heading">Bài viết nổi bật</p>
        <div className="flex gap-2 flex-wrap">
            {
                posts?.map((item: any) => <PublicPostCard
                    data={item}
                    key={item?.id}
                />)
            }
        </div>

    </div>
}