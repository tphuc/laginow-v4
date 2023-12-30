import ms from 'ms'
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, format, formatDistance, parse, subDays } from 'date-fns'
const { vi } = require('date-fns/locale');

const { startOfDay } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

// Set the target time zone to Vietnam
const vietnamTimeZone = 'Asia/Ho_Chi_Minh';



export const startOfDayVN = (datetime: Date) => {
  const currentDateTimeInVietnam = utcToZonedTime(datetime, vietnamTimeZone);
  // Get the start of the day in Vietnam time
  const startOfDayInVietnam = startOfDay(currentDateTimeInVietnam);
  return startOfDayInVietnam
}


export const getDayVN = (datetime: Date) => {
 // Convert to Vietnam Standard Time (ICT)
const vietnamTimezone = 'Asia/Ho_Chi_Minh';
const vietnamTime = utcToZonedTime(datetime, vietnamTimezone);

// Format the result as per your requirement
  return format(vietnamTime, 'dd-MM');
}




// export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
//   if (!timestamp) return 'never'
//   return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'
//     }`
// }

// Example usage: timeAgo(new Date(), new Date('2023-10-01'));
export function timeAgo(targetDate, referenceDate = new Date()) {
  return formatDistance(targetDate, referenceDate, {
    locale: vi,
  });
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function vndFormat(amount: any): string {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(amount)
}



export function isCurrentlyOpen(schedule) {
  // Get the current day and time in HH:mm format
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  // Check if the current day is in the schedule and not marked as off
  if (schedule?.[currentDay] && !schedule?.[currentDay]?.isOff) {
    const startTime = schedule?.[currentDay]?.startTime;
    const endTime = schedule?.[currentDay]?.endTime;
    // Compare the current time with the start and end times
    if (currentTime >= startTime && currentTime <= endTime) {
      return true; // Day is currently open
    }
  }
  return false; // Day is not open or not in the schedule
}

export function getOpenHrs(schedule) {
  // Get the current day and time in HH:mm format
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  // Check if the current day is in the schedule and not marked as off
  if (schedule?.[currentDay] && !schedule?.[currentDay]?.isOff) {
    return schedule?.[currentDay]
  }
  return {}; // Day is not open or not in the schedule
}


type DataObject = {
  _count: { id: number };
  timestamp: string;
};


export function fillMissingDates(originalArray: DataObject[]): DataObject[] {
  // Check if originalArray is empty or undefined
  if (!originalArray?.length) {
    return [];
  }

  const sortedArray = [...originalArray].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const newArray: DataObject[] = [];
  const dateSet = new Set(sortedArray.map(item => item.timestamp));

  let currentDate = new Date(sortedArray[0].timestamp);
  const endDate = new Date(sortedArray[sortedArray.length - 1].timestamp);

  while (currentDate <= endDate) {
    const timestampString = currentDate.toISOString();

    if (dateSet.has(timestampString)) {
      newArray.push(sortedArray.find(item => item.timestamp === timestampString)!);
    } else {
      newArray.push({
        _count: { id: 0 },
        timestamp: timestampString
      });
    }

    currentDate = addDays(currentDate, 1);
  }

  return newArray;
}


export function fillEmptyDates(data: any, startDate: Date, endDate: Date) {
  const filledData: any[] = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dateStr = getDayVN(currentDate)
    const existingData: any = data.find(item => item.timestamp === dateStr);

    if (existingData) {
      filledData.push(existingData);
    } else {
      filledData.push({ count: 0, timestamp: dateStr });
    }

    currentDate = addDays(currentDate, 1)
  }

  return filledData;
}


export function generateUniqueId() {
  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Generate a random number (you can use a more sophisticated random number generator)
  const random = Math.floor(Math.random() * 10000);

  // Combine timestamp and random number to create the unique ID
  const uniqueId = `${timestamp}-${random}`;

  return uniqueId;
}