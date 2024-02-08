import React from 'react'
import { useCalendarAtoms } from '../store'
import { format } from 'date-fns'
import { ClockIcon } from '@heroicons/react/24/outline'

export const MobileEvents: React.FC = () => {
  const [currentTimeContainer] = useCalendarAtoms('currentTimeContainer')

  return (
    <>
      {currentTimeContainer && currentTimeContainer?.events.length > 0 && (
        <div className='px-4 py-10 sm:px-6 lg:hidden'>
          <ol className='divide-y divide-neutral-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5'>
            {currentTimeContainer.events.map((event, index) => (
              <li key={index} className='group flex p-4 pr-6 focus-within:bg-neutral-50 hover:bg-neutral-50'>
                <div className='flex-auto'>
                  <p className='font-semibold text-neutral-900'>{event.title}</p>
                  <time dateTime='2022-01-15T09:00' className='mt-2 flex items-center text-neutral-700'>
                    <ClockIcon className='mr-2 h-5 w-5 text-neutral-400' aria-hidden='true' />
                    {format(event.startAt, 'haa')}
                  </time>
                </div>
                <a
                  href='#'
                  className='ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-neutral-900 opacity-0 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-neutral-400 focus:opacity-100 group-hover:opacity-100'
                >
                  Edit<span className='sr-only'>, {event.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
