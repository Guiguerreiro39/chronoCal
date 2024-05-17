"use client";

import {
  Calendar,
  CalendarBody,
  CalendarContent,
  CalendarHeader,
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
      title: "Hockey game",
      startAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      endAt: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
    {
      title: "Soccer game",
      startAt: new Date(),
      endAt: new Date(),
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
      <Calendar className="overflow-auto">
        <CalendarContent className="bg-black">
          <CalendarHeader
            className="bg-black border-black"
            headerProperties={{
              className: "bg-pink-200",
              onClick: (day) => alert(day),
            }}
            labelText={[
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
              "Domingo",
            ]}
          />
          <CalendarBody
            events={events}
            eventLimit={2}
            isEventExtendable
            eventProperties={{
              className:
                "bg-red-400 rounded text-white text-start hover:bg-red-200",
              onClick: (event) => alert(event.title),
            }}
            cellContainerProperties={{
              className: "bg-blue-50",
              currentMonthOnly: true,
              differentMonthProperties: {
                className: "bg-yellow-50",
              },
            }}
            nowContainerProperties={{
              className: "bg-purple-50",
            }}
            cellProperties={{
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
