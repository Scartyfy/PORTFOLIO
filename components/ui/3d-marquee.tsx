'use client'

/**
 * @author: @emerald-ui
 * @description: A 3D marquee component that rotates images in a 3D space.
 * @version: 1.0.0
 * @date: 2026-02-12
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface ThreeDMarqueeProps {
  images?: { src: string, onClick?: () => void, alt?: string }[]
  className?: string
}

const defaultImages = [
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/becane.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/chdartmaker--1-.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/www-instituteofhealth-com-.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/wadeandleta-com-.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/felixpeault.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/1820productions.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/emilie.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/telhaclarke.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/jonasreymondin.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/www-anima-ai.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/dulcedo-com-.webp' },
  { src: 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/15thplus.webp' },
]

const ThreeDMarquee = ({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) => {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      className={cn(
        'mx-auto block h-[35rem] w-full overflow-hidden rounded-md max-xl:h-[30rem] max-sm:h-[25rem]',
        className
      )}
    >
      <div className='flex size-full items-center justify-center h-full w-full'>
        <div className='aspect-square h-[45rem] w-[45rem] shrink-0 scale-[1.35] max-xl:h-full max-xl:w-full max-xl:scale-[1.10] max-sm:scale-[1.30]'>
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}
            className='relative top-0 right-[-55%] grid h-full w-full origin-top-left grid-cols-3 gap-5 max-xl:-top-[7.5rem] max-xl:right-[-45%] max-sm:top-0 max-sm:gap-2'
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: "linear"
                }}
                key={colIndex + 'marquee'}
                className='flex flex-col items-start gap-6 max-sm:gap-3'
              >
                {subarray.map((item, imageIndex) => (
                  <div className='relative w-full cursor-pointer hover:scale-105 transition-transform duration-300' key={imageIndex + item.src} onClick={item.onClick}>
                    <img
                      className='aspect-[4/3] h-full w-full rounded-lg bg-[#002FA7]/10 object-cover select-none dark:bg-[#002FA7]/20'
                      key={imageIndex}
                      src={item.src}
                      draggable={false}
                      alt={item.alt || `Image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarquee
