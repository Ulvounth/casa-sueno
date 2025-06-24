"use client";

import { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { supabase } from "@/lib/supabaseClient";

interface CalendarProps {
  year?: number;
  month?: number;
  onSelectDate?: (iso: string) => void;
}

export default function Calendar({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  onSelectDate,
}: CalendarProps) {
  const [current, setCurrent] = useState(new Date(year, month - 1));
  const [busyDates, setBusyDates] = useState<string[]>([]);

  const prevMonth = () => setCurrent((d: Date) => subMonths(d, 1));
  const nextMonth = () => setCurrent((d: Date) => addMonths(d, 1));

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const displayMonth = format(current, "LLLL yyyy");

  useEffect(() => {
    const fetchBookedDates = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("start_date, end_date");

      if (error) {
        console.error("Failed to fetch bookings:", error.message);
        return;
      }

      const allBusyDates: string[] = [];

      data?.forEach(({ start_date, end_date }) => {
        const start = new Date(start_date);
        const end = new Date(end_date);

        const days = eachDayOfInterval({ start, end });
        days.forEach((date) => {
          allBusyDates.push(date.toISOString().split("T")[0]);
        });
      });

      setBusyDates(allBusyDates);
    };

    fetchBookedDates();
  }, []);

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

      {/* Ukedager */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dager */}
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {monthDays.map((date) => {
          const iso = date.toISOString().split("T")[0];
          const isBusy = busyDates.includes(iso);

          return (
            <div
              key={iso}
              onClick={() => !isBusy && onSelectDate?.(iso)}
              className={`py-2 rounded border cursor-pointer transition ${
                isBusy
                  ? "bg-red-100 text-red-800 border-red-200 cursor-not-allowed line-through"
                  : "bg-green-100 text-green-800 border-green-200 hover:ring-2 hover:ring-blue-300"
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
