"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm() {
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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

    const { error } = await supabase.from("bookings").insert([
      {
        user_id: session.user.id,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-medium">Add dates to see prices</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 rounded overflow-hidden gap-2">
        <div className="p-2 md:border-r border-gray-300">
          <label className="block text-xs font-semibold mb-1" htmlFor="checkin">
            CHECK-IN
          </label>
          <DatePicker
            id="checkin"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date && endDate < date) setEndDate(null);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Select check-in date"
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
        </div>
        <div className="p-2">
          <label
            className="block text-xs font-semibold mb-1"
            htmlFor="checkout"
          >
            CHECK-OUT
          </label>
          <DatePicker
            id="checkout"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Select check-out date"
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
            disabled={!startDate}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" htmlFor="guests">
          GUESTS
        </label>
        <select
          id="guests"
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

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">
          Booking successfully submitted!
        </p>
      )}

      <button
        type="submit"
        className="
          w-full py-3
          bg-pink-600 hover:bg-pink-700
          text-white font-semibold
          rounded-lg
          transition
        "
      >
        Check availability
      </button>
    </form>
  );
}
