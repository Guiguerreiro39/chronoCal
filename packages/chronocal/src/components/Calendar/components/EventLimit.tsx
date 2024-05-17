import React from 'react'
import { getDay } from 'date-fns'
import { Element, cn } from '../utils'
import { IEventLimitProps } from '../types'

export const EventLimit = (props: IEventLimitProps) => {
  const { containerClassName, className, onClick, component } = props.properties || {}

  return (
    <li
      className={cn('px-2 py-0.5 md:block hidden', containerClassName)}
      style={{ gridColumnStart: getDay(props.day.date) }}
    >
      {component ? (
        component(props.events, props.properties)
      ) : (
        <Element
          as={typeof onClick === 'function' ? 'button' : 'div'}
          onClick={() => onClick && onClick(props.events)}
          className={cn(
            'font-semibold pointer-events-auto',
            typeof className === 'function' ? className(props.events) : className,
          )}
        >
          +{props.day.events.length - props.eventLimit} more
        </Element>
      )}
    </li>
  )
}
