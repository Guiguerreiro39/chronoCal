import React from 'react'
import { formatISO, getDate, getMonth, isToday } from 'date-fns'
import { Element, cn } from '../utils'
import { useCalendarAtoms } from '../store'
import { IDayContainerProps, IDayProperties } from '../types'

export const DayContainer = (props: IDayContainerProps) => {
  const [, setCurrentTimeContainer] = useCalendarAtoms('currentTimeContainer')
  const [month] = useCalendarAtoms('month')

  const notCurrentMonthClassName = !props.day.isCurrentMonth && 'bg-neutral-50 text-neutral-500'
  const formattedDate = formatISO(props.day.date, { representation: 'date' })
  const isCurrentMonth = month === getMonth(props.day.date)

  const propertiesSetup = (properties?: IDayProperties) => {
    if (properties) {
      if (typeof properties.currentMonthOnly === 'undefined' || (properties.currentMonthOnly && isCurrentMonth)) {
        return properties
      }

      return properties.differentMonthProperties
    }

    return null
  }

  const dayProperties = propertiesSetup(props.dayProperties)
  const dayContainerProperties = propertiesSetup(props.dayContainerProperties)
  const todayProperties = propertiesSetup(props.todayProperties)
  const todayContainerPropeties = propertiesSetup(props.todayContainerProperties)

  return (
    <>
      <Element
        as={
          typeof dayContainerProperties?.onClick === 'function' ||
          (typeof todayContainerPropeties?.onClick === 'function' && isToday(props.day.date))
            ? 'button'
            : 'div'
        }
        onClick={() => {
          if (isToday(props.day.date) && todayContainerPropeties?.onClick) {
            todayContainerPropeties?.onClick(props.day)
          } else if (dayContainerProperties?.onClick) {
            dayContainerProperties?.onClick(props.day)
          }

          setCurrentTimeContainer(props.day)
        }}
        key={formattedDate}
        style={{ minHeight: props.dayContainerMinHeight }}
        className={cn(
          'flex flex-col justify-start bg-white px-3 py-2 text-neutral-700',
          notCurrentMonthClassName,
          dayContainerProperties?.className,
          isToday(props.day.date) && todayContainerPropeties?.className,
        )}
      >
        <time
          dateTime={formattedDate}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full',
            dayProperties?.className,
            isToday(props.day.date) && cn('font-semibold text-white bg-neutral-600', todayProperties?.className),
          )}
        >
          <Element
            as={
              typeof dayProperties?.onClick === 'function' ||
              (isToday(props.day.date) && typeof todayProperties?.onClick)
                ? 'button'
                : 'div'
            }
            onClick={(e) => {
              e?.stopPropagation()

              if (isToday(props.day.date) && todayProperties?.onClick) {
                todayProperties?.onClick(props.day)
                return
              }

              if (dayProperties?.onClick) {
                dayProperties?.onClick(props.day)
              }
            }}
          >
            {getDate(props.day.date)}
          </Element>
        </time>
      </Element>
    </>
  )
}
