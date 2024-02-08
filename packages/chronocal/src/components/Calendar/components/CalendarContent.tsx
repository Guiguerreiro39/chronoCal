import * as React from 'react'
import { cn } from '../utils'

export const CalendarContent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  /* eslint-disable react/prop-types */
  const { className, children, ...rest } = props

  return (
    <div
      {...rest}
      className={cn('lg:flex lg:flex-auto lg:flex-col border shadow-md rounded-md overflow-hidden', className)}
    >
      {children}
    </div>
  )
}
