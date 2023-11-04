import { Be_Vietnam_Pro, Duru_Sans, Raleway, Roboto } from 'next/font/google';
import localFont  from 'next/font/local'

export const fontSans = localFont({
    src: "../app/Inter-VariableFont.ttf",
  
    display: 'swap',
    // weight: ["400"],
    variable: '--font-sans',
  })
  
  
export const fontHeading = Be_Vietnam_Pro({
    // preload: true,
    // src: "../app/Inter-VariableFont.ttf",
    // subsets: ['latin'],
    weight: ["600"],
    display: 'swap',
    variable: "--font-heading",
  });
  