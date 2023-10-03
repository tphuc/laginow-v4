import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC as string,
    privateKey: process.env.IMAGEKIT_PRIVATE as string,
    urlEndpoint :"https://ik.imagekit.io/laginow4"
});


export { imagekit }