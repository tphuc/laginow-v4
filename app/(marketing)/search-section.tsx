'use client';

import SearchBarFilter from "@/components/search-bar";
import SearchBarHome from "@/components/search-bar-home";
import Image from "next/image";
import useMeasure from 'react-use-measure'
import { useTransition, a } from '@react-spring/web'
import styles from './styles.module.css'
import shuffle from 'lodash.shuffle'

import { useEffect, useMemo, useState } from 'react'
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { Coffee, Home, UtensilsCrossed } from "lucide-react";

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}



const data = [
  // { css: 'https://storage.googleapis.com/laginow/2023-11-13T13:26:08.052ZFrame 9.jpg', height: 150 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-14T16:36:32.788ZIMG_0252.jpeg', height: 300 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-13T06:43:20.907Z46897E52-E4FA-4DE4-8A60-BBCB0CE11239.jpeg', height: 300 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-14T06:24:23.292ZA8EEE8A7-0907-4F0B-BAE0-27F99F6B2750.jpeg', height: 300 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-13T05:21:29.552ZA9CE93DA-E7DC-4B41-AA2A-E383A993E641.jpeg', height: 300 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-13T06:43:49.838ZIMG_9190.jpeg', height: 300 },
  // { css: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg', height: 200 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-14T01:18:20.764Z7FDC79B4-F56B-471E-8BD8-6E5F98813677.jpeg', height: 300 },
  // { css: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg', height: 200 },
  { css: 'https://storage.googleapis.com/laginow/2023-11-13T13:26:08.052ZFrame 9.jpg', height: 400 },
  // { css: 'https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg', height: 200 },
  // { css: 'https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg', height: 150 },
  // { css: 'https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg', height: 400 },
  // { css: 'https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg', height: 200 },
]


const images = [
  { "url": "https://storage.googleapis.com/laginow/2023-11-13T06:43:49.838ZIMG_9190.jpeg", "fileId": "2023-11-13T06:43:49.838ZIMG_9190.jpeg" },
  { "url": "https://storage.googleapis.com/laginow/2023-11-13T13:26:08.052ZFrame 9.jpg", "fileId": "2023-11-13T13:26:08.052ZFrame 9.jpg" },
  { "url": "https://storage.googleapis.com/laginow/2023-11-14T01:18:20.764Z7FDC79B4-F56B-471E-8BD8-6E5F98813677.jpeg", "fileId": "2023-11-14T01:18:20.764Z7FDC79B4-F56B-471E-8BD8-6E5F98813677.jpeg" },
  "https://storage.googleapis.com/laginow/2023-11-13T13:26:08.052ZFrame 9.jpg",
  "https://storage.googleapis.com/laginow/2023-11-14T16:36:32.788ZIMG_0252.jpeg",
  "https://storage.googleapis.com/laginow/2023-11-13T06:43:20.907Z46897E52-E4FA-4DE4-8A60-BBCB0CE11239.jpeg",
  "https://storage.googleapis.com/laginow/2023-11-14T06:24:23.292ZA8EEE8A7-0907-4F0B-BAE0-27F99F6B2750.jpeg",
  "https://storage.googleapis.com/laginow/2023-11-13T05:21:29.552ZA9CE93DA-E7DC-4B41-AA2A-E383A993E641.jpeg"
]

function Masonry() {
  // Hook1: Tie media queries to the number of columns
  const columns = useMediaQuery('(min-width: 1500px)') ? 4 : 2
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure()
  // Hook3: Hold items
  const [items, set] = useState(data)
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => set(shuffle), 2000)
    return () => clearInterval(t)
  }, [])
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
      return { ...child, x, y, width: width / columns, height: child.height / 2 }
    })
    return [heights, gridItems]
  }, [columns, items, width])
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item: { css: string; height: number }) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })
  // Render the grid
  return (
    <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div style={style} className={"rounded-lg"}>

          <div className="relative w-full h-full">
            <Image className="rounded-lg w-full h-full" width={100} height={100} src={item?.css} alt='' />
          </div>
        </a.div>
      ))}
    </div>
  )
}

export default function SearchSection({ business }: { business?: any[] }) {
  return <div className="w-full relative max-h-[500px] space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 py-5">

    <div className="relative z-20 w-full container space-y-2">
      <h1 className="font-heading text-5xl text-white py-5">
        Tìm kiếm hàng quán, <br /> dịch vụ tại Lagi Now
      </h1>
      <SearchBarFilter />
      <div className="flex flex-wrap gap-2">
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=739Q,CkAF,Op8d,z0rr,MhZK,ejlq,jweb'>
            <UtensilsCrossed className="w-6 h-6 stroke-width-1" /> Ăn uống  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=cTEb,oWwv,d9aF,dT5A'><Home className="w-6 h-6 stroke-width-1" /> Phòng trọ  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=739Q'><Coffee className="w-6 h-6 stroke-width-1" /> Quán cafe  </Link>
        </div>
      </div>
    </div>


    {/* <div style={{maxWidth:700}} className="absolute opacity-50 md:opacity-90 z-10 w-full top-0 left-[55%] w-[40vw] overflow-hidden">
          <Masonry />
        </div> */}
  </div>
}