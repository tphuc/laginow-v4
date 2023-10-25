import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit'
import { imagekit } from '@/lib/imagekit';



export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Upload the image to ImageKit
    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
    });

    // Get the uploaded image's URL and thumbnail URL from the response
    const { fileId, url, thumbnailUrl, name, width, height, size, } = response;

    // Return the desired response format
    return NextResponse.json({
      success: 1,
      file: {
        fileId,
        url,
        thumbnailUrl,
        name, width, height, size,
      }
    });

    
  } catch (error) {
    console.log(44, error)
    return NextResponse.json({ success: false }, {status: 500});
  }
}



export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}