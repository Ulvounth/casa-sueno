// app/page.tsx
import Hero from "./components/Hero";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";

export default function Page() {
  return (
    <main className="flex flex-col">
      {/* Hero-seksjon */}
      <Hero />

      {/* Availability & Booking */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Availability & Booking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kalender viser ledige/opptatte dager */}
          <div>
            <Calendar />
          </div>

          {/* Booking-skjema */}
          <div>
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  );
}
