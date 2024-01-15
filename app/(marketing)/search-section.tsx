'use client';

import Image from "next/image";
import useMeasure from 'react-use-measure'
// import { useTransition, a } from '@react-spring/web'
// import styles from './styles.module.css'
// import shuffle from 'lodash.shuffle'

import { useEffect, useMemo, useState } from 'react'
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { Briefcase, Coffee, Diamond, Flower2, Gem, Home, UtensilsCrossed, Wine } from "lucide-react";
import Balancer from 'react-wrap-balancer'
import SearchBarFilterHome from "@/components/search-bar-home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowTopRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function SearchSection(props) {

  return <div className="w-full transition transition-all min-h-[60vh] relative pt-40 pb-20 bg-gradient-to-tr from-lightGradOne via-lightGradTwo to-lightGradThree  background-animate text-center">

    <div className="relative z-20 w-full container space-y-4">
      <h1 className="font-heading text-indigo-900 max-w-[500px] mx-auto text-5xl">
        <Balancer>
          Tìm kiếm hàng quán, dịch vụ tại Lagi Now
        </Balancer>
      </h1>
      <h1 className="text-indigo-900 text-lg max-w-[600px] mx-auto">
        <Balancer>
          Website đầu tiên tổng hợp các kinh doanh dịch vụ địa phương, tại một nơi duy nhất.
        </Balancer>
      </h1>
      <div className="w-full flex justify-center">
        <SearchBarFilterHome />
      </div>

      <Tabs defaultValue="1">
        <TabsList className="bg-secondary gap-1 rounded-full shadow-sm mb-8">
          <TabsTrigger className="rounded-full transition transition-all gap-2 border-1 border-transparent data[state=active]:border-accent" value='1'>  <UtensilsCrossed className="w-4 h-4 stroke-width-1" /> Ăn uống</TabsTrigger>
          <TabsTrigger className="rounded-full transition transition-all gap-2 border-1 border-transparent data[state=active]:border-accent" value='2'> <Home className="w-4 h-4 stroke-width-1" /> Lưu trú</TabsTrigger>
          <TabsTrigger className="rounded-full transition transition-all gap-2 border-1 border-transparent data[state=active]:border-accent" value='3'>  <Briefcase className="w-4 h-4 stroke-width-1" /> Dịch vụ </TabsTrigger>
        </TabsList>

        <TabsContent  value="1">
          <AnimatePresence>
            <motion.div
              initial={'exit'}
              animate={'enter'}
              variants={{
                enter: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                },
                exit: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}

              className="flex gap-2 max-w-xl mx-auto flex-wrap justify-center">
              {props?.tags?.filter(item => ['739Q', 'CkAF', 'Op8d', 'z0rr', 'MhZK', 'ejlq', 'jweb']?.includes(item?.id))?.map((item) => <motion.span key={item?.id} className='px-3 shadow-sm py-1.5 bg-background rounded-lg'
                variants={{
                  enter: {
                    opacity: 1,
                    scale: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    scale: 0,
                    x: 20
                  }
                }}>
                <Link href={`/timkiem?tags=${item?.id}`} className="flex items-center gap-2">
                  {item?.name}
                  <ArrowTopRightIcon />
                </Link>
              </motion.span>)}
              <span/>
              <motion.span className="py-1.5 text-accent-foreground" variants={{
                enter: {
                  opacity: 1,
                  scale: 1,
                  x: 0
                },
                exit: {
                  opacity: 0,
                  scale: 0,
                  x: 20
                }
              }}>
                <Link  href={`/timkiem?tags=${['739Q', 'CkAF', 'Op8d', 'z0rr', 'MhZK', 'ejlq', 'jweb']?.join(',')}`} className="flex items-center text-accent-foreground decoration hover:underline gap-2">
                  xem tất cả
                </Link>
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent  value="2">
          <AnimatePresence>
            <motion.div
              initial={'exit'}
              animate={'enter'}
              variants={{
                enter: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                },
                exit: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
              className="flex gap-2 max-w-xl mx-auto flex-wrap justify-center">
              {props?.tags?.filter(item => ['cTEb', 'oWwv', 'd9aF', 'dT5A']?.includes(item?.id))?.map((item) => <motion.span key={item?.id} className='px-3 py-1.5 bg-background rounded-lg' variants={{
                enter: {
                  opacity: 1,
                  scale: 1,
                  x: 0
                },
                exit: {
                  opacity: 0,
                  scale: 0,
                  x: 20
                }
              }}>
                <Link href='#' className="flex items-center gap-2">
                  {item?.name}
                  <ArrowTopRightIcon />
                </Link>
              </motion.span>)}
              <motion.span className="py-1.5 text-accent-foreground" variants={{
                enter: {
                  opacity: 1,
                  scale: 1,
                  x: 0
                },
                exit: {
                  opacity: 0,
                  scale: 0,
                  x: 20
                }
              }}>
                <Link  href={`/timkiem?tags=${['cTEb', 'oWwv', 'd9aF', 'dT5A']?.join(',')}`} className="flex px-3 items-center text-accent-foreground decoration hover:underline gap-2">
                  xem tất cả
                </Link>
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent  value="3">
          <div className="flex">
            <AnimatePresence>
              <motion.div
                initial={'exit'}
                animate={'enter'}
                variants={{
                  enter: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  },
                  exit: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}

                className="flex gap-2 max-w-xl mx-auto flex-wrap justify-center">
                {props?.tags?.filter(item => ['Xmg9', 'jvt6', 'VW1b', 's5_6', 'eA3p', 'uqSf', '7pHF', 'A4CV', 'x8BT', 'n2gy']?.includes(item?.id))?.map((item) => <motion.span key={item?.id} className='px-3 py-1.5 bg-background rounded-lg' variants={{
                  enter: {
                    opacity: 1,
                    scale: 1,
                    x: 0
                  },
                  exit: {
                    opacity: 0,
                    scale: 0,
                    x: 20
                  }
                }}>
                  <Link href='#' className="flex items-center gap-2">
                    {item?.name}
                    <ArrowTopRightIcon />
                  </Link>
                </motion.span>)}
                <motion.span className="py-1.5 text-accent-foreground" variants={{
                enter: {
                  opacity: 1,
                  scale: 1,
                  x: 0
                },
                exit: {
                  opacity: 0,
                  scale: 0,
                  x: 20
                }
              }}>
                <Link  href={`/timkiem?tags=${['Xmg9', 'jvt6', 'VW1b', 's5_6', 'eA3p', 'uqSf', '7pHF', 'A4CV', 'x8BT', 'n2gy']?.join(',')}`} className="flex px-3 items-center text-accent-foreground decoration hover:underline gap-2">
                  xem tất cả
                </Link>
              </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* <div className="flex flex-wrap gap-2">
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=739Q,CkAF,Op8d,z0rr,MhZK,ejlq,jweb'>
            <UtensilsCrossed className="w-6 h-6 stroke-width-1" /> Ăn uống  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=cTEb,oWwv,d9aF,dT5A'><Home className="w-6 h-6 stroke-width-1" /> Lưu trú  </Link>
        </div>
        <div className="p-1 gap-2 px-4 py-2 bg-secondary border rounded-md flex cursor-pointer hover:bg-secondary">
          <Link className="flex items-center gap-2 text-lg" href='https://laginow.com/timkiem?tags=739Q'><Coffee className="w-6 h-6 stroke-width-1" /> Quán cafe  </Link>
        </div>
      </div> */}
    </div>


    {/* <div style={{maxWidth:700}} className="absolute opacity-50 md:opacity-90 z-10 w-full top-0 left-[55%] w-[40vw] overflow-hidden">
          <Masonry />
        </div> */}
  </div>
}