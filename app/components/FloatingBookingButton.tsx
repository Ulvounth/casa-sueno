// app/components/FloatingBookingButton.tsx
"use client";

import { useState } from "react";
import { CalendarIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import BookingModal from "./BookingModal";

export default function FloatingBookingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenModal}
          className="
            flex items-center gap-2
            bg-amber-600 hover:bg-amber-700 
            text-white font-semibold
            px-4 py-3 rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-200
            hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
            cursor-pointer
          "
        >
          <CalendarIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Book Now</span>
          <span className="sm:hidden">Book</span>
          <ChevronUpIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Modal */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
