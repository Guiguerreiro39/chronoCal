import React from 'react'
import { useCalendarAtoms } from '../store'
import { format } from 'date-fns'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'
import { useCalculateMonth, useSetToday } from '../utils/hooks'
import { HeaderProps, MonthSwitcherProps } from '../types'

export const HeaderDate: React.FC<{ className?: string }> = ({ className }) => {
  const [month] = useCalendarAtoms('month')
  const [year] = useCalendarAtoms('year')

  const currentDateTime = new Date(year, month)

  return (
    <h1 className={twMerge('text-xl font-semibold leading-6 text-neutral-900', className)}>
      <time dateTime={format(currentDateTime, 'yyyy-mm')}>{format(currentDateTime, 'LLLL yyyy')}</time>
    </h1>
  )
}

export const ViewSwitcher: React.FC = () => {
  return (
    <div className='hidden md:flex md:items-center'>
      <div className='relative'>
        <button
          type='button'
          className='flex h-9 items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50'
          id='menu-button'
          aria-expanded='false'
          aria-haspopup='true'
        >
          <span>Month view</span>
          <ChevronDownIcon className='h-4 w-4 text-neutral-400' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}

export const MonthSwitcher: React.FC<MonthSwitcherProps> = ({
  className = '',
  todayClassName = '',
  arrowsClassName = '',
}) => {
  const calculateMonth = useCalculateMonth()
  const setToday = useSetToday()

  return (
    <div
      className={twMerge(
        'relative h-9 flex items-center rounded-md bg-white shadow-sm border border-neutral-300 md:items-stretch',
        className,
      )}
    >
      <button
        onClick={() => calculateMonth('prev')}
        type='button'
        className={twMerge(
          'flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-neutral-400 hover:text-neutral-500 focus:relative md:w-9 md:px-2 hover:bg-neutral-50',
          arrowsClassName,
        )}
      >
        <span className='sr-only'>Previous month</span>
        <ChevronLeftIcon className='h-4 w-4' aria-hidden='true' />
      </button>
      <button
        type='button'
        onClick={setToday}
        className={twMerge(
          'hidden px-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 focus:relative md:block',
          todayClassName,
        )}
      >
        Today
      </button>
      <span className='relative -mx-px h-5 w-px bg-neutral-300 md:hidden' />
      <button
        onClick={() => calculateMonth('next')}
        type='button'
        className={twMerge(
          'flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-neutral-400 hover:text-neutral-500 focus:relative md:w-9 md:px-2 hover:bg-neutral-50',
          arrowsClassName,
        )}
      >
        <span className='sr-only'>Next month</span>
        <ChevronRightIcon className='h-4 w-4' aria-hidden='true' />
      </button>
    </div>
  )
}

export const Header: React.FC<HeaderProps> = ({ customHeader, className = '' }) => {
  if (customHeader) return customHeader

  return (
    <div className='w-full'>
      <header className={twMerge('flex self-strech items-center justify-between px-6 py-4 lg:flex-none', className)}>
        <HeaderDate />
        <div className='flex items-center md:gap-4'>
          <MonthSwitcher />
          <ViewSwitcher />
        </div>
      </header>
    </div>
  )
}
