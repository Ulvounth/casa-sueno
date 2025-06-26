"use client";

import { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  subDays,
  parseISO,
  startOfWeek,
  endOfWeek,
  isBefore,
  startOfDay,
} from "date-fns";
import { supabase } from "@/lib/supabaseClient";
import { formatDateSafe } from "@/lib/dateUtils";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const prevMonth = () => setCurrent((d: Date) => subMonths(d, 1));
  const nextMonth = () => setCurrent((d: Date) => addMonths(d, 1));

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);

  // Get the start of the week for the first day of the month
  const calendarStart = startOfWeek(monthStart);
  // Get the end of the week for the last day of the month
  const calendarEnd = endOfWeek(monthEnd);

  // Get all days to display in the calendar grid (including leading/trailing days)
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const displayMonth = format(current, "LLLL yyyy");
  const today = startOfDay(new Date());

  useEffect(() => {
    const fetchBookedDates = async () => {
      setIsLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("start_date, end_date");

        if (error) {
          console.error("Failed to fetch bookings:", error.message);
          setError("Failed to load booking information");
          return;
        }

        const allBusyDates: string[] = [];

        data?.forEach(({ start_date, end_date }) => {
          const start = parseISO(start_date + "T00:00:00");
          const end = parseISO(end_date + "T00:00:00");

          const days = eachDayOfInterval({ start, end: subDays(end, 1) });
          days.forEach((date) => {
            allBusyDates.push(formatDateSafe(date));
          });
        });

        setBusyDates(allBusyDates);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load booking information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedDates();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          ‹
        </button>
        <h3 className="text-lg font-medium">{displayMonth}</h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {isLoading && (
        <div className="text-center text-gray-600 mb-4">
          Loading calendar...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 mb-4 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((date) => {
          const iso = formatDateSafe(date);

          const isBusy = busyDates.includes(iso);
          const isPastDate = isBefore(startOfDay(date), today);
          const isCurrentMonth = monthDays.some(
            (monthDay) => formatDateSafe(monthDay) === iso
          );
          const isSelectable = !isBusy && !isPastDate && isCurrentMonth;

          return (
            <div
              key={iso}
              onClick={() => isSelectable && onSelectDate?.(iso)}
              className={`
                py-2 px-1 rounded border cursor-pointer transition-all text-sm min-h-[2.5rem] flex items-center justify-center
                ${
                  !isCurrentMonth
                    ? "text-gray-300 bg-gray-50 border-gray-100 cursor-default"
                    : isPastDate
                    ? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                    : isBusy
                    ? "bg-red-100 text-red-800 border-red-200 cursor-not-allowed line-through"
                    : "bg-green-100 text-green-800 border-green-200 hover:ring-2 hover:ring-blue-300 hover:bg-green-200"
                }
              `}
              role="button"
              tabIndex={isSelectable ? 0 : -1}
              aria-label={`${format(date, "MMMM d, yyyy")} ${
                isBusy ? "(booked)" : isPastDate ? "(past date)" : "(available)"
              }`}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isSelectable) {
                  e.preventDefault();
                  onSelectDate?.(iso);
                }
              }}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
          <span>Past/Other month</span>
        </div>
      </div>
    </div>
  );
}
