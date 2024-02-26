import React from 'react'
import { Element, cn } from '../utils'
import { IEventProps } from '../types'

export const Event = (props: IEventProps) => {
  return (
    <li
      className={cn('px-2 py-0.5 event ', props.containerClassName)}
      style={{
        gridColumnStart: props.startColumn,
        gridColumnEnd: props.endColumn,
      }}
    >
      <Element
        as={props.onClick ? 'button' : 'div'}
        onClick={() => props.onClick && props.onClick(props.event)}
        className={cn(
          'rounded-full bg-neutral-200 w-full text-center px-1 pointer-events-auto hover:bg-blue-100',
          typeof props.className === 'function' ? props.className(props.event) : props.className,
          props.event.className,
        )}
      >
        {props.event.title}
      </Element>
    </li>
  )
}
