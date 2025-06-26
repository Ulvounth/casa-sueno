"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  eachDayOfInterval,
  subDays,
  parseISO,
  differenceInDays,
  isWeekend,
} from "date-fns";
import { formatDateSafe } from "@/lib/dateUtils";

export default function BookingForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [busyDates, setBusyDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricing, setPricing] = useState<{
    base_price_per_night: number;
    cleaning_fee: number;
    service_fee_percentage: number;
    weekend_multiplier: number;
    seasonal_rates: Record<string, number>;
  } | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      setIsLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("start_date, end_date");

        if (error) {
          console.error("Error fetching bookings:", error);
          setError(
            "Failed to load booking information. Please refresh the page."
          );
          return;
        }

        const blocked: Date[] = [];

        data?.forEach(({ start_date, end_date }) => {
          const start = parseISO(start_date + "T00:00:00");
          const end = parseISO(end_date + "T00:00:00");
          // Include all days in the booking range (end date is exclusive for guests)
          const range = eachDayOfInterval({ start, end: subDays(end, 1) });
          blocked.push(...range);
        });

        setBusyDates(blocked);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(
          "Failed to load booking information. Please refresh the page."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedDates();
  }, []);

  // Fetch pricing data
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data, error } = await supabase
          .from("property_pricing")
          .select("*")
          .limit(1);

        if (error) {
          console.error("Error fetching pricing:", error);
          return;
        }

        if (data && data.length > 0) {
          setPricing(data[0]);
        }
      } catch (err) {
        console.error("Unexpected error fetching pricing:", err);
      }
    };

    fetchPricing();
  }, []);

  // Calculate total price when dates or guests change
  useEffect(() => {
    if (startDate && endDate && pricing) {
      const nights = differenceInDays(endDate, startDate);
      if (nights <= 0) {
        setTotalPrice(null);
        return;
      }

      let accommodationTotal = 0;

      // Calculate each night individually to apply weekend/seasonal rates
      for (let i = 0; i < nights; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        let nightRate = pricing.base_price_per_night;

        // Apply weekend multiplier
        if (isWeekend(currentDate)) {
          nightRate *= pricing.weekend_multiplier;
        }

        accommodationTotal += nightRate;
      }

      const serviceFee =
        accommodationTotal * (pricing.service_fee_percentage / 100);
      const total = accommodationTotal + pricing.cleaning_fee + serviceFee;

      setTotalPrice(total);
    } else {
      setTotalPrice(null);
    }
  }, [startDate, endDate, guests, pricing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        setError("You must be logged in to book.");
        return;
      }

      if (!startDate || !endDate) {
        setError("Please select both check-in and check-out dates.");
        return;
      }

      // Improved overlap check: Check if any existing booking overlaps with the selected dates
      // A booking overlaps if: start_date < our_end_date AND end_date > our_start_date
      // Use timezone-safe date formatting to avoid off-by-one errors
      const startDateStr = formatDateSafe(startDate);
      const endDateStr = formatDateSafe(endDate);

      const { data: existing, error: overlapError } = await supabase
        .from("bookings")
        .select("id, start_date, end_date")
        .lt("start_date", endDateStr)
        .gt("end_date", startDateStr);

      if (overlapError) {
        setError("Could not check availability. Please try again.");
        return;
      }

      if (existing && existing.length > 0) {
        setError(
          "These dates are already booked. Please select different dates."
        );
        return;
      }

      const { error } = await supabase.from("bookings").insert([
        {
          user_id: session.user.id,
          start_date: startDateStr,
          end_date: endDateStr,
          guests,
        },
      ]);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setStartDate(null);
        setEndDate(null);
        setGuests(1);
        // Refresh the booked dates to update the calendar
        const fetchBookedDates = async () => {
          try {
            const { data, error } = await supabase
              .from("bookings")
              .select("start_date, end_date");

            if (!error && data) {
              const blocked: Date[] = [];
              data.forEach(({ start_date, end_date }) => {
                const start = parseISO(start_date + "T00:00:00");
                const end = parseISO(end_date + "T00:00:00");
                const range = eachDayOfInterval({
                  start,
                  end: subDays(end, 1),
                });
                blocked.push(...range);
              });
              setBusyDates(blocked);
            }
          } catch (err) {
            console.error("Error refreshing dates:", err);
          }
        };
        fetchBookedDates();
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-medium">
        {totalPrice !== null
          ? `€${totalPrice.toFixed(2)} total`
          : "Add dates to see prices"}
      </h3>

      {isLoading && (
        <div className="text-sm text-gray-600 text-center py-2">
          Loading availability...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 rounded overflow-hidden gap-2">
        <div className="p-2 md:border-r border-gray-300">
          <label className="block text-xs font-semibold mb-1">CHECK-IN</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date && endDate < date) setEndDate(null);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDates={busyDates}
            placeholderText="Select check-in date"
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
        </div>
        <div className="p-2">
          <label className="block text-xs font-semibold mb-1">CHECK-OUT</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            excludeDates={busyDates}
            placeholderText="Select check-out date"
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
            disabled={!startDate}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">GUESTS</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Price Breakdown */}
      {startDate && endDate && totalPrice !== null && pricing && (
        <div className="border-t pt-4 space-y-3">
          <h4 className="font-semibold text-gray-900">Price breakdown</h4>

          {(() => {
            const nights = differenceInDays(endDate, startDate);
            let accommodationTotal = 0;

            for (let i = 0; i < nights; i++) {
              const currentDate = new Date(startDate);
              currentDate.setDate(startDate.getDate() + i);
              let nightRate = pricing.base_price_per_night;
              if (isWeekend(currentDate)) {
                nightRate *= pricing.weekend_multiplier;
              }
              accommodationTotal += nightRate;
            }

            const serviceFee =
              accommodationTotal * (pricing.service_fee_percentage / 100);

            return (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    €{pricing.base_price_per_night.toFixed(2)} × {nights} nights
                  </span>
                  <span>€{accommodationTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>€{pricing.cleaning_fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee ({pricing.service_fee_percentage}%)</span>
                  <span>€{serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">
          Booking successfully submitted!
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
      >
        {isSubmitting
          ? "Processing booking..."
          : totalPrice !== null
          ? `Reserve for €${totalPrice.toFixed(2)}`
          : "Check availability"}
      </button>
    </form>
  );
}
