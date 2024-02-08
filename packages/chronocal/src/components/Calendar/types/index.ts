import { HTMLAttributes, LegacyRef, ReactNode } from 'react'

export type ICalendarProps = {
  defaultTimeView?: TimeView
} & HTMLAttributes<HTMLDivElement>

export type TimeView = 'day' | 'week' | 'month'

export type Event = {
  id?: string
  className?: string
  customProps?: any
  startAt: Date
  endAt: Date
  title: string
}

export type EventList = Event[]

export type SingleTimeGrid = {
  date: Date
  isCurrentMonth: boolean
  events: EventList
}

export type TimeGrid = SingleTimeGrid[]

export type EventProperties<TProperties extends 'eventLimit' | 'event'> = {
  onClick?: (event?: TProperties extends 'eventLimit' ? Event[] : Event) => void
  className?: string
  containerClassName?: string
}

export type ICalendarBodyProps = {
  isEventExtendable?: boolean
  eventLimit?: number
  events?: EventList
  eventProperties?: EventProperties<'event'>
  eventLimitProperties?: EventProperties<'eventLimit'>
} & HTMLAttributes<HTMLDivElement>

export type IDayContainerProps = {
  day: SingleTimeGrid
  dayContainerMinHeight: string
  dayIndex: number
  todayClassName?: string
  todayContainerClassName?: string
  todayContainerOnClick?: (day?: SingleTimeGrid) => void
  dayClassName?: string
  dayOnClick?: (day?: SingleTimeGrid) => void
  dayContainerClassName?: string
  dayContainerOnClick?: (day?: SingleTimeGrid) => void
  bodyClassName?: string
  defaultTimeView?: TimeView
}

export type ITimeViewProps = {
  containerRef: LegacyRef<HTMLDivElement> | undefined
  timeGrid: TimeGrid[]
  dayContainerMinHeight: string
  rowEvents: EventList[]
  eventLimit: number
} & Omit<ICalendarBodyProps, 'events'> &
  Omit<IDayContainerProps, 'day' | 'dayIndex' | 'dayContainerMinHeight'> &
  HTMLAttributes<HTMLDivElement>

export type IEventLimitProps = {
  day: SingleTimeGrid
  eventLimit: number
} & EventProperties<'eventLimit'>

export type IEventProps = {
  event: Event
  startColumn: number
  endColumn: number
} & EventProperties<'event'>

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
