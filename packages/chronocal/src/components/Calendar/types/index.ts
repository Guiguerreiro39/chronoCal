import { HTMLAttributes, LegacyRef, ReactNode } from 'react'

export type ICalendarProps = {
  defaultTimeView?: ITimeView
} & HTMLAttributes<HTMLDivElement>

export type ITimeView = 'day' | 'week' | 'month'

export type IEvent = {
  id?: string
  className?: string
  customProps?: any
  startAt: Date
  endAt: Date
  title: string
}

export type IEventList = IEvent[]

export type ITimeContainer = {
  date: Date
  isCurrentMonth: boolean
  events: IEventList
}

export type ITimeGrid = ITimeContainer[]

export type IEventProperties<TEventProperties extends 'eventLimit' | 'event'> = {
  onClick?: (event: TEventProperties extends 'eventLimit' ? IEvent[] : IEvent) => void
  className?: string | ((event?: TEventProperties extends 'eventLimit' ? IEvent[] : IEvent) => string)
  containerClassName?: string
}

export type ICalendarBodyProps = {
  isEventExtendable?: boolean
  eventLimit?: number
  events?: IEventList
  eventProperties?: IEventProperties<'event'>
  eventLimitProperties?: IEventProperties<'eventLimit'>
} & HTMLAttributes<HTMLDivElement> &
  IDayContainerProperties

export type IDayProperties = {
  onClick?: (day: ITimeContainer) => void
  className?: string | ((day: ITimeContainer) => string)
  currentMonthOnly?: boolean
  priority?: number
  differentMonthProperties?: Omit<IDayProperties, 'currentMonthOnly'>
}

export type IDayContainerProps = {
  day: ITimeContainer
  dayContainerMinHeight: string
  dayIndex: number
  defaultTimeView?: ITimeView
} & IDayContainerProperties

export type IDayContainerProperties = {
  todayProperties?: IDayProperties
  todayContainerProperties?: IDayProperties
  dayProperties?: IDayProperties
  dayContainerProperties?: IDayProperties
}

export type ITimeViewProps = {
  containerRef: LegacyRef<HTMLDivElement> | undefined
  timeGrid: ITimeGrid[]
  dayContainerMinHeight: string
  rowEvents: IEventList[]
  eventLimit: number
} & Omit<ICalendarBodyProps, 'events'> &
  Omit<IDayContainerProps, 'day' | 'dayIndex' | 'dayContainerMinHeight'> &
  HTMLAttributes<HTMLDivElement>

export type IEventLimitProps = {
  day: ITimeContainer
  eventLimit: number
} & IEventProperties<'eventLimit'>

export type IEventProps = {
  event: IEvent
  startColumn: number
  endColumn: number
} & IEventProperties<'event'>

export interface HeaderProps {
  className?: string
  customHeader?: ReactNode
}

export interface MonthSwitcherProps {
  className?: string
  todayClassName?: string
  arrowsClassName?: string
}

export type ICalendarDaysProps = {
  cellClassName?: string
  cellOnClick?: (day: string) => void
} & HTMLAttributes<HTMLDivElement>
