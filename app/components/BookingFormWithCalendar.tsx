"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, isWithinInterval, parseISO } from "date-fns";
import { supabase } from "../../lib/supabase";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

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
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading availability...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-gray-600 mb-4">
          Thank you for your booking! Your dates have been confirmed and you
          will receive a confirmation email shortly.
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
          className="text-blue-600 hover:text-blue-700 font-medium"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Calendar Section */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Select Your Dates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date
            </label>
            <DatePicker
              selected={formData.checkin}
              onChange={(date) => handleDateChange(date, "checkin")}
              selectsStart
              startDate={formData.checkin}
              endDate={formData.checkout}
              minDate={new Date()}
              excludeDates={bookedDates}
              placeholderText="Select check-in date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              calendarClassName="bg-white border border-gray-200 rounded-lg shadow-lg"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out Date
            </label>
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
              placeholderText="Select check-out date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              calendarClassName="bg-white border border-gray-200 rounded-lg shadow-lg"
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
          </div>
        </div>

        {bookedDates.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            <span className="inline-block w-3 h-3 bg-red-50 border border-red-200 rounded mr-1"></span>
            Red dates are already booked
          </p>
        )}
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Guests
        </label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
        </select>
      </div>

      {/* Price Summary */}
      {totalPrice > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>
              €85 × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span>€{totalPrice}</span>
          </div>
          <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+32 123 456 789"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Any special requests or questions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isSubmitting ||
          !formData.checkin ||
          !formData.checkout ||
          !formData.name ||
          !formData.email
        }
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Processing Booking..." : "Confirm Booking"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your booking will be confirmed immediately. Payment instructions will be
        sent via email.
      </p>
    </form>
  );
}
