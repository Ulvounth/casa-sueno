// app/components/BookingForm.tsx
"use client";

import { useState, useEffect } from "react";

export default function BookingForm() {
  // Hydrer‐guard
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Sjekk tilgjengelighet / hent priser
    console.log({ startDate, endDate, guests });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      {/* Tittel */}
      <h3 className="text-lg font-medium">Legg til datoer for å se priser</h3>

      {/* Dato‐feltene i tabell */}
      <div className="grid grid-cols-2 border border-gray-300 rounded overflow-hidden">
        <div className="p-2 border-r border-gray-300">
          <label className="block text-xs font-semibold mb-1">
            INNSJEKKING
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            placeholder="Legg til dato"
          />
        </div>
        <div className="p-2">
          <label className="block text-xs font-semibold mb-1">UTSJEKKING</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 rounded focus:outline-none"
            placeholder="Legg til dato"
          />
        </div>
      </div>

      {/* Gjester */}
      <div>
        <label className="block text-xs font-semibold mb-1">GJESTER</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "gjest" : "gjester"}
            </option>
          ))}
        </select>
      </div>

      {/* Knapp */}
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
        Undersøk tilgjengelighet
      </button>
    </form>
  );
}
