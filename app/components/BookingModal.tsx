// app/components/BookingModal.tsx
"use client";

import { XMarkIcon, CalendarIcon } from "@heroicons/react/24/outline";
import BookingFormWithCalendar from "./BookingFormWithCalendar";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Book Casa Sueño</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold">€85</span>
                <span className="text-gray-600">per night</span>
              </div>
              <p className="text-sm text-gray-600">
                Reserve your perfect Mediterranean getaway
              </p>
            </div>

            <BookingFormWithCalendar />

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>✓ You won&apos;t be charged yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
