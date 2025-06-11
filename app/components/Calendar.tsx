"use client";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

interface CalendarProps {
  year?: number;
  month?: number;
  busyDates?: string[]; // ISO date strings e.g. '2025-06-15'
}

export default function Calendar({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  busyDates = [],
}: CalendarProps) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium">{format(start, "LLLL yyyy")}</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekdays.map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const iso = format(date, "yyyy-MM-dd");
          const isBusy = busyDates.includes(iso);
          return (
            <div
              key={iso}
              className={`py-2 rounded border ${
                isBusy
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
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
