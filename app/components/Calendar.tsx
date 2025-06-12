"use client";

import { useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";

interface CalendarProps {
  busyDates?: string[]; // ISO date strings e.g. '2025-06-15'
}

export default function Calendar({ busyDates = [] }: CalendarProps) {
  // State for current month being viewed
  const [current, setCurrent] = useState(new Date());
  const start = startOfMonth(current);
  const end = endOfMonth(current);
  const days = eachDayOfInterval({ start, end });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Handlers for prev/next month
  const prevMonth = () => setCurrent((d) => subMonths(d, 1));
  const nextMonth = () => setCurrent((d) => addMonths(d, 1));

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Forrige måned"
        >
          ‹
        </button>
        <h3 className="text-lg font-medium">{format(current, "LLLL yyyy")}</h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Neste måned"
        >
          ›
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {days.map((date) => {
          const iso = format(date, "yyyy-MM-dd");
          const isBusy = busyDates.includes(iso);
          return (
            <div
              key={iso}
              className={`py-2 rounded border ${
                isBusy
                  ? "bg-red-100 text-red-800 border-red-200"
                  : "bg-green-100 text-green-800 border-green-200"
              }`}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
