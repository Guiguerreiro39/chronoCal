import { getMonth, getYear } from 'date-fns'
import { atom, createStore, getDefaultStore } from 'jotai'
import { IEventList, ITimeContainer, ITimeView } from '../types'
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
    get: ITimeContainer | undefined
    set: (value: ITimeContainer | undefined) => void
  }
  events: {
    get: IEventList
    set: (value: IEventList) => void
  }
  timeView: {
    get: ITimeView | undefined
    set: (value: ITimeView | undefined) => void
  }
}

export const calendarStore = createStore()

export const CalendarAtoms = {
  month: atom<number>(getMonth(new Date())),
  year: atom<number>(getYear(new Date())),
  currentTimeContainer: atom<ITimeContainer | undefined>(undefined),
  events: atom<IEventList>([]),
  timeView: atom<ITimeView | undefined>(undefined),
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
    (value: ITimeContainer | undefined) => defaultStore.set(CalendarAtoms.currentTimeContainer, value),
    [defaultStore],
  )

  const events = defaultStore.get(CalendarAtoms.events)
  const setEvents = useCallback((value: IEventList) => defaultStore.set(CalendarAtoms.events, value), [defaultStore])

  const timeView = defaultStore.get(CalendarAtoms.timeView)
  const setTimeView = useCallback(
    (value: ITimeView | undefined) => defaultStore.set(CalendarAtoms.timeView, value),
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
