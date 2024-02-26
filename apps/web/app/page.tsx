"use client";

import {
  Calendar,
  CalendarBody,
  CalendarContent,
  CalendarDays,
} from "chronocal";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Page(): JSX.Element {
  const [activeDay, setActiveDay] = useState<Date>();
  const [events, setEvents] = useState([
    {
      title: "Design review",
      startAt: new Date(),
      endAt: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
    {
      title: "Hockey game",
      startAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      endAt: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
    {
      title: "Soccer game",
      startAt: new Date(),
      endAt: new Date(),
    },
  ]);

  const addEvent = () => {
    setEvents([
      ...events,
      {
        title: "Date night",
        startAt: new Date(2023, 6, 28),
        endAt: new Date(2023, 7, 1),
      },
    ]);
  };

  return (
    <main className="h-screen">
      <Calendar>
        <CalendarContent>
          <CalendarDays />
          <CalendarBody
            events={events}
            eventLimit={2}
            isEventExtendable
            eventProperties={{
              className:
                "bg-red-400 rounded text-white text-start hover:bg-red-200",
              onClick: (event) => alert(event.title),
            }}
            dayContainerProperties={{
              className: "bg-blue-50",
              currentMonthOnly: true,
              differentMonthProperties: {
                className: "bg-yellow-50",
              },
            }}
            todayContainerProperties={{
              className: "bg-purple-50",
            }}
            dayProperties={{
              className: (day) =>
                twMerge(
                  "rounded-full p-0.5 bg-white",
                  activeDay === day.date && "bg-emerald-300"
                ),
              onClick: (day) => setActiveDay(day.date),
            }}
          />
        </CalendarContent>
      </Calendar>
    </main>
  );
}

// events={events}
// eventLimit={2}
// isEventExtendable
// eventProperties={{
//   onClick: (event) => alert(event.title),
//   className: "rounded bg-red-500/50 p-2",
// }}
// dayContainerProperties={{
//   className: "hover:bg-red-50",
//   onClick: (day) => alert(day.date),
//   currentMonthOnly: true,
//   differentMonthProperties: {
//     className: "hover:bg-blue-50",
//   },
// }}
