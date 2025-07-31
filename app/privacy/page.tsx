// app/privacy/page.tsx
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "../components/FloatingBookingButton";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">Privacy Policy</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            How we handle your personal information at Casa Sueño.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Information We Collect */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>When you book or contact us, we collect:</p>
              <ul className="space-y-3">
                <li>
                  • <strong>Contact details:</strong> Name, email, phone number
                </li>
                <li>
                  • <strong>Booking info:</strong> Dates, number of guests
                </li>
                <li>
                  • <strong>Payment info:</strong> Processed securely by our
                  payment provider
                </li>
                <li>
                  • <strong>Messages:</strong> Any communication with us
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>We use your information to:</p>
              <ul className="space-y-3">
                <li>• Process your booking and payments</li>
                <li>• Communicate about your stay</li>
                <li>• Send check-in instructions and important updates</li>
                <li>• Respond to your questions and requests</li>
                <li>• Improve our services</li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Information Sharing
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold mb-2">
                  We DO NOT sell or share your personal information with third
                  parties.
                </p>
                <p className="text-green-700">
                  Your information is only shared with trusted service providers
                  (like payment processors) who help us provide our services,
                  and only when necessary.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">Your Rights</h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>You have the right to:</p>
              <ul className="space-y-3">
                <li>• Request a copy of your personal information</li>
                <li>• Correct any inaccurate information</li>
                <li>• Request deletion of your information</li>
                <li>• Withdraw consent for marketing communications</li>
              </ul>
              <p className="mt-4">
                <strong>Contact us:</strong> contact@andreasulvund.no to
                exercise these rights.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
