"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CreditCardIcon } from "@heroicons/react/24/outline";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const paymentRef = searchParams?.get("ref"); // Changed from session_id to ref
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (paymentRef) {
      // Payment reference exists, booking request was successful
      setVerified(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [paymentRef]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!paymentRef || !verified) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Session
          </h1>
          <p className="text-gray-600 mb-6">
            This booking confirmation link is invalid or has expired.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header spacing */}
      <div className="pt-20"></div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Pending Payment Icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <CreditCardIcon className="h-8 w-8 text-blue-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Request Submitted!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for your booking request. We&apos;ve sent payment
            instructions to your email. Please complete the payment within 24
            hours to confirm your reservation.
          </p>

          {/* Payment Instructions */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">
              💳 Payment Instructions
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">1.</span>
                Check your email for detailed payment instructions including our
                Revolut bank details
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">2.</span>
                Transfer the total amount using your payment reference:{" "}
                <strong>{paymentRef}</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">3.</span>
                Complete payment within 24 hours to secure your booking
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">4.</span>
                You&apos;ll receive booking confirmation once payment is
                received
              </li>
            </ul>
          </div>

          {/* What happens after payment */}
          <div className="bg-amber-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-amber-800 mb-3">
              After payment confirmation:
            </h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                You&apos;ll receive a detailed booking confirmation email
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                Check-in instructions will be sent 24-48 hours before arrival
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                Feel free to contact us with any questions
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">
              Need to contact us?
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Email: info@casasueno.com</p>
              <p>Phone: +34 623 545 857</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Session ID for reference */}
          {paymentRef && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Payment reference: {paymentRef}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
