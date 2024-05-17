import React from 'react'
import { weekDays, Element, cn } from '../utils'
import { ICalendarHeaderProps } from '../types'

export const CalendarHeader = (props: ICalendarHeaderProps) => {
  const { headerProperties, labelText, className, ...rest } = props

  const days = labelText ?? weekDays()

  return (
    <div
      {...rest}
      className={cn('grid grid-cols-7 gap-px border-b lg:flex-none border-neutral-300 bg-neutral-200', className)}
    >
      {days.map((day) => (
        <Element
          as={typeof headerProperties?.onClick === 'function' ? 'button' : 'div'}
          onClick={() => headerProperties?.onClick && headerProperties.onClick(day)}
          key={day}
          className={cn(
            'text-center text-xs font-semibold leading-6 text-neutral-700 flex justify-center bg-white py-2',
            headerProperties?.className,
          )}
        >
          <span>{day.slice(0, 1)}</span>
          <span className='sr-only sm:not-sr-only'>{day.slice(1, 3)}</span>
        </Element>
      ))}
    </div>
  )
}
