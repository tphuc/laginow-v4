'use client';
import Link from 'next/link';
import Countdown from 'react-countdown';



export default function EventCountdownTimer({event}){

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Link href={`/event/${event.id}`} className='font-heading px-4 py-2 border-indigo-500 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-lg'> Xem câu hỏi của tuần </Link>
    } else {
      // Render a countdown
      return <div className='font-heading px-4 py-2 bg-white text-indigo-700 shadow-sm rounded-md text-xl'> Mở sau {hours} <span className='text-md text-indigo-500'>giờ</span> {minutes} <span className='text-md text-indigo-500'>phút</span> {seconds} <span className='text-md text-indigo-500'>giây</span></div>;
    }
  };
    return <div className='flex cursor-pointer items-center justify-center rounded-sm'>
        <Countdown date={new Date(event?.tzDatetime)} renderer={renderer}/>
    </div>
}