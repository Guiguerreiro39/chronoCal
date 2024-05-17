import React from 'react'
import { Element, cn } from '../utils'
import { IEventProps } from '../types'

export const Event = (props: IEventProps) => {
  const { containerClassName, className, onClick, component } = props.properties || {}

  return (
    <li
      className={cn('px-2 py-0.5 event h-fit flex overflow-hidden', containerClassName)}
      style={{
        gridColumnStart: props.startColumn,
        gridColumnEnd: props.endColumn,
        gridRow: props.row,
      }}
    >
      {component ? (
        component(props.event, props.properties)
      ) : (
        <Element
          as={onClick ? 'button' : 'div'}
          onClick={() => onClick && onClick(props.event)}
          className={cn(
            'rounded-full bg-neutral-200 w-full text-center px-1 min-h-2 min-w-2 pointer-events-auto hover:bg-blue-100 md:block',
            typeof className === 'function' ? className(props.event) : className,
            props.event.className,
          )}
        >
          <p className='truncate text-xs'>{props.event.title}</p>
        </Element>
      )}
    </li>
  )
}
