// app/components/Calendar.tsx
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
  year?: number;
  month?: number;
  busyDates?: string[]; // ISO-datoer som «2025-06-15»
  onSelectDate?: (iso: string) => void;
}

export default function Calendar({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  busyDates = [],
  onSelectDate,
}: CalendarProps) {
  // State for hvilken måned som vises
  const [current, setCurrent] = useState(new Date(year, month - 1));

  const prevMonth = () => setCurrent((d: Date) => subMonths(d, 1));
  const nextMonth = () => setCurrent((d: Date) => addMonths(d, 1));

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const displayMonth = format(current, "LLLL yyyy");

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {/* Månedsnavigasjon */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Forrige måned"
        >
          ‹
        </button>
        <h3 className="text-lg font-medium">{displayMonth}</h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Neste måned"
        >
          ›
        </button>
      </div>

      {/* Ukedagsoverskrift */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dager i måneden */}
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {monthDays.map((date) => {
          const iso = format(date, "yyyy-MM-dd");
          const isBusy = busyDates.includes(iso);
          return (
            <div
              key={iso}
              onClick={() => onSelectDate?.(iso)}
              className={`
                py-2 rounded border cursor-pointer
                ${
                  isBusy
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
                hover:ring-2 hover:ring-blue-300
              `}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
