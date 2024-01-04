import React, { useEffect } from 'react';
import { headers } from 'next/headers'

  
export default function Page(){
    const headersList = headers()
    const userAgent = headersList.get('User-Agent')

    return <div  className="container px-2 flex h-screen w-screen flex-col items-center justify-center">
        {userAgent}
        <br/>
       
    </div>
}