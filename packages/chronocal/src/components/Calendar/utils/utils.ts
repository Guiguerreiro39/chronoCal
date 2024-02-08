import {
  addDays,
  differenceInDays,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isMonday,
  isSameMonth,
  isSunday,
  isToday,
  nextSunday,
  previousMonday,
  startOfDay,
} from 'date-fns'
import { EventList, SingleTimeGrid, TimeGrid } from '../types'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getEventStartingCol = (startAt: Date, firstDayOfWeek: Date): number => {
  if (isAfter(firstDayOfWeek, startAt)) return 1

  return getDay(startAt)
}

export const getEventEndCol = (endAt: Date, lastDayOfWeek: Date): number => {
  if (isBefore(lastDayOfWeek, endAt)) return 8 // Always + 1 in end columns

  return getDay(endAt) + 1
}

export const getEventList = (daysGrid: TimeGrid[]) => {
  const weekEventsList: EventList[] = []

  daysGrid.forEach((week) => {
    let eventList: EventList = []

    week.forEach((day) => {
      const filteredEvents = day.events.filter((event) => !eventList.some((e) => e.id === event.id))
      eventList = [...eventList, ...filteredEvents]
    })

    weekEventsList.push(eventList)
  })

  console.log(weekEventsList)

  return weekEventsList
}

export const isDateInRange = (startAt: Date, endAt: Date, date: Date): boolean => {
  if (isEqual(date, startAt) || isEqual(date, endAt)) return true

  if (isBefore(endAt, startAt) && !isEqual(endAt, startAt)) return false
  if (isBefore(date, startAt)) return false
  if (isAfter(date, endAt)) return false

  return true
}

export const getTimeGrid = (
  firstDayOfMonth: Date,
  lastDayOfMonth: Date,
  events: EventList,
  setCurrentDayGrid: (day: SingleTimeGrid) => void,
): TimeGrid[] => {
  const timeGrid: TimeGrid = []
  let rowTimeGrid: TimeGrid[] = []

  let firstMonday = firstDayOfMonth
  let lastSunday = lastDayOfMonth

  if (!isMonday(firstMonday)) {
    firstMonday = previousMonday(firstDayOfMonth)
  }

  if (!isSunday(lastSunday)) {
    lastSunday = nextSunday(lastDayOfMonth)
  }

  if (differenceInDays(lastSunday, firstMonday) < 41) {
    lastSunday = nextSunday(lastSunday)
  }

  let currentDay = firstMonday
  let dayEvents: EventList = []

  while (currentDay <= lastSunday) {
    events.forEach((event) => {
      if (isDateInRange(startOfDay(event.startAt), startOfDay(event.endAt), currentDay)) {
        dayEvents.push(event)
      }
    })

    const time: SingleTimeGrid = {
      date: currentDay,
      isCurrentMonth: isSameMonth(currentDay, firstDayOfMonth),
      events: dayEvents,
    }

    timeGrid.push(time)

    if (isToday(time.date)) {
      setCurrentDayGrid(time)
    }

    dayEvents = []
    currentDay = addDays(currentDay, 1)
  }

  for (let i = 0; i < timeGrid.length; i += 7) {
    rowTimeGrid = [...rowTimeGrid, timeGrid.slice(i, i + 7)]
  }

  return rowTimeGrid
}
