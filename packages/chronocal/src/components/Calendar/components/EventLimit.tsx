import React from 'react'
import { getDay } from 'date-fns'
import { Element, cn } from '../utils'
import { IEventLimitProps } from '../types'

export const EventLimit = (props: IEventLimitProps) => {
  return (
    <li className={cn('px-2 py-0.5', props.containerClassName)} style={{ gridColumnStart: getDay(props.day.date) }}>
      <Element
        as={typeof props.onClick === 'function' ? 'button' : 'div'}
        onClick={() => props.onClick && props.onClick(props.day.events.slice(props.eventLimit))}
        className={cn(
          'font-semibold pointer-events-auto',
          typeof props.className === 'function' ? props.className() : props.className,
        )}
      >
        +{props.day.events.length - props.eventLimit} more
      </Element>
    </li>
  )
}
