"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Here you could verify the session with your backend if needed
      // For now, we'll just set verified to true
      setVerified(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!sessionId || !verified) {
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
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for your payment. Your booking at Casa Sueño has been
            confirmed and you should receive a confirmation email shortly.
          </p>

          {/* What happens next */}
          <div className="bg-amber-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-amber-800 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                You&apos;ll receive a detailed confirmation email with your
                booking information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                We&apos;ll send you check-in instructions 24-48 hours before
                your arrival
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                If you have any questions, feel free to contact us directly
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
          {sessionId && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Booking reference: CS-{sessionId.slice(-8).toUpperCase()}
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
