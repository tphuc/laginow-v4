import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    let url = searchParams.get('url')

    if(!url){
        return new Response(null, { status: 500 })
    }

    try {
      // Make a request to the provided link to fetch metadata
    const response = await fetch(`https://jsonlink.io/api/extract?url=${url}`);
   
    const responseData = await response.json();

    const metadata = {
      title: responseData.title || '',
      site_name: responseData.site_name || '',
      description: responseData.description || '',
      image: {
        url: responseData.images?.length ?  responseData.images[0] : null
      },
    };

    // Construct the desired format
    const result = {
        success: 1,
      link: url,
      meta: metadata,
    };
      // Send the formatted response
      return NextResponse.json(result, {status:200})
    } catch (error) {
      console.error('Error fetching link metadata:', error);
      return new Response(null, { status: 500 })
    }
}