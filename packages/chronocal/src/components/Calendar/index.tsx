import React, { useEffect } from 'react'
import { Provider } from 'jotai'
import { calendarStore, useCalendarAtoms } from './store'
import { cn } from './utils'
import { ICalendarProps } from './types'

export * from './components/CalendarBody'
export * from './components/CalendarContent'
export * from './components/CalendarHeader'
export * from './api'

export const Calendar = (props: ICalendarProps) => {
  const [timeView, setTimeView] = useCalendarAtoms('timeView')

  const { className, children, defaultTimeView = 'month', ...rest } = props

  useEffect(() => {
    if (typeof timeView === 'undefined') {
      setTimeView(defaultTimeView)
    }
  }, [defaultTimeView, setTimeView, timeView])

  return (
    <Provider store={calendarStore}>
      <div {...rest} className={cn('flex h-full w-full flex-col', className)}>
        {children}
      </div>
    </Provider>
  )
}
