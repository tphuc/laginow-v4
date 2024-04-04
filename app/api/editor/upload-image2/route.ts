import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import lagiJson from './lagi-361510-276b6fc08e21.json'
import sharp from 'sharp';


const uploadImage = (_fileName: string, buffer: any) => new Promise((resolve, reject) => {
  let projectId = "lagi-361510"; // Get this from Google Cloud

  const storage = new Storage({
    projectId,
    credentials: lagiJson

  })

  const bucket = storage.bucket("laginow");
  // const { originalname, buffer } = file
  
  let fileName = _fileName.replace(/[^\w\d]/g, '');
  console.log(20, fileName)

  let name = `${new Date().toISOString()}${fileName}`
  const blob = bucket.file(name)
  const blobStream = blob.createWriteStream({
    resumable: false
  })



  sharp(buffer)
    .webp() // Convert to WebP format
    .toBuffer()
    .then((webpBuffer) => {
      // Upload the WebP image
      blobStream.on('finish', () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve({
          fileId: name,
          url
        });
      })
        .on('error', (err) => {
          reject(`Unable to upload image, something went wrong: ${err}`);
        })
        .end(webpBuffer);
    })
    .catch((err) => {
      reject(`Unable to convert image to WebP: ${err}`);
    });


})

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }


  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);






    let imageRes: any = await uploadImage(file?.name, buffer)
    return NextResponse.json({
      success: 1,
      file: {
        fileId: imageRes?.fileId,
        url: imageRes?.url
      }
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });



  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// async function convertToJPG(file: File): Promise<Buffer> {
//   // Check if the file is already in JPEG format
//   if (file.type === 'image/jpeg') {
//     const bytes = await file.arrayBuffer();
//     return Buffer.from(bytes);
//   }

//   // Convert other image formats to JPEG using sharp
//   const imageBuffer = await sharp(file)
//     .jpeg() // You can customize the JPEG conversion options if needed
//     .toBuffer();

//   return imageBuffer;
// }





export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}