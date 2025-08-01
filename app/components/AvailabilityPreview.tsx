"use client";

import { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../lib/supabase";
import { parseISO, addDays, isSameDay } from "date-fns";
import BookingModal from "./BookingModal";

export default function AvailabilityPreview() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample booked dates (you would get these from your booking system)
  // Replaced with real booking data from Supabase

  // Fetch booked dates from Supabase (same logic as BookingFormWithCalendar)
  const fetchBookedDates = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("start_date, end_date, status")
        .in("status", ["confirmed", "pending"]); // Only fetch confirmed and pending bookings

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      const dates: Date[] = [];
      bookings?.forEach((booking) => {
        const checkin = parseISO(booking.start_date);
        const checkout = parseISO(booking.end_date);

        // Add all dates between checkin and checkout (inclusive of checkin, exclusive of checkout)
        let currentDate = checkin;
        while (currentDate < checkout) {
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
      });

      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const isDateBooked = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return bookedDates.some((bookedDate) => isSameDay(bookedDate, dateToCheck));
  };

  const isDatePast = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dateToCheck < today;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDaysIcon className="h-5 w-5 text-amber-600" />
        <h4 className="font-semibold text-lg">Available dates</h4>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
          <span className="ml-2 text-sm text-gray-600">
            Loading availability...
          </span>
        </div>
      ) : (
        <>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 text-gray-600" />
            </button>
            <h5 className="font-medium text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h5>
            <button
              onClick={() => navigateMonth("next")}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowRightIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Day headers */}
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={`day-header-${index}`}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isBooked = isDateBooked(day);
              const isPast = isDatePast(day);

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center text-xs rounded-md ${
                    isPast
                      ? "text-gray-300 cursor-not-allowed"
                      : isBooked
                        ? "bg-red-100 text-red-800 cursor-not-allowed"
                        : "bg-green-50 text-green-800 hover:bg-green-100 cursor-pointer"
                  }`}
                  title={
                    isPast
                      ? "Past date"
                      : isBooked
                        ? "Not available"
                        : "Available"
                  }
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span>Booked</span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Book Now
          </button>
        </>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
