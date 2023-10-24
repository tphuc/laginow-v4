import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit'
import { imagekit } from '@/lib/imagekit';
const { Storage } = require("@google-cloud/storage");
import lagiJson from './lagi-361510-276b6fc08e21.json'

const uploadImage = (fileName: string, buffer: any) => new Promise((resolve, reject) => {
  let projectId = "lagi-361510"; // Get this from Google Cloud
  let keyFilename = './lagi-361510-276b6fc08e21.json'; // Get this from Google Cloud -> Credentials -> Service Accounts
  const storage = new Storage({
    projectId,
    keyFilename,
  });

  const bucket = storage.bucket("laginow");
  // const { originalname, buffer } = file

  let name = `${new Date().toISOString()}${fileName}`
  const blob = bucket.file(name)
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('finish', () => {
    const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    resolve({
      fileId: name,
      url
    })
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
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
    });



  } catch (error) {
    console.log(44, error)
    return NextResponse.json({ success: false }, { status: 500 });
  }
}




