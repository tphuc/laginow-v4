'use client';

import QRCode from "react-qr-code";


export default function QRDisplay({value}){
    console.log(value)
    return <QRCode
    size={256}
    level="Q"
    fgColor='#4f46e5'
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    viewBox={`0 0 256 256`}
    />
}