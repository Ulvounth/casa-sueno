// app/privacy/page.tsx
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CogIcon,
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
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Privacy Overview
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>
                Casa Sueño is committed to protecting your privacy and personal
                data. This privacy policy explains how we collect, use, store,
                and protect your information when you use our services.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800">
                  <strong>GDPR Compliant:</strong> We fully comply with the
                  General Data Protection Regulation (GDPR) and Spanish data
                  protection laws.
                </p>
              </div>
              <p className="text-sm text-stone-600">
                <strong>Effective Date:</strong> January 1, 2024
                <br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>
          </div>

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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Personal Information
                </h3>
                <p className="text-stone-600 mb-3">
                  When you make a booking or contact us, we collect:
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Contact Details:</strong> Name, email address,
                    phone number
                  </li>
                  <li>
                    • <strong>Booking Information:</strong> Check-in/out dates,
                    number of guests
                  </li>
                  <li>
                    • <strong>Payment Information:</strong> Credit card details
                    (processed securely by our payment provider)
                  </li>
                  <li>
                    • <strong>Communication Records:</strong> Messages, emails,
                    and support requests
                  </li>
                  <li>
                    • <strong>Identity Verification:</strong> ID document
                    details when required by law
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Automatically Collected Information
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Website Usage:</strong> Pages visited, time spent,
                    click patterns
                  </li>
                  <li>
                    • <strong>Device Information:</strong> IP address, browser
                    type, device type
                  </li>
                  <li>
                    • <strong>Cookies:</strong> See our cookie policy below
                  </li>
                  <li>
                    • <strong>Location Data:</strong> General location based on
                    IP address (not precise location)
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  We DO NOT collect:
                </h4>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Social security numbers or government ID numbers</li>
                  <li>• Health or medical information</li>
                  <li>• Political opinions or religious beliefs</li>
                  <li>• Financial information beyond payment processing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CogIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                How We Use Your Information
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Primary Uses
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Booking Management:</strong> Process and manage
                    your reservations
                  </li>
                  <li>
                    • <strong>Communication:</strong> Send booking
                    confirmations, check-in instructions, and updates
                  </li>
                  <li>
                    • <strong>Customer Support:</strong> Respond to inquiries
                    and resolve issues
                  </li>
                  <li>
                    • <strong>Payment Processing:</strong> Handle payments and
                    refunds securely
                  </li>
                  <li>
                    • <strong>Legal Compliance:</strong> Meet legal requirements
                    and tax obligations
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Secondary Uses (with consent)
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Marketing:</strong> Send promotional offers and
                    newsletters (opt-in only)
                  </li>
                  <li>
                    • <strong>Service Improvement:</strong> Analyze usage to
                    improve our website and services
                  </li>
                  <li>
                    • <strong>Personalization:</strong> Customize your
                    experience based on preferences
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Legal Basis for Processing:
                </h4>
                <ul className="space-y-1 text-amber-700 text-sm">
                  <li>
                    • <strong>Contract Performance:</strong> Processing
                    necessary for booking services
                  </li>
                  <li>
                    • <strong>Legitimate Interest:</strong> Improving services
                    and preventing fraud
                  </li>
                  <li>
                    • <strong>Legal Obligation:</strong> Compliance with tax and
                    tourism regulations
                  </li>
                  <li>
                    • <strong>Consent:</strong> Marketing communications and
                    optional features
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Data Sharing & Third Parties
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  We DO NOT sell your data
                </h3>
                <p className="text-red-700 text-sm">
                  We never sell, rent, or trade your personal information to
                  third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Limited Sharing
                </h3>
                <p className="text-stone-600 mb-3">
                  We only share your information with:
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Payment Processors:</strong> Secure payment
                    handling (Stripe, PayPal)
                  </li>
                  <li>
                    • <strong>Email Service:</strong> Sending booking
                    confirmations and communications
                  </li>
                  <li>
                    • <strong>Government Authorities:</strong> When required by
                    Spanish law (tourist registration)
                  </li>
                  <li>
                    • <strong>Legal Requirements:</strong> Court orders or legal
                    investigations
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Service Providers
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Current third-party services:</strong>
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>
                      • <strong>Supabase:</strong> Database hosting (EU servers)
                    </li>
                    <li>
                      • <strong>Vercel:</strong> Website hosting
                    </li>
                    <li>
                      • <strong>Resend:</strong> Email delivery service
                    </li>
                    <li>
                      • <strong>Stripe:</strong> Payment processing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Data Security & Retention
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Security Measures
                </h3>
                <ul className="space-y-2 text-stone-600">
                  <li>
                    • <strong>Encryption:</strong> All data transmitted using
                    SSL/TLS encryption
                  </li>
                  <li>
                    • <strong>Secure Storage:</strong> Data stored on encrypted,
                    secure servers
                  </li>
                  <li>
                    • <strong>Access Control:</strong> Limited access to
                    authorized personnel only
                  </li>
                  <li>
                    • <strong>Regular Updates:</strong> Security systems updated
                    regularly
                  </li>
                  <li>
                    • <strong>Monitoring:</strong> Continuous monitoring for
                    security threats
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Data Retention
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <ul className="space-y-2 text-blue-700">
                    <li>
                      • <strong>Booking Data:</strong> 7 years (tax and legal
                      requirements)
                    </li>
                    <li>
                      • <strong>Communication Records:</strong> 3 years
                    </li>
                    <li>
                      • <strong>Marketing Preferences:</strong> Until you
                      unsubscribe
                    </li>
                    <li>
                      • <strong>Website Analytics:</strong> 26 months
                      (anonymized)
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Data Deletion
                </h3>
                <p className="text-stone-600">
                  We automatically delete your data when the retention period
                  expires. You can also request deletion at any time (subject to
                  legal requirements).
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Your Privacy Rights
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  Under GDPR, you have the right to:
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>
                    • <strong>Access:</strong> Request a copy of your personal
                    data
                  </li>
                  <li>
                    • <strong>Rectification:</strong> Correct inaccurate or
                    incomplete data
                  </li>
                  <li>
                    • <strong>Erasure:</strong> Request deletion of your data
                    (with limitations)
                  </li>
                  <li>
                    • <strong>Portability:</strong> Receive your data in a
                    machine-readable format
                  </li>
                  <li>
                    • <strong>Restriction:</strong> Limit how we process your
                    data
                  </li>
                  <li>
                    • <strong>Object:</strong> Object to processing based on
                    legitimate interests
                  </li>
                  <li>
                    • <strong>Withdraw Consent:</strong> Remove consent for
                    marketing communications
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  How to Exercise Your Rights
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    To exercise any of these rights, contact us at:
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      • <strong>Email:</strong> privacy@casasueno.com
                    </li>
                    <li>
                      • <strong>Phone:</strong> +34 123 456 789
                    </li>
                    <li>
                      • <strong>Response Time:</strong> Within 30 days
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Complaints
                </h3>
                <p className="text-stone-600">
                  If you&apos;re not satisfied with how we handle your data, you
                  can file a complaint with the Spanish Data Protection Agency
                  (AEPD) or your local data protection authority.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CogIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                Cookies & Tracking
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-stone-600">
                We use cookies and similar technologies to improve your
                experience on our website.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Essential Cookies
                  </h3>
                  <p className="text-stone-600 text-sm mb-2">
                    Required for the website to function properly:
                  </p>
                  <ul className="space-y-1 text-stone-600 text-sm">
                    <li>• Session management</li>
                    <li>• Security features</li>
                    <li>• Form functionality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">
                    Optional Cookies
                  </h3>
                  <p className="text-stone-600 text-sm mb-2">
                    Used with your consent:
                  </p>
                  <ul className="space-y-1 text-stone-600 text-sm">
                    <li>• Analytics (Google Analytics)</li>
                    <li>• Marketing preferences</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  <strong>Cookie Control:</strong> You can manage cookie
                  preferences in your browser settings or through our cookie
                  consent banner when you first visit our site.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-amber-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Privacy Questions?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Data Protection Officer
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@casasueno.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +34 123 456 789
                  </p>
                  <p>
                    <strong>Response Time:</strong> Within 30 days
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Business Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Company:</strong> Casa Sueño Vacation Rentals
                  </p>
                  <p>
                    <strong>Location:</strong> Orihuela, Spain
                  </p>
                  <p>
                    <strong>Registration:</strong> B-12345678
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-amber-500">
              <p className="text-sm opacity-90">
                <strong>Last Updated:</strong> January 1, 2024 • We may update
                this privacy policy to reflect changes in our practices or legal
                requirements. We&apos;ll notify you of significant changes via
                email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingBookingButton />
    </div>
  );
}
