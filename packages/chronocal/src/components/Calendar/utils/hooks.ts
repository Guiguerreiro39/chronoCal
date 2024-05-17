import { useCalendarAtoms } from '../store'
import { getMonth, getYear } from 'date-fns'
import { createBreakpoint } from 'react-use'

export const useCalculateMonth = () => {
  const [month, setMonth] = useCalendarAtoms('month')
  const [year, setYear] = useCalendarAtoms('year')

  return (type: 'next' | 'prev') => {
    const threshold = type === 'next' ? 11 : 0
    const sum = type === 'next' ? 1 : -1

    if ((type === 'next' && month + sum <= threshold) || (type === 'prev' && month + sum >= threshold)) {
      setMonth(month + sum)
      return
    }

    setMonth(type === 'next' ? 0 : 11)
    setYear(year + sum)
  }
}

export const useSetToday = () => {
  const [, setMonth] = useCalendarAtoms('month')
  const [, setYear] = useCalendarAtoms('year')

  return () => {
    const today = new Date()

    setMonth(getMonth(today))
    setYear(getYear(today))
  }
}

export const useBreakpoint = createBreakpoint({
  sm: 0,
  md: 640,
  lg: 768,
  xl: 1024,
  xxl: 1280,
  xxxl: 1536,
}) as () => 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
