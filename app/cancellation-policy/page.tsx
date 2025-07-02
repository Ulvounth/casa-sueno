// app/cancellation-policy/page.tsx
import {
  CalendarIcon,
  CurrencyEuroIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "../components/FloatingBookingButton";

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">Cancellation Policy</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Understanding our flexible cancellation terms for Casa Sueño
            bookings.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Policy Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Flexible Cancellation Policy
              </h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Free Cancellation Available
              </h3>
              <p className="text-green-700">
                We understand that travel plans can change. Casa Sueño offers
                flexible cancellation with full refund available under certain
                conditions.
              </p>
            </div>
          </div>

          {/* Cancellation Timeframes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Cancellation Timeframes
              </h2>
            </div>

            <div className="space-y-6">
              {/* Full Refund */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Full Refund (100%)
                </h3>
                <div className="text-stone-600 space-y-2">
                  <p>
                    <strong>Cancel 14+ days before check-in:</strong> Full
                    refund including all fees
                  </p>
                  <p>
                    <strong>Timeline:</strong> Refund processed within 5-7
                    business days
                  </p>
                  <p>
                    <strong>Includes:</strong> Accommodation fee, cleaning fee,
                    and service fees
                  </p>
                </div>
              </div>

              {/* Partial Refund */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                  Partial Refund (50%)
                </h3>
                <div className="text-stone-600 space-y-2">
                  <p>
                    <strong>Cancel 7-13 days before check-in:</strong> 50%
                    refund of accommodation fee
                  </p>
                  <p>
                    <strong>Non-refundable:</strong> Cleaning fee (€50) and
                    service fees
                  </p>
                  <p>
                    <strong>Timeline:</strong> Refund processed within 7-10
                    business days
                  </p>
                </div>
              </div>

              {/* No Refund */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  No Refund (0%)
                </h3>
                <div className="text-stone-600 space-y-2">
                  <p>
                    <strong>Cancel within 7 days of check-in:</strong> No refund
                  </p>
                  <p>
                    <strong>No-show:</strong> Full amount charged, no refund
                  </p>
                  <p>
                    <strong>Early departure:</strong> No refund for unused
                    nights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Circumstances */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Special Circumstances
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Exceptional Circumstances
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 mb-3">
                    <strong>Full refund may be considered for:</strong>
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Government-imposed travel restrictions</li>
                    <li>• Natural disasters affecting the area</li>
                    <li>
                      • Serious illness or family emergency (documentation
                      required)
                    </li>
                    <li>• Flight cancellations beyond guest control</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Host Cancellation
                </h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-amber-800 mb-3">
                    <strong>If we need to cancel your booking:</strong>
                  </p>
                  <ul className="space-y-2 text-amber-700">
                    <li>• Full refund within 24 hours</li>
                    <li>• Assistance finding alternative accommodation</li>
                    <li>• Compensation for any additional costs incurred</li>
                    <li>• Priority rebooking when available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                How to Cancel
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">
                  Cancellation Process
                </h3>
                <ol className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong>Contact us immediately</strong> via email
                      (info@casasueno.com) or phone (+34 123 456 789)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong>Provide booking details</strong> including
                      reservation number and guest name
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong>Receive confirmation</strong> of cancellation and
                      refund amount within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong>Refund processed</strong> according to the
                      timeline for your cancellation type
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Important Notes:
                </h4>
                <ul className="space-y-1 text-yellow-700 text-sm">
                  <li>• Cancellations must be received in writing (email)</li>
                  <li>
                    • Refunds will be processed to the original payment method
                  </li>
                  <li>• Processing time may vary depending on your bank</li>
                  <li>• All cancellation requests are final once confirmed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Peak Season Policy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Peak Season Policy
              </h2>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">
                Special Holiday Periods
              </h3>
              <p className="text-orange-700 mb-4">
                Different cancellation terms apply during peak holiday periods:
              </p>
              <div className="space-y-3 text-orange-700">
                <div>
                  <strong>Christmas & New Year (Dec 20 - Jan 5):</strong> 21-day
                  cancellation policy
                </div>
                <div>
                  <strong>Easter Week:</strong> 14-day cancellation policy
                </div>
                <div>
                  <strong>Summer Peak (July 15 - Aug 31):</strong> 21-day
                  cancellation policy
                </div>
              </div>
              <p className="text-orange-700 mt-4 text-sm">
                <em>
                  Peak season bookings require earlier cancellation for full
                  refund.
                </em>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-amber-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Need to Cancel or Have Questions?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> info@casasueno.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +34 123 456 789
                  </p>
                  <p>
                    <strong>Hours:</strong> 9:00 AM - 6:00 PM CET
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Emergency Contact
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>24/7 Emergency:</strong> +34 123 456 789
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> Available
                  </p>
                  <p>
                    <strong>Response Time:</strong> Within 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
