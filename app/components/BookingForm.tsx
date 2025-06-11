// app/components/BookingForm.tsx
"use client";

import { useState } from "react";

export default function BookingForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    console.log({ startDate, endDate, fullName, email });
    alert("Booking request submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
    >
      {/* Start Date */}
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium mb-1">
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          required
          defaultValue={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium mb-1">
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          required
          defaultValue={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="full-name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          required
          placeholder="Your name"
          defaultValue={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Submit Booking Request
      </button>
    </form>
  );
}
