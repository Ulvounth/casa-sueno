// app/terms/page.tsx
import {
  DocumentTextIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "../components/FloatingBookingButton";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">Terms & Conditions</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Simple and clear terms for your stay at Casa Sueño.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Booking Terms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Booking Terms
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>Minimum age:</strong> 20+ to make a booking
                </li>
                <li>
                  • <strong>Maximum guests:</strong> 5 people
                </li>
                <li>
                  • <strong>Minimum stay:</strong> 3-7 nights (varies by season)
                </li>
                <li>
                  • <strong>Payment:</strong> Full payment required at booking
                  via Stripe
                </li>
                <li>
                  • <strong>Security deposit:</strong> €200 (refunded after
                  stay)
                </li>
                <li>
                  • <strong>Cleaning fee:</strong> €50 (included in total price)
                </li>
              </ul>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Seasonal minimum stays:</strong> Low season: 3 nights,
                  Middle season: 5 nights, High season: 7 nights
                </p>
              </div>
            </div>
          </div>

          {/* Check-in & Check-out */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Check-in & Check-out
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>Check-in:</strong> 3:00 PM - 8:00 PM
                </li>
                <li>
                  • <strong>Check-out:</strong> 11:00 AM
                </li>
                <li>
                  • <strong>Late arrival:</strong> €20 fee after 8:00 PM
                </li>
                <li>
                  • <strong>Key collection:</strong> Instructions sent before
                  arrival
                </li>
              </ul>
            </div>
          </div>

          {/* Responsibility & Damages */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Responsibility & Damages
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • Guests are responsible for any damages to the property
                </li>
                <li>• Security deposit: €200 (refunded after inspection)</li>
                <li>
                  • Additional cleaning fee charged if property left excessively
                  dirty
                </li>
                <li>• Lost keys: €50 replacement fee</li>
              </ul>
            </div>
          </div>

          {/* Cancellation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Cancellation Policy
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>Free cancellation:</strong> Up to 14 days before
                  arrival
                </li>
                <li>
                  • <strong>50% refund:</strong> 7-14 days before arrival
                </li>
                <li>
                  • <strong>No refund:</strong> Less than 7 days before arrival
                </li>
                <li>
                  • Deposit is non-refundable for cancellations within 7 days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
