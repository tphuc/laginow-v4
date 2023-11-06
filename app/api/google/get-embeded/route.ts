import { getServerSession } from "next-auth/next"
import { NextRequest } from "next/server";
import * as z from "zod"



const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

function convertStaticMapToEmbed(staticMapUrl, apiKey='AIzaSyBAboyXp8rVDKs1MzOJTz3OtEty_yoYP3k') {
  // Extract coordinates from the static map URL
  const coordinatesRegex = /center=([^&]+)/;
  const coordinatesMatch = staticMapUrl.match(coordinatesRegex);

  if (coordinatesMatch && coordinatesMatch.length > 1) {
    const coordinates = coordinatesMatch[1];

    // Create the Google Maps Embed URL
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates}`;

    return embedUrl;
  } else {
    return null; // URL format doesn't match expectations
  }
}


// async function getCoordinatesFromGoogleMapsLink(link) {
//     try {
//       // Replace with your actual Google Maps API key
//       const apiKey = 'AIzaSyBAboyXp8rVDKs1MzOJTz3OtEty_yoYP3k';

//       https://maps.app.goo.gl/TuDEMAioNHoYLLpCA

//       // const placeId = 'q3QTUQ3h8yaKjhRDA' ?? link.split('/').pop();
//       // const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
  
//       const response = await fetch('https://maps.app.goo.gl/TuDEMAioNHoYLLpCA', {
//         method:'GET'
//       });
   
//       if (!response.ok) {
//         throw new Error(`Request failed with status ${response.status}`);
//       }
  
//       const data = await response.json();

//       console.log(data)
  
     
//   }
// }

export async function GET(req: NextRequest) {
  try {
    

    // let url = 'https://maps.app.goo.gl/TuDEMAioNHoYLLpCA'
    let url = new URL(req.url)
    let query = url?.searchParams?.get('url')


    
    const response = await fetch(`https://jsonlink.io/api/extract?url=${query}`);
    let data = await response.json();
    let imageUrl = data?.images?.[0]
    console.log(data)

    let sitename = data?.sitename
    let urlSearchParams = new URLSearchParams()
    urlSearchParams.set('q', sitename)
    
    // let embededUrl = convertStaticMapToEmbed(imageUrl)







    return new Response(JSON.stringify({embededUrl: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBAboyXp8rVDKs1MzOJTz3OtEty_yoYP3k&${urlSearchParams.toString()}`}), {status:200})
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

