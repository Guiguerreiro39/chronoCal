import React from 'react'
import { twMerge } from 'tailwind-merge'
import { getDay } from 'date-fns'
import { Element } from '../utils'
import { IEventLimitProps } from '../types'

export const EventLimit = (props: IEventLimitProps) => {
  return (
    <li
      className={twMerge('px-2 py-0.5', props.containerClassName)}
      style={{ gridColumnStart: getDay(props.day.date) }}
    >
      <Element
        as={typeof props.onClick === 'function' ? 'button' : 'div'}
        onClick={() => props.onClick && props.onClick(props.day.events.slice(props.eventLimit))}
        className={twMerge('font-semibold pointer-events-auto', props.className)}
      >
        +{props.day.events.length - props.eventLimit} more
      </Element>
    </li>
  )
}
