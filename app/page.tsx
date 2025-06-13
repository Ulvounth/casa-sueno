// app/page.tsx
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <Hero />

      {/* About This Home + Booking */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* VENSTRE: About This Home */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold">About This Home</h2>
            <p className="text-gray-700 leading-relaxed">
              This bright, airy villa in Granada sleeps 2 guests in 1 bedroom
              with 1 bath. Perfect for a romantic getaway or a quiet retreat
              close to all the sights and flavors of Andalusia.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                <span>
                  Entire place – You’ll have the villa all to yourself.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                <span>Self check-in with smart lock.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                <span>
                  Air conditioning & ceiling fan for a comfortable stay.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                <span>
                  Walkable neighborhood with restaurants & shops nearby.
                </span>
              </li>
            </ul>
          </div>

          {/* HØYRE: Booking Card, overlap hero */}
          <div className="md:w-1/2 relative z-10 -mt-32 md:-mt-48">
            <div className="bg-gray-50 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                Check Availability & Book Your Stay
              </h2>
              {/* BookingForm tar nå full bredde i boksen */}
              <div className="w-full">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
