'use client';
import PublicPostCard from '@/components/public-post-card';
// import {
//     Carousel,
//     CarouselNext,
//     CarouselPrevious,
//     CarouselSlide,
//     CarouselSlideList,
//     CarouselSlider,
//   } from '@/components/ui/carousel-custom';
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import NewsCard, { NewsCardHorizontal } from './NewsCard';
import Autoplay from 'embla-carousel-autoplay';

export default function NewsCarouselMain({data}){
    return (
    // <Carousel>
    //     <div className="relative w-full flex items-center justify-center">
    //       <CarouselPrevious />
    //       <CarouselSlideList className={`w-full`}>
    //         {data.map((item, i) => (
    //           <CarouselSlide className='w-full px-1' key={i}>
    //             <NewsCard data={item} />
    //           </CarouselSlide>
    //         ))}
    //       </CarouselSlideList>
    //       <CarouselNext />
    //     </div>
    //   </Carousel>
    <Carousel opts={{
      align: "center",
      loop: true,
  }}
      plugins={[
          Autoplay({
              delay: 3000,
          }),
      ]}

      className="w-full">
   
        <CarouselPrevious />
        <CarouselContent className="w-full -ml-1">
            {data.map((item, index) => {
                return <CarouselItem key={index} className="w-full">
                    <NewsCard data={item} />
                </CarouselItem>
            })}
        </CarouselContent>
        <CarouselNext />
        </Carousel>
    )
}


