// app/house-rules/page.tsx
import {
  ClockIcon,
  NoSymbolIcon,
  UserGroupIcon,
  ShieldCheckIcon,
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
            Simple rules to ensure everyone has a great stay at Casa Sueño.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
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
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>Check-in:</strong> 3:00 PM - 8:00 PM
                </li>
                <li>
                  • <strong>Check-out:</strong> 11:00 AM
                </li>
                <li>
                  • <strong>Late arrival:</strong> Contact us in advance (€20
                  fee after 8 PM)
                </li>
                <li>
                  • <strong>Early departure:</strong> Let us know, no refund for
                  unused nights
                </li>
              </ul>
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <NoSymbolIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Important Rules
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">
                    Not Allowed:
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• No smoking inside the house (outdoor OK)</li>
                    <li>• No parties or loud gatherings</li>
                    <li>• No pets allowed</li>
                    <li>• No additional guests beyond booking</li>
                    <li>
                      • Primary booker must be 18+ (families with children
                      welcome)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Please Do:
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Keep noise levels low after 22:00 (10 PM)</li>
                    <li>• Quiet hours: 22:00 - 08:00</li>
                    <li>• Treat the property with respect</li>
                    <li>• Clean up after yourself</li>
                    <li>• Lock doors when leaving</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Guests & Occupancy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Guests & Visitors
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>Maximum occupancy:</strong> 5 guests
                </li>
                <li>
                  • <strong>Visitors:</strong> Day visitors allowed until 22:00
                </li>
                <li>
                  • <strong>Additional guests:</strong> Must be approved and may
                  incur extra charges
                </li>
                <li>
                  • <strong>Age requirement:</strong> Primary booker must be
                  18+, families with children of all ages are welcome
                </li>
              </ul>
            </div>
          </div>

          {/* Safety & Security */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Safety & Security
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>• Emergency contact information provided upon check-in</li>
                <li>• Fire extinguisher and first aid kit available</li>
                <li>• Please report any damages or issues immediately</li>
                <li>• Lost or damaged keys: €50 replacement fee</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-blue-800">
                  <strong>Emergency:</strong> For urgent issues, call local
                  emergency services (112) or contact us at +34 623 545 857 via
                  WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
