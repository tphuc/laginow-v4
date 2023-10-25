import { imagekit } from "@/lib/imagekit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {fileId} = await request.json();
  
  
    if (!fileId) {
      return NextResponse.json({ success: false });
    }
  
    

    try {
      // Upload the image to ImageKit
      const response = await imagekit.deleteFile(fileId);

      // Return the desired response format
      return NextResponse.json({
        success: true,
      });
    } catch (error) {
      return NextResponse.json({ success: false });
    }
  }
  

  export const OPTIONS = async (request: NextRequest) => {
    return new NextResponse('', {
      status: 200
    })
  }