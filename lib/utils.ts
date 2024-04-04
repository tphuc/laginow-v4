import ms from 'ms'
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, addMinutes, format, formatDistance, parse, subDays, subHours, subMinutes } from 'date-fns'
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


export const VNTimezoneFormat = (datetime: Date) => {
  // Convert to Vietnam Standard Time (ICT)
 const vietnamTimezone = 'Asia/Ho_Chi_Minh';
 const vietnamTime = utcToZonedTime(datetime, vietnamTimezone);
 
 // Format the result as per your requirement
   return format(vietnamTime, 'PPp', {locale: vi});
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
    hour: '2-digit',
    minute: '2-digit'
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
    const existingData: any = data.find(item => getDayVN(new Date(item.tzTimestamp)) === dateStr);

    if (existingData) {
      filledData.push({ count: existingData?._count?.id, timestamp: dateStr});
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

export function getResourceType(url: any) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv'];
  


  if (containsSubstring(url, imageExtensions)) {
      return 'image';
  } else if (containsSubstring(url, videoExtensions)) {
      return 'video';
  } else {
      // Default to 'image' if not explicitly identified as 'video' or 'unknown'
      return 'image';
  }
}

function containsSubstring(url, substrings) {
  for (let i = 0; i < substrings.length; i++) {
      if (url?.includes(substrings[i])) {
          return true;
      }
  }
  return false;
}


export const getParagraphText = (_blocks) => {
  let blocks = _blocks ?? []
  let text = ''
  for (let block of blocks) {
      if (block.type === "paragraph") {
          text += `${block?.data?.text} . `;
          // return block?.data?.text;
      }

      else if (block.type === "header") {
          text += ` ${block?.data?.text} `;
          // return block?.data?.text;
      }

      else if (block.type === "list") {
          text += ` ... `;
          // return block?.data?.text;
      }
  }
  return text?.replace("!&nbsp;", " ")
  ?.replace("?&nbsp;", " ")
  ?.replace("<b>", " ")
  ?.replace('</b>', ' ')
  ?.replace("&nbsp;", " ")
  ?.replace("&nbsp;", " ")
  ?.replace("&nbsp;", " ")
  ?.replace("amp;", " ")
  ?? '';  // Default empty string if no paragraph found
};


export function VNDatetimeToISO(dateString, timeString) {
  // Split the date and time strings
  const [day, month, year] = dateString.split('/');
  const [hour, minute] = timeString.split(':');

  // Parse the date and time components
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);

  // Set the timezone offset for Vietnam timezone
  const tzDate = subHours(date, 7)

  return tzDate;
}
