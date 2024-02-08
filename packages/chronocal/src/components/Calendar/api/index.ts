import { useCalendarAtoms } from '../store'
import { useCalculateMonth, useSetToday } from '../utils/hooks'

export const useCalendarApi = () => {
  const [month, setMonth] = useCalendarAtoms('month')
  const [year, setYear] = useCalendarAtoms('year')
  const [currentTimeGrid, setCurrentTimeGrid] = useCalendarAtoms('currentTimeContainer')
  const [events, setEvents] = useCalendarAtoms('events')
  const [timeView, setTimeView] = useCalendarAtoms('timeView')

  const calculateMonth = useCalculateMonth()
  const setToday = useSetToday()

  return {
    month: {
      value: month,
      set: setMonth,
    },
    year: {
      value: year,
      set: setYear,
    },
    currentTimeGrid: {
      value: currentTimeGrid,
      set: setCurrentTimeGrid,
    },
    events: {
      value: events,
      set: setEvents,
    },
    timeView: {
      value: timeView,
      set: setTimeView,
    },
    actions: {
      prevMonth: () => calculateMonth('prev'),
      nextMonth: () => calculateMonth('next'),
      today: () => setToday(),
    },
  }
}
