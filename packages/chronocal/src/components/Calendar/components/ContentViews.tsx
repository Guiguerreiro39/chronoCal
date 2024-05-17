import React, { forwardRef } from 'react'
import { cn } from '../utils'
import { ITimeViewProps } from '../types'
import { MonthView } from './MonthView'

export const ContentViews = forwardRef((props: ITimeViewProps, ref: React.LegacyRef<HTMLDivElement>) => {
  return (
    <div className={cn('flex text-xs text-neutral-700 lg:flex-auto bg-neutral-200', props.className)}>
      <div ref={ref} className={cn('w-full grid grid-rows-6 gap-px')}>
        <MonthView {...props} />
      </div>
    </div>
  )
})
ContentViews.displayName = 'MonthView'
