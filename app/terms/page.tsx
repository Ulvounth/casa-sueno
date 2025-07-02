// app/terms/page.tsx
import {
  DocumentTextIcon,
  ScaleIcon,
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
            Please read these terms carefully before booking your stay at Casa
            Sueño.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Agreement */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Booking Agreement
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>
                By making a reservation at Casa Sueño, you agree to these terms
                and conditions. This agreement is between you (the guest) and
                Casa Sueño property management.
              </p>
              <p>
                <strong>Effective Date:</strong> January 1, 2024
                <br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>
          </div>

          {/* Booking Terms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Booking & Payment Terms
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Reservation Requirements
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Guests must be 18+ years old to make a reservation</li>
                  <li>• All guest information must be accurate and complete</li>
                  <li>• Maximum occupancy: 4 guests (strictly enforced)</li>
                  <li>
                    • Minimum stay: 2 nights (3 nights during peak season)
                  </li>
                  <li>• Valid ID required upon check-in</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Payment Terms
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• 30% deposit required at booking confirmation</li>
                  <li>• Remaining balance due 30 days before check-in</li>
                  <li>• Late payment may result in booking cancellation</li>
                  <li>• All prices are in Euros (EUR) including VAT</li>
                  <li>
                    • Tourist tax (€2 per person per night) paid on arrival
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Fees & Charges
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Cleaning fee: €50 (included in total price)</li>
                  <li>• Security deposit: €200 (refundable)</li>
                  <li>• Late check-in (after 8 PM): €20</li>
                  <li>• Extra cleaning (if required): €50</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guest Responsibilities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Guest Responsibilities
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Property Care
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Treat the property with respect and care</li>
                  <li>• Report any damages or issues immediately</li>
                  <li>• Follow all house rules and local regulations</li>
                  <li>• Keep the property secure (lock doors/windows)</li>
                  <li>• Dispose of garbage properly</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Behavior & Conduct
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Respect neighbors and quiet hours (10 PM - 8 AM)</li>
                  <li>• No smoking inside the property</li>
                  <li>• No parties, events, or gatherings</li>
                  <li>• Comply with local laws and regulations</li>
                  <li>• Be courteous to neighbors and local community</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Check-in & Check-out
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Check-in: 3:00 PM - 8:00 PM</li>
                  <li>• Check-out: 11:00 AM sharp</li>
                  <li>• Late arrivals must be arranged in advance</li>
                  <li>• Leave the property in reasonable condition</li>
                  <li>• Strip beds and start dishwasher before departure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Liability & Insurance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ScaleIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Liability & Insurance
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Guest Liability
                </h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 mb-3">
                    <strong>Important:</strong> Guests are liable for:
                  </p>
                  <ul className="space-y-2 text-red-700">
                    <li>• Any damages to the property or its contents</li>
                    <li>• Additional cleaning costs if required</li>
                    <li>• Replacement of lost or stolen items</li>
                    <li>• Costs arising from rule violations</li>
                    <li>• Any legal consequences of guest actions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Host Liability Limitations
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Casa Sueño and its owners are NOT liable for:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personal injury or accidents on the property</li>
                    <li>• Loss or theft of personal belongings</li>
                    <li>• Inconvenience due to maintenance or utilities</li>
                    <li>• Weather-related issues or natural disasters</li>
                    <li>• Changes in local events or attractions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Insurance Recommendations
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 mb-3">
                    <strong>We strongly recommend:</strong>
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Travel insurance for trip protection</li>
                    <li>• Personal liability insurance</li>
                    <li>• Coverage for personal belongings</li>
                    <li>• Medical insurance for international travel</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Privacy & Data Protection
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Data Collection
                </h3>
                <p className="text-stone-600 mb-3">
                  We collect and store the following information:
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li>• Name, email, phone number, and address</li>
                  <li>• Payment information (processed securely)</li>
                  <li>• Check-in/check-out dates and guest count</li>
                  <li>• Communication records for support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Data Usage
                </h3>
                <p className="text-stone-600 mb-3">
                  Your data is used only for:
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li>• Processing and managing your reservation</li>
                  <li>• Communication regarding your stay</li>
                  <li>• Legal compliance and safety requirements</li>
                  <li>• Improving our services (anonymized data)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800">
                  <strong>Data Protection:</strong> We comply with GDPR and
                  Spanish data protection laws. Your information is never shared
                  with third parties except as required by law.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation & Modifications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Modifications & Cancellations
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Booking Modifications
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • Date changes subject to availability and price differences
                  </li>
                  <li>• Guest count changes must be approved in advance</li>
                  <li>
                    • Modifications must be requested at least 7 days in advance
                  </li>
                  <li>• Changes may incur additional fees</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Cancellation Rights
                </h3>
                <p className="text-stone-600 mb-3">
                  See our{" "}
                  <a
                    href="/cancellation-policy"
                    className="text-amber-600 hover:text-amber-700 underline"
                  >
                    Cancellation Policy
                  </a>{" "}
                  for detailed terms. Summary:
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li>• 14+ days: Full refund</li>
                  <li>• 7-13 days: 50% refund</li>
                  <li>• Under 7 days: No refund</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ScaleIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Dispute Resolution
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Governing Law
                </h3>
                <p className="text-stone-600">
                  These terms are governed by Spanish law. The courts of
                  Alicante, Spain have exclusive jurisdiction over any disputes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Resolution Process
                </h3>
                <ol className="space-y-2 text-stone-600">
                  <li>1. Contact us directly to resolve any issues</li>
                  <li>
                    2. Mediation through local tourism authorities if needed
                  </li>
                  <li>3. Legal proceedings as a last resort</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Force Majeure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Force Majeure
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-stone-600">
                Neither party is liable for failure to perform due to
                circumstances beyond reasonable control, including:
              </p>
              <ul className="space-y-2 text-stone-600">
                <li>• Natural disasters (earthquakes, floods, storms)</li>
                <li>• Government actions or travel restrictions</li>
                <li>• Public health emergencies</li>
                <li>• Strikes or labor disputes</li>
                <li>• Infrastructure failures (power, internet, water)</li>
              </ul>
              <p className="text-stone-600 mt-4">
                In such cases, we will work together to find a fair solution,
                which may include rescheduling or refunding your booking.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-amber-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Questions About These Terms?
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
                    <strong>Address:</strong> Casa Sueño, Orihuela, Spain
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Legal Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Business License:</strong> VT-123456-A
                  </p>
                  <p>
                    <strong>VAT Number:</strong> ESB12345678
                  </p>
                  <p>
                    <strong>Tourism Registration:</strong> AT-123456-A
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-amber-500">
              <p className="text-sm opacity-90">
                <strong>Last Updated:</strong> January 1, 2024 •
                <strong> Effective:</strong> January 1, 2024 • We reserve the
                right to update these terms with 30 days notice.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
