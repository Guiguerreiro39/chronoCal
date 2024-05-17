import { HTMLAttributes, ReactNode } from 'react'

export type ICalendarProps = {
  defaultTimeView?: ITimeView
} & HTMLAttributes<HTMLDivElement>

export type ITimeView = 'day' | 'week' | 'month'

export type IEventProperties<TEventProperties extends 'eventLimit' | 'event'> = {
  onClick?: (event: TEventProperties extends 'eventLimit' ? IEvent[] : IEvent) => void
  className?: string | ((event: TEventProperties extends 'eventLimit' ? IEvent[] : IEvent) => string)
  containerClassName?: string
  component?: (
    event: TEventProperties extends 'eventLimit' ? IEvent[] : IEvent,
    eventProperties?: Omit<IEventProperties<TEventProperties>, 'component'>,
  ) => ReactNode
}

export type ICellProperties = {
  onClick?: (day: ITimeContainer) => void
  className?: string | ((day: ITimeContainer) => string)
  currentMonthOnly?: boolean
  priority?: number
  differentMonthProperties?: Omit<ICellProperties, 'currentMonthOnly'>
}

export type IHeaderProperties = {
  onClick?: (date: string) => void
  className?: string | ((date: string) => string)
}

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

export type ICalendarBodyProps = {
  isEventExtendable?: boolean
  eventLimit?: number
  events?: IEventList
  eventProperties?: IEventProperties<'event'>
  eventLimitProperties?: IEventProperties<'eventLimit'>
} & HTMLAttributes<HTMLDivElement> &
  IcellContainerProperties

export type IDayContainerProps = {
  day: ITimeContainer
  dayContainerMinHeight: string
  dayIndex: number
  defaultTimeView?: ITimeView
} & IcellContainerProperties

export type IcellContainerProperties = {
  nowProperties?: ICellProperties
  nowContainerProperties?: ICellProperties
  cellProperties?: ICellProperties
  cellContainerProperties?: ICellProperties
}

export type ITimeViewProps = {
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
  properties?: IEventProperties<'eventLimit'>
  events: IEvent[]
}

export type IEventProps = {
  event: IEvent
  startColumn: number
  endColumn: number
  row: number
  properties?: IEventProperties<'event'>
}

export interface HeaderProps {
  className?: string
  customHeader?: ReactNode
}

export interface MonthSwitcherProps {
  className?: string
  todayClassName?: string
  arrowsClassName?: string
}

export type ICalendarHeaderProps = {
  headerProperties?: IHeaderProperties
  labelText?: string[]
} & HTMLAttributes<HTMLDivElement>
