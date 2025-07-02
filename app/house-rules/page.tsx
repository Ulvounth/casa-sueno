// app/house-rules/page.tsx
import {
  ClockIcon,
  NoSymbolIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SpeakerXMarkIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "../components/FloatingBookingButton";

export default function HouseRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">House Rules</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            To ensure all guests have a wonderful and safe stay at Casa Sueño,
            please review and follow these important house rules.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Check-in/Check-out */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Check-in & Check-out
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Check-in
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Check-in time: 3:00 PM - 8:00 PM</li>
                  <li>• Late check-in (after 8 PM): €20 fee</li>
                  <li>• Self check-in with smart lock</li>
                  <li>• Instructions sent 24 hours before arrival</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Check-out
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Check-out time: 11:00 AM</li>
                  <li>• Late check-out available by request</li>
                  <li>• Please strip beds and start dishwasher</li>
                  <li>• Leave keys in lock box</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Occupancy & Guests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Guests & Occupancy
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Guest Limits
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Maximum 4 guests total</li>
                    <li>• All guests must be registered</li>
                    <li>• No unregistered visitors after 9 PM</li>
                    <li>• Children under 2 don&apos;t count toward limit</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Minimum Stay
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• 2 nights minimum (year-round)</li>
                    <li>• 3 nights minimum during peak season</li>
                    <li>• 5 nights minimum for Christmas/New Year</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <NoSymbolIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">Not Allowed</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No smoking</strong> inside the property
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No pets</strong> allowed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No parties or events</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No loud music</strong> after 10 PM
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No drugs</strong> or illegal substances
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No commercial photography</strong> without
                      permission
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      <strong>No moving furniture</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>
                      <strong>Smoking allowed</strong> on outdoor terrace only
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quiet Hours & Respect */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <SpeakerXMarkIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Quiet Hours & Neighborhood Respect
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Quiet Hours: 10:00 PM - 8:00 AM
                </h3>
                <p className="text-amber-700">
                  Please be respectful of our neighbors and keep noise levels
                  low during quiet hours.
                </p>
              </div>
              <ul className="space-y-2 text-stone-600">
                <li>• No loud conversations on the terrace after 10 PM</li>
                <li>• TV and music at reasonable volume</li>
                <li>• Close windows and doors when playing music</li>
                <li>• Be considerate when arriving late or leaving early</li>
              </ul>
            </div>
          </div>

          {/* Security & Safety */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Security & Safety
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Security
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Always lock doors when leaving</li>
                  <li>• Don&apos;t leave valuables visible</li>
                  <li>• Report any suspicious activity</li>
                  <li>• Use provided safe for valuables</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Safety Equipment
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Smoke detectors installed</li>
                  <li>• Fire extinguisher in kitchen</li>
                  <li>• First aid kit in bathroom cabinet</li>
                  <li>• Emergency numbers provided</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Damages & Fees */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Damages & Additional Fees
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Security Deposit: €200
                </h3>
                <p className="text-yellow-700">
                  Refunded within 7 days if no damages or violations occur.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Additional Fees
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Late check-in (after 8 PM): €20</li>
                    <li>• Extra cleaning (if needed): €50</li>
                    <li>• Lost keys: €25</li>
                    <li>• Tourist tax: €2 per person per night</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Damage Policy
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Report damages immediately</li>
                    <li>• Replacement costs deducted from deposit</li>
                    <li>• Professional cleaning if needed</li>
                    <li>• Smoking inside: €100 fine</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Violations */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Rule Violations
            </h2>
            <p className="text-red-700 mb-4">
              Serious violations of house rules may result in immediate
              termination of stay without refund. This includes but is not
              limited to: unauthorized parties, smoking indoors, exceeding guest
              limits, or disturbing neighbors.
            </p>
            <p className="text-red-700">
              <strong>24/7 Emergency Contact:</strong> +34 123 456 789
            </p>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
