import React from 'react'
import { DayContainer } from './DayContainer'
import { getEventEndCol, getEventStartingCol } from '../utils'
import { ITimeGrid, ITimeViewProps } from '../types'
import { addDays, eachDayOfInterval, getDate } from 'date-fns'
import { Event } from './Event'
import { EventLimit } from './EventLimit'

const MonthEvents = ({ week, weekIndex, ...props }: ITimeViewProps & { week: ITimeGrid; weekIndex: number }) => {
  const numEventsPerDay: Record<number, number> = {}

  return (
    <ol className='absolute pointer-events-none w-full grid grid-cols-7 mt-9 mb-2'>
      {props.rowEvents?.[weekIndex] &&
        props.rowEvents[weekIndex].map((event) => {
          const daysOfInterval = eachDayOfInterval({
            start: event.startAt < week[0].date ? week[0].date : event.startAt, // Check if the startAt Date is in this week
            end: event.endAt,
          })

          let row: number = 1
          for (const day of daysOfInterval) {
            const dayToNum = getDate(day)
            const currentNumOfEvents = numEventsPerDay[dayToNum] || 0

            if (currentNumOfEvents >= props.eventLimit) {
              return null
            }

            numEventsPerDay[dayToNum] = currentNumOfEvents + 1
            row = Math.max(row, numEventsPerDay[dayToNum])
          }

          const daysOfEvent = daysOfInterval.filter((day) => day < addDays(week[6].date, 1))

          if (props.isEventExtendable) {
            return (
              <Event
                key={event.id}
                properties={props.eventProperties}
                event={event}
                startColumn={getEventStartingCol(event.startAt, week[0].date)}
                endColumn={getEventEndCol(event.endAt, week[6].date)}
                row={row}
              />
            )
          }

          return (
            <>
              {daysOfEvent.map((day) => (
                <Event
                  properties={props.eventProperties}
                  key={[day.toString(), event.id].join('_')}
                  event={event}
                  startColumn={getEventStartingCol(day, week[0].date)}
                  endColumn={getEventStartingCol(day, week[0].date)}
                  row={row}
                />
              ))}
            </>
          )
        })}
      {week
        .filter((day) => day.events.length > props.eventLimit)
        .map((day) => (
          <EventLimit
            key={day.date.toString()}
            properties={props.eventLimitProperties}
            eventLimit={props.eventLimit}
            events={day.events.slice(props.eventLimit)}
            day={day}
          />
        ))}
    </ol>
  )
}

export const MonthView = (props: ITimeViewProps) => {
  return (
    <>
      {props.timeGrid.map((week, weekIndex) => {
        return (
          <div key={weekIndex} className='relative grid grid-cols-7 gap-px'>
            {week.map((day, dayIndex) => (
              <DayContainer
                {...props}
                key={day.date.toString()}
                day={day}
                dayIndex={dayIndex}
                dayContainerMinHeight={props.dayContainerMinHeight}
              />
            ))}
            <MonthEvents week={week} weekIndex={weekIndex} {...props} />
          </div>
        )
      })}
    </>
  )
}
