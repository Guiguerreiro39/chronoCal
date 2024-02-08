import React from 'react'
import { DayContainer } from './DayContainer'
import { EventLimit } from './EventLimit'
import { Event } from './Event'
import { cn, getEventEndCol, getEventStartingCol } from '../utils'
import { ITimeViewProps } from '../types'
import { eachDayOfInterval } from 'date-fns'

// const MobileCalendarBody: React.FC<{ timeGrid: TimeGrid } & CalendarBodyProps> = ({
//   timeGrid,
//   dayContainerClassName = '',
//   className = '',
// }) => {
//   const [, setCurrentTimeContainer] = useAtom(CalendarAtoms.currentTimeContainer)

//   return (
//     <div className={cn('isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden', className)}>
//       {timeGrid.map((day) => {
//         const notCurrentMonthClassName = !day.isCurrentMonth ? 'bg-neutral-50 text-neutral-500' : ''
//         const formattedDate = format(day.date, 'yyyy-MM-dd')

//         return (
//           <button
//             type='button'
//             onClick={() => setCurrentTimeContainer(day)}
//             key={formattedDate}
//             className={twMerge(
//               'flex h-14 flex-col bg-white px-3 py-2 text-gray-700 hover:bg-gray-100 focus:z-10 ',
//               notCurrentMonthClassName,
//               dayContainerClassName,
//             )}
//           >
//             <time
//               dateTime={formattedDate}
//               className={twJoin(
//                 'ml-auto',
//                 isToday(day.date) && 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white',
//               )}
//             >
//               {getDate(day.date)}
//             </time>
//             <span className='sr-only'>{day.events.length} events</span>
//             <span className='-mx-0.5 mt-auto flex flex-wrap-reverse'>
//               {day.events.map((_, index) => (
//                 <span key={index} className='mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-indigo-300'></span>
//               ))}
//             </span>
//           </button>
//         )
//       })}
//     </div>
//   )
// }

export const MonthView = (props: ITimeViewProps) => {
  return (
    <div className={cn('flex text-xs text-neutral-700 lg:flex-auto bg-neutral-200', props.className)}>
      <div ref={props.containerRef} className={cn('hidden w-full lg:grid lg:grid-rows-6 lg:gap-px')}>
        {props.timeGrid.map((week, weekIndex) => (
          <div key={weekIndex} className='relative hidden lg:grid lg:grid-cols-7 lg:gap-px'>
            {week.map((day, dayIndex) => (
              <DayContainer
                key={day.date.toString()}
                {...props}
                day={day}
                dayIndex={dayIndex}
                dayContainerMinHeight={props.dayContainerMinHeight}
              />
            ))}
            <ol className='absolute pointer-events-none w-full lg:grid lg:grid-cols-7 mt-9'>
              {props.rowEvents?.[weekIndex] &&
                props.rowEvents[weekIndex].slice(0, props.eventLimit).map((event) => {
                  if (props.isEventExtendable) {
                    return (
                      <Event
                        {...props.eventProperties}
                        key={event.id}
                        event={event}
                        startColumn={getEventStartingCol(event.startAt, week[0].date)}
                        endColumn={getEventEndCol(event.endAt, week[6].date)}
                      />
                    )
                  }

                  return (
                    <>
                      {eachDayOfInterval({
                        start: event.startAt,
                        end: event.endAt,
                      }).map((day) => (
                        <Event
                          {...props.eventProperties}
                          key={event.id}
                          event={event}
                          startColumn={getEventStartingCol(day, week[0].date)}
                          endColumn={getEventEndCol(day, week[6].date)}
                        />
                      ))}
                    </>
                  )
                })}
              {week
                .filter((day) => day.events.length > props.eventLimit)
                .map((day) => (
                  <EventLimit
                    {...props.eventLimitProperties}
                    key={day.date.toString()}
                    eventLimit={props.eventLimit}
                    day={day}
                  />
                ))}
            </ol>
          </div>
        ))}
      </div>
      {/* <MobileCalendarBody timeGrid={[]} {...bodyProps} /> */}
    </div>
  )
}
