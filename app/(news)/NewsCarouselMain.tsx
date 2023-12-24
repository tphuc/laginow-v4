'use client';
import PublicPostCard from '@/components/public-post-card';
import {
    Carousel,
    CarouselNext,
    CarouselPrevious,
    CarouselSlide,
    CarouselSlideList,
    CarouselSlider,
  } from '@/components/ui/carousel';
import Image from 'next/image';
import NewsCard, { NewsCardHorizontal } from './NewsCard';

export default function NewsCarouselMain({data}){
    return <Carousel>
        <div className="relative w-full flex items-center justify-center">
          <CarouselPrevious />
          <CarouselSlideList className={`w-full`}>
            {data.map((item, i) => (
              <CarouselSlide className='w-full px-1' key={i}>
                <NewsCard data={item} />
              </CarouselSlide>
            ))}
          </CarouselSlideList>
          <CarouselNext />
        </div>
        {/* <CarouselSlider /> */}
      </Carousel>
}


