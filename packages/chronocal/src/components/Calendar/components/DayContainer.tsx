import React from 'react'
import { formatISO, getDate, getMonth, isToday } from 'date-fns'
import { Element, cn, sortPropertiesByPriority } from '../utils'
import { useCalendarAtoms } from '../store'
import { IDayContainerProps, ICellProperties } from '../types'

export const DayContainer = (props: IDayContainerProps) => {
  const [month] = useCalendarAtoms('month')

  const notCurrentMonthDefaultClassName = !props.day.isCurrentMonth && 'bg-neutral-50 text-neutral-500'
  const formattedDate = formatISO(props.day.date, { representation: 'date' })
  const isCurrentMonth = month === getMonth(props.day.date)

  const propertiesSetup = (properties?: ICellProperties) => {
    if (properties) {
      if (typeof properties.currentMonthOnly === 'undefined' || (properties.currentMonthOnly && isCurrentMonth)) {
        return properties
      }

      return properties.differentMonthProperties
    }

    return null
  }

  const cellProperties = propertiesSetup(props.cellProperties)
  const cellContainerProperties = propertiesSetup(props.cellContainerProperties)
  const nowProperties = propertiesSetup(props.nowProperties)
  const nowContainerProperties = propertiesSetup(props.nowContainerProperties)

  const containerSortedProperties = sortPropertiesByPriority([
    cellContainerProperties,
    isToday(props.day.date) ? nowContainerProperties : null,
  ])
  const daySortedProperties = sortPropertiesByPriority([cellProperties, isToday(props.day.date) ? nowProperties : null])

  return (
    <>
      <Element
        as={containerSortedProperties.some((p) => typeof p?.onClick === 'function') ? 'button' : 'div'}
        onClick={() => {
          containerSortedProperties
            .filter((p) => typeof p?.onClick === 'function')
            .pop()
            ?.onClick?.(props.day)
        }}
        key={formattedDate}
        style={{ minHeight: props.dayContainerMinHeight }}
        className={cn(
          'flex flex-col justify-start bg-white px-3 py-2 text-neutral-700',
          notCurrentMonthDefaultClassName,
          ...containerSortedProperties.map((p) =>
            typeof p?.className === 'function' ? p?.className(props.day) : p?.className,
          ),
        )}
      >
        <time
          dateTime={formattedDate}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full',
            ...daySortedProperties.map((p) =>
              typeof p?.className === 'function' ? p?.className(props.day) : p?.className,
            ),
          )}
        >
          <Element
            as={'div'}
            role='button'
            onClick={(e) => {
              e?.stopPropagation()

              daySortedProperties
                .filter((p) => typeof p?.onClick === 'function')
                .pop()
                ?.onClick?.(props.day)
            }}
          >
            {getDate(props.day.date)}
          </Element>
        </time>
      </Element>
    </>
  )
}
