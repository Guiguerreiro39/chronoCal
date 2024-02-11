"use client";

import {
  Calendar,
  CalendarBody,
  CalendarContent,
  CalendarDays,
} from "chronocal";
import { useState } from "react";

export default function Page(): JSX.Element {
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
              onClick: (event) => alert(event?.title),
              className: "rounded bg-red-500/10 p-2",
            }}
          />
        </CalendarContent>
      </Calendar>
    </main>
  );
}
