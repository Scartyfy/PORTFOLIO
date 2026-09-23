'use client'

import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface Props {
  label: string
  variant?: 'primary' | 'secondary'
  classes?: string
  animate?: boolean
  delay?: number
  onClick?: () => void
}

const MotionButton: FC<Props> = ({ label, classes, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-magnetic
      className={cn(
        'bg-white/10 group relative h-14 w-48 cursor-pointer rounded-full border border-white/20 p-1 outline-none shadow-lg transition-all duration-300 hover:border-white/40',
        classes
      )}
    >
      <span
        className='circle bg-white m-0 block h-11 w-11 overflow-hidden rounded-full duration-500 group-hover:w-full'
        aria-hidden='true'
      ></span>
      <div className='icon absolute top-1/2 left-[0.35rem] translate-x-0 -translate-y-1/2 duration-500 group-hover:translate-x-[0.4rem]'>
        <ArrowRight className='text-[#002FA7] size-6' />
      </div>
      <span className='button-text text-white group-hover:text-[#002FA7] font-display absolute top-2/4 left-2/4 ml-4 -translate-x-2/4 -translate-y-2/4 text-center text-sm font-bold tracking-widest uppercase whitespace-nowrap duration-500'>
        {label}
      </span>
    </button>
  )
}

export default MotionButton
