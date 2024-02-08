import React from 'react'
import { weekDays, Element, cn } from '../utils'
import { ICalendarDaysProps } from '../types'

export const CalendarDays = (props: ICalendarDaysProps) => {
  const days = weekDays()

  const { cellOnClick, cellClassName, className, ...rest } = props

  return (
    <div
      {...rest}
      className={cn('grid grid-cols-7 gap-px border-b lg:flex-none border-neutral-300 bg-neutral-200', className)}
    >
      {days.map((day) => (
        <Element
          as={typeof cellOnClick === 'function' ? 'button' : 'div'}
          onClick={() => cellOnClick && cellOnClick(day)}
          key={day}
          className={cn(
            'text-center text-xs font-semibold leading-6 text-neutral-700 flex justify-center bg-white py-2',
            cellClassName,
          )}
        >
          <span>{day.slice(0, 1)}</span>
          <span className='sr-only sm:not-sr-only'>{day.slice(1, 3)}</span>
        </Element>
      ))}
    </div>
  )
}
