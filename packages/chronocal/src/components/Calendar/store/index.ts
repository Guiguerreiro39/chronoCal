import { getMonth, getYear } from 'date-fns'
import { atom, createStore, getDefaultStore } from 'jotai'
import { EventList, SingleTimeGrid, TimeView } from '../types'
import { useCallback } from 'react'

type AtomCollection = {
  month: {
    get: number
    set: (value: number) => void
  }
  year: {
    get: number
    set: (value: number) => void
  }
  currentTimeContainer: {
    get: SingleTimeGrid | undefined
    set: (value: SingleTimeGrid | undefined) => void
  }
  events: {
    get: EventList
    set: (value: EventList) => void
  }
  timeView: {
    get: TimeView | undefined
    set: (value: TimeView | undefined) => void
  }
}

export const calendarStore = createStore()

export const CalendarAtoms = {
  month: atom<number>(getMonth(new Date())),
  year: atom<number>(getYear(new Date())),
  currentTimeContainer: atom<SingleTimeGrid | undefined>(undefined),
  events: atom<EventList>([]),
  timeView: atom<TimeView | undefined>(undefined),
}

export const useCalendarAtoms = <K extends keyof typeof CalendarAtoms>(
  atom: K,
): [AtomCollection[K]['get'], AtomCollection[K]['set']] => {
  const defaultStore = getDefaultStore()

  const month = defaultStore.get(CalendarAtoms.month)
  const setMonth = useCallback((value: number) => defaultStore.set(CalendarAtoms.month, value), [defaultStore])

  const year = defaultStore.get(CalendarAtoms.year)
  const setYear = useCallback((value: number) => defaultStore.set(CalendarAtoms.year, value), [defaultStore])

  const currentTimeContainer = defaultStore.get(CalendarAtoms.currentTimeContainer)
  const setCurrentTimeContainer = useCallback(
    (value: SingleTimeGrid | undefined) => defaultStore.set(CalendarAtoms.currentTimeContainer, value),
    [defaultStore],
  )

  const events = defaultStore.get(CalendarAtoms.events)
  const setEvents = useCallback((value: EventList) => defaultStore.set(CalendarAtoms.events, value), [defaultStore])

  const timeView = defaultStore.get(CalendarAtoms.timeView)
  const setTimeView = useCallback(
    (value: TimeView | undefined) => defaultStore.set(CalendarAtoms.timeView, value),
    [defaultStore],
  )

  const atomCollection: AtomCollection = {
    month: {
      get: month,
      set: setMonth,
    },
    year: {
      get: year,
      set: setYear,
    },
    currentTimeContainer: {
      get: currentTimeContainer,
      set: setCurrentTimeContainer,
    },
    events: {
      get: events,
      set: setEvents,
    },
    timeView: {
      get: timeView,
      set: setTimeView,
    },
  }

  return [atomCollection[atom].get, atomCollection[atom].set]
}
