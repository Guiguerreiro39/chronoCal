import React from 'react'
import { formatISO, getDate, isToday } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { Element } from '../utils'
import { useCalendarAtoms } from '../store'
import { IDayContainerProps } from '../types'

export const DayContainer = (props: IDayContainerProps) => {
  const [, setCurrentTimeContainer] = useCalendarAtoms('currentTimeContainer')

  const notCurrentMonthClassName = !props.day.isCurrentMonth && 'bg-neutral-50 text-neutral-500'
  const isTodayClassName =
    isToday(props.day.date) && twMerge('font-semibold text-white bg-neutral-600', props.todayClassName)
  const isTodayContainerClassName = isToday(props.day.date) && props.todayContainerClassName
  const formattedDate = formatISO(props.day.date, { representation: 'date' })

  return (
    <>
      <Element
        as={
          typeof props.dayContainerOnClick === 'function' ||
          (typeof props.todayContainerOnClick === 'function' && isToday(props.day.date))
            ? 'button'
            : 'div'
        }
        onClick={() => {
          if (isToday(props.day.date) && props.todayContainerOnClick) {
            props.todayContainerOnClick(props.day)
          } else if (props.dayContainerOnClick) {
            props.dayContainerOnClick(props.day)
          }

          setCurrentTimeContainer(props.day)
        }}
        key={formattedDate}
        style={{ minHeight: props.dayContainerMinHeight }}
        className={twMerge(
          'flex flex-col justify-start bg-white px-3 py-2 text-neutral-700',
          notCurrentMonthClassName,
          props.dayContainerClassName,
          isTodayContainerClassName,
        )}
      >
        <time
          dateTime={formattedDate}
          className={twMerge(
            'flex h-6 w-6 items-center justify-center rounded-full',
            props.dayClassName,
            isTodayClassName,
          )}
        >
          <Element
            as={typeof props.dayOnClick === 'function' ? 'button' : 'div'}
            onClick={(e) => {
              e?.stopPropagation()

              if (props.dayOnClick) {
                props.dayOnClick(props.day)
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
