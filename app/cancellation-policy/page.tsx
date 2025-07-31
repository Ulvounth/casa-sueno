// app/cancellation-policy/page.tsx
import {
  CalendarIcon,
  CurrencyEuroIcon,
  ClockIcon,
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
            Our flexible cancellation terms for Casa Sueño bookings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Cancellation Timeline */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Cancellation Timeline
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    14+ Days Before
                  </h3>
                  <p className="text-green-700">
                    <strong>100% Refund</strong>
                    <br />
                    Free cancellation with full refund
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    7-13 Days Before
                  </h3>
                  <p className="text-yellow-700">
                    <strong>50% Refund</strong>
                    <br />
                    Partial refund of total amount
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Less than 7 Days
                  </h3>
                  <p className="text-red-700">
                    <strong>No Refund</strong>
                    <br />
                    Full payment is non-refundable
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                How to Cancel
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ol className="space-y-3">
                <li>
                  <strong>1.</strong> Contact us as soon as possible via email
                  or phone
                </li>
                <li>
                  <strong>2.</strong> Provide your booking reference number
                </li>
                <li>
                  <strong>3.</strong> We&apos;ll confirm your cancellation and
                  refund amount
                </li>
                <li>
                  <strong>4.</strong> Refunds are processed within 5-10 business
                  days
                </li>
              </ol>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-blue-800">
                  <strong>Contact:</strong> contact@andreasulvund.no or +47 123
                  456 789
                </p>
              </div>
            </div>
          </div>

          {/* Special Circumstances */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Special Circumstances
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    Emergency Situations
                  </h3>
                  <p>
                    In case of documented medical emergencies, natural
                    disasters, or other extraordinary circumstances, we may
                    offer more flexible cancellation terms. Contact us to
                    discuss your situation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    Host Cancellation
                  </h3>
                  <p>
                    If we need to cancel your booking due to property issues or
                    other unforeseen circumstances, you will receive a full
                    refund plus assistance finding alternative accommodation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    Modification vs. Cancellation
                  </h3>
                  <p>
                    Want to change your dates instead of cancelling? Contact us
                    - we may be able to modify your booking without cancellation
                    fees, subject to availability.
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
