"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, isWithinInterval, parseISO } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../lib/supabase";

export default function BookingFormWithCalendar() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: null as Date | null,
    checkout: null as Date | null,
    guests: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch booked dates from Supabase
  const fetchBookedDates = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("start_date, end_date");

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

  // Check if selected dates overlap with any booked dates
  const hasDateConflict = (checkin: Date, checkout: Date) => {
    return bookedDates.some((bookedDate) =>
      isWithinInterval(bookedDate, {
        start: checkin,
        end: addDays(checkout, -1),
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.checkin || !formData.checkout) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // Check for date conflicts
    if (hasDateConflict(formData.checkin, formData.checkout)) {
      alert(
        "Some of your selected dates are already booked. Please choose different dates."
      );
      return;
    }

    setIsSubmitting(true);

    // Calculate number of nights and total price
    const nights = Math.ceil(
      (formData.checkout.getTime() - formData.checkin.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * 85; // €85 per night

    try {
      // Insert booking into Supabase with complete guest information
      const { error } = await supabase.from("bookings").insert({
        start_date: format(formData.checkin, "yyyy-MM-dd"),
        end_date: format(formData.checkout, "yyyy-MM-dd"),
        guests: formData.guests,
        user_id: null, // No authentication system
        guest_name: formData.name,
        guest_email: formData.email,
        guest_phone: formData.phone || null,
        total_price: totalPrice,
        special_requests: formData.message || null,
        status: "confirmed",
      });

      if (error) {
        console.error("Booking error:", error);
        alert("There was an error processing your booking. Please try again.");
        return;
      }

      // Refresh booked dates to show the new booking
      await fetchBookedDates();

      setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error processing your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (
    date: Date | null,
    field: "checkin" | "checkout"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading availability...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Your dates have been confirmed. You&apos;ll receive an email shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              checkin: null,
              checkout: null,
              guests: 1,
              message: "",
            });
          }}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Make another booking
        </button>
      </div>
    );
  }

  // Calculate total if dates are selected
  const nights =
    formData.checkin && formData.checkout
      ? Math.ceil(
          (formData.checkout.getTime() - formData.checkin.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalPrice = nights > 0 ? nights * 85 : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dates - Compact Layout */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 text-sm">Select Dates</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.checkin}
                onChange={(date) => handleDateChange(date, "checkin")}
                selectsStart
                startDate={formData.checkin}
                endDate={formData.checkout}
                minDate={new Date()}
                excludeDates={bookedDates}
                placeholderText="Select date"
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                calendarClassName="text-sm"
                dayClassName={(date) => {
                  const isBooked = bookedDates.some(
                    (bookedDate) =>
                      bookedDate.toDateString() === date.toDateString()
                  );
                  return isBooked
                    ? "text-red-400 bg-red-50 line-through cursor-not-allowed"
                    : "hover:bg-blue-50";
                }}
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.checkout}
                onChange={(date) => handleDateChange(date, "checkout")}
                selectsEnd
                startDate={formData.checkin}
                endDate={formData.checkout}
                minDate={
                  formData.checkin
                    ? addDays(formData.checkin, 1)
                    : addDays(new Date(), 1)
                }
                excludeDates={bookedDates}
                placeholderText="Select date"
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                calendarClassName="text-sm"
                dayClassName={(date) => {
                  const isBooked = bookedDates.some(
                    (bookedDate) =>
                      bookedDate.toDateString() === date.toDateString()
                  );
                  return isBooked
                    ? "text-red-400 bg-red-50 line-through cursor-not-allowed"
                    : "hover:bg-blue-50";
                }}
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {bookedDates.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            <span className="inline-block w-2 h-2 bg-red-100 border border-red-300 rounded mr-1"></span>
            Unavailable dates are marked in red
          </p>
        )}
      </div>

      {/* Guests - Compact */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Guests
        </label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
        </select>
      </div>

      {/* Price Summary - More Compact */}
      {totalPrice > 0 && (
        <div className="bg-gray-50 p-3 rounded-md text-sm">
          <div className="flex justify-between">
            <span>
              €85 × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span className="font-semibold">€{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Contact Information - Compact */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          Contact Details
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+32 123 456 789"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Special requests (optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              placeholder="Any special requests..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Compact */}
      <button
        type="submit"
        disabled={
          isSubmitting ||
          !formData.checkin ||
          !formData.checkout ||
          !formData.name ||
          !formData.email
        }
        className="w-full bg-amber-600 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Processing..." : "Request Booking"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Free cancellation • No upfront payment
      </p>
    </form>
  );
}
