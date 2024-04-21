'use client';

import { useEffect } from 'react';
import { FacebookEmbed } from 'react-social-media-embed';
import './style.css'
export default function SocialMediaAds({items}) {
    
  
    return <div  className="w-full flex items-center flex-wrap gap-4">
        {
            items?.map((item, id) => {
                let url = new URLSearchParams()
                url.set('href', item)
                return <div key={id} className='relative flex-1 rounded-md min-w-[320px] min-h-[400px]'>
                    <iframe className='responsive-iframe'  src={`https://www.facebook.com/plugins/post.php?show_text=true&appId=219877663927309&height=340&${url?.toString()}`}  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
            })
        }
       
    </div>
}