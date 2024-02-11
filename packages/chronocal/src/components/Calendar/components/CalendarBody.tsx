import React, { ElementRef, useCallback, useEffect, useRef, useState } from 'react'

import { endOfMonth, startOfMonth } from 'date-fns'
import { getEventList, getTimeGrid } from '../utils'
import { IEventList, ITimeGrid, ISingleTimeGrid } from '../types'
import { MonthView } from './TimeViews'
import { ICalendarBodyProps } from '../types'
import { useCalendarAtoms } from '../store'
import { v4 as uuid } from 'uuid'

export const CalendarBody = (props: ICalendarBodyProps) => {
  const { events: defaultEvents = [], ...rest } = props

  const [month] = useCalendarAtoms('month')
  const [year] = useCalendarAtoms('year')
  const [events, setEvents] = useCalendarAtoms('events')
  const [currentTimeContainer, setCurrentTimeContainer] = useCalendarAtoms('currentTimeContainer')

  const [timeView] = useCalendarAtoms('timeView')

  const [timeGrid, setTimeGrid] = useState<ITimeGrid[]>([])
  const [rowEvents, setRowEvents] = useState<IEventList[]>([])
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(startOfMonth(new Date(year, month)))
  const [lastDayOfMonth, setLastDayOfMonth] = useState<Date>(endOfMonth(new Date(year, month)))
  const [eventsContainerHeight, setEventsContainerHeight] = useState<number>(0)

  const containerRef = useRef<ElementRef<'div'>>(null)

  const handleCurrentTimeContainer = useCallback(
    (time: ISingleTimeGrid) => {
      if (!currentTimeContainer) {
        setCurrentTimeContainer(time)
      }
    },
    [currentTimeContainer, setCurrentTimeContainer],
  )

  const eventLimit = props.eventLimit ?? 2

  useEffect(() => {
    if (containerRef.current) {
      if (containerRef.current?.getElementsByClassName('event').length > 0) {
        setEventsContainerHeight(
          containerRef.current?.getElementsByClassName('event')[0]?.getBoundingClientRect().height * (eventLimit + 1),
        )
      }
    }
  }, [containerRef, rowEvents, setEventsContainerHeight, eventLimit])

  useEffect(() => {
    setFirstDayOfMonth(startOfMonth(new Date(year, month)))
    setLastDayOfMonth(endOfMonth(new Date(year, month)))
    setRowEvents([])
  }, [month, year])

  useEffect(() => {
    if (typeof timeView !== 'undefined') {
      setTimeGrid(getTimeGrid(firstDayOfMonth, lastDayOfMonth, events, handleCurrentTimeContainer))
    }
  }, [firstDayOfMonth, lastDayOfMonth, events, timeView, handleCurrentTimeContainer])

  useEffect(() => {
    if (timeGrid.length > 0) {
      setRowEvents(getEventList(timeGrid))
    }
  }, [timeGrid])

  useEffect(() => {
    if (defaultEvents.length > 0) {
      setEvents(defaultEvents.map((event) => ({ ...event, id: uuid() })))
    }
  }, [defaultEvents, setEvents])

  const dayContainerMinHeight = useCallback(() => `calc(2.3rem + ${eventsContainerHeight}px)`, [eventsContainerHeight])

  return (
    <MonthView
      {...rest}
      eventLimit={eventLimit}
      timeGrid={timeGrid}
      dayContainerMinHeight={dayContainerMinHeight()}
      containerRef={containerRef}
      rowEvents={rowEvents}
    />
  )
}
