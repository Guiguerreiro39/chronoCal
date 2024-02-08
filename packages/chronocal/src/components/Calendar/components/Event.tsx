import React from 'react'
import { Element } from '../utils'
import { twMerge } from 'tailwind-merge'
import { IEventProps } from '../types'

export const Event = (props: IEventProps) => {
  return (
    <li
      className={twMerge('px-2 py-0.5 event', props.containerClassName)}
      style={{
        gridColumnStart: props.startColumn,
        gridColumnEnd: props.endColumn,
      }}
    >
      <Element
        as={typeof props.onClick === 'function' ? 'button' : 'div'}
        onClick={() => props.onClick && props.onClick(props.event)}
        className={twMerge(
          'rounded-full bg-neutral-200 w-full text-center px-1 pointer-events-auto hover:bg-blue-100',
          props.className,
          props.event.className,
        )}
      >
        {props.event.title}
      </Element>
    </li>
  )
}
