import { NextRequest, NextResponse } from 'next/server';
import { Storage } from "@google-cloud/storage"; // Import the Storage class from the Google Cloud Storage library

// Your existing credentials
const projectId = "lagi-361510";
const keyFilename = './lagi-361510-276b6fc08e21.json';
const bucketName = "laginow";

const deleteImage = (fileName: string) => new Promise((resolve, reject) => {
  const storage = new Storage({
    projectId,
    keyFilename,
  });

  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(fileName);

  blob.delete((err) => {
    console.log(err)
    if (err) {
      reject(`Unable to delete image, something went wrong`);
    } else {
      resolve(`Image '${fileName}' deleted successfully`);
    }
  });
});

export async function POST(request: NextRequest) {
  const { fileId } = await request.json(); // Assuming you send the file name to be deleted in the request body

  if (!fileId) {
    return NextResponse.json({ success: false, message: "Missing file name" }, { status: 400 });
  }

  try {
    const deleteResult = await deleteImage(fileId);

    return NextResponse.json({
      success: true,
      message: deleteResult,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to delete the image" }, { status: 500 });
  }
}


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}