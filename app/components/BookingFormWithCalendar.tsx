"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, isWithinInterval, parseISO } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import { PricingService, PricingBreakdown } from "@/lib/pricing";

export default function BookingFormWithCalendar() {
  const t = useTranslations("booking");
  // No more Stripe.js environment checks needed
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: null as Date | null,
    checkout: null as Date | null,
    guests: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [pricingBreakdown, setPricingBreakdown] =
    useState<PricingBreakdown | null>(null);
  const [minimumStayError, setMinimumStayError] = useState<string>("");

  // Fetch booked dates from Supabase
  const fetchBookedDates = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("start_date, end_date, status")
        .in("status", ["confirmed", "pending"]); // Only fetch confirmed and pending bookings

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      const dates: Date[] = [];
      bookings?.forEach((booking) => {
        const checkin = parseISO(booking.start_date);
        const checkout = parseISO(booking.end_date);

        // Add all dates between checkin and checkout (inclusive of checkin, exclusive of checkout)
        let currentDate = checkin;
        while (currentDate < checkout) {
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
      });

      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  // Check if selected dates overlap with any booked dates
  const hasDateConflict = useCallback(
    (checkin: Date, checkout: Date) => {
      return bookedDates.some((bookedDate) =>
        isWithinInterval(bookedDate, {
          start: checkin,
          end: addDays(checkout, -1),
        })
      );
    },
    [bookedDates]
  );

  // Filter function to prevent selecting dates that would create conflicts
  const filterAvailableDates = (date: Date) => {
    // Don't allow past dates
    if (date < new Date()) {
      return false;
    }

    // If this is a booked date, don't allow it
    if (
      bookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      )
    ) {
      return false;
    }

    // If we have a checkin date selected, prevent selecting checkout dates that would create conflicts
    if (formData.checkin && !formData.checkout) {
      // For checkout selection, check if this would create a conflict
      const potentialCheckout = date;
      if (potentialCheckout <= formData.checkin) {
        return false;
      }

      // Check if this range would include any booked dates
      if (hasDateConflict(formData.checkin, potentialCheckout)) {
        return false;
      }
    }

    return true;
  };

  // Simple overlap check - prevents booking if dates conflict with existing bookings
  const checkBookingOverlap = async (checkin: Date, checkout: Date) => {
    try {
      // Get all confirmed/pending bookings
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("start_date, end_date, status")
        .in("status", ["confirmed", "pending"]);

      if (error || !bookings) return false;

      // Check if our proposed booking overlaps with any existing booking
      for (const booking of bookings) {
        const existingStart = parseISO(booking.start_date);
        const existingEnd = parseISO(booking.end_date);

        // Check for overlap: new booking starts before existing ends AND new booking ends after existing starts
        const overlaps = checkin < existingEnd && checkout > existingStart;

        if (overlaps) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error checking booking overlap:", error);
      return false;
    }
  };

  // Calculate pricing when dates change
  const calculatePricing = useCallback(
    async (checkin: Date, checkout: Date) => {
      try {
        setMinimumStayError("");

        // Validate minimum stay first
        const validation = await PricingService.validateMinimumStay(
          checkin,
          checkout
        );
        if (!validation.isValid) {
          setMinimumStayError(validation.message || "");
          setPricingBreakdown(null);
          return;
        }

        // Calculate pricing breakdown
        const breakdown = await PricingService.calculatePricing(
          checkin,
          checkout
        );
        setPricingBreakdown(breakdown);
      } catch (error) {
        console.error("Error calculating pricing:", error);
        setMinimumStayError("Could not calculate price. Please try again.");
        setPricingBreakdown(null);
      }
    },
    []
  );

  // Update pricing when dates change
  useEffect(() => {
    if (formData.checkin && formData.checkout) {
      calculatePricing(formData.checkin, formData.checkout);
    } else {
      setPricingBreakdown(null);
      setMinimumStayError("");
    }
  }, [formData.checkin, formData.checkout, calculatePricing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.checkin || !formData.checkout) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // Check for minimum stay requirements
    if (minimumStayError) {
      alert(minimumStayError);
      return;
    }

    // Check for date conflicts
    if (hasDateConflict(formData.checkin, formData.checkout)) {
      alert(
        "Some of your selected dates are already booked. Please choose different dates."
      );
      return;
    }

    // Check if booking overlaps with existing bookings
    const hasOverlap = await checkBookingOverlap(
      formData.checkin,
      formData.checkout
    );
    if (hasOverlap) {
      alert(
        "Your selected dates overlap with existing bookings. Please choose different dates."
      );
      return;
    }

    // Ensure we have pricing breakdown
    if (!pricingBreakdown) {
      alert("Could not calculate price. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit booking request (no payment processing)
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkin: format(formData.checkin, "yyyy-MM-dd"),
          checkout: format(formData.checkout, "yyyy-MM-dd"),
          guests: formData.guests,
          message: formData.message,
          nights: pricingBreakdown.nights,
          pricePerNight: pricingBreakdown.averagePricePerNight,
          cleaningFee: pricingBreakdown.cleaningFee,
          subtotal:
            pricingBreakdown.baseTotal - pricingBreakdown.longStayDiscount,
          totalPrice: pricingBreakdown.totalAmount, // No deposit, just total amount
          longStayDiscount: pricingBreakdown.longStayDiscount,
          hasLongStayDiscount: pricingBreakdown.hasLongStayDiscount,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Booking error:", result);
        alert(
          result.error ||
            "There was an error creating your booking request. Please try again."
        );
        return;
      }

      // Redirect to success page with payment instructions
      if (result.success) {
        // Redirect directly to success page with payment reference
        window.location.href = `/booking-success?ref=${result.booking.payment_reference}`;
      } else {
        throw new Error("Booking submission failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        "There was an error processing your booking request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simplified defensive handleChange
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      try {
        const { name, value } = e.target;
        if (name && typeof name === "string") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value || "",
          }));
        }
      } catch (error) {
        console.error("Error in handleChange:", error);
      }
    },
    []
  );

  const handleDateChange = useCallback(
    (date: Date | null, field: "checkin" | "checkout") => {
      try {
        if (!date) {
          setFormData((prev) => ({ ...prev, [field]: null }));
          return;
        }

        // If setting checkin, clear checkout if it would create a conflict
        if (field === "checkin") {
          let newCheckout = formData.checkout;

          // Clear checkout if it's before or same as new checkin
          if (newCheckout && newCheckout <= date) {
            newCheckout = null;
          }

          // Clear checkout if the range would include booked dates
          if (newCheckout && hasDateConflict(date, newCheckout)) {
            newCheckout = null;
          }

          setFormData((prev) => ({
            ...prev,
            [field]: date,
            checkout: newCheckout,
          }));
        } else if (field === "checkout") {
          // For checkout, validate the range
          if (formData.checkin && hasDateConflict(formData.checkin, date)) {
            alert(
              "This date range includes already booked dates. Please select a different checkout date."
            );
            return;
          }

          setFormData((prev) => ({ ...prev, [field]: date }));
        }
      } catch (error) {
        console.error("Error in handleDateChange:", error);
      }
    },
    [formData.checkout, formData.checkin, hasDateConflict]
  );

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">{t("loadingAvailability")}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("bookingConfirmed")}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{t("confirmationMessage")}</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              checkin: null,
              checkout: null,
              guests: 1,
              message: "",
            });
          }}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          {t("makeAnotherBooking")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dates - Compact Layout */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {t("selectDates")}
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t("checkIn")}
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.checkin}
                onChange={(date) => handleDateChange(date, "checkin")}
                selectsStart
                startDate={formData.checkin}
                endDate={formData.checkout}
                minDate={new Date()}
                excludeDates={bookedDates}
                filterDate={filterAvailableDates}
                placeholderText={t("selectDate")}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                calendarClassName="text-sm"
                dayClassName={(date) => {
                  const isBooked = bookedDates.some(
                    (bookedDate) =>
                      bookedDate.toDateString() === date.toDateString()
                  );
                  return isBooked
                    ? "text-red-400 bg-red-50 line-through cursor-not-allowed"
                    : "hover:bg-blue-50";
                }}
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t("checkOut")}
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.checkout}
                onChange={(date) => handleDateChange(date, "checkout")}
                selectsEnd
                startDate={formData.checkin}
                endDate={formData.checkout}
                minDate={
                  formData.checkin
                    ? addDays(formData.checkin, 1)
                    : addDays(new Date(), 1)
                }
                excludeDates={bookedDates}
                filterDate={filterAvailableDates}
                placeholderText={t("selectDate")}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                calendarClassName="text-sm"
                dayClassName={(date) => {
                  const isBooked = bookedDates.some(
                    (bookedDate) =>
                      bookedDate.toDateString() === date.toDateString()
                  );
                  return isBooked
                    ? "text-red-400 bg-red-50 line-through cursor-not-allowed"
                    : "hover:bg-blue-50";
                }}
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {bookedDates.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            <span className="inline-block w-2 h-2 bg-red-100 border border-red-300 rounded mr-1"></span>
            Unavailable dates are marked in red
          </p>
        )}
      </div>

      {/* Guests - Compact */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {t("guests")}
        </label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={1}>1 {t("guest")}</option>
          <option value={2}>2 {t("guests")}</option>
          <option value={3}>3 {t("guests")}</option>
          <option value={4}>4 {t("guests")}</option>
          <option value={5}>5 {t("guests")}</option>
        </select>
      </div>

      {/* Minimum Stay Error */}
      {minimumStayError && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
          <p className="text-sm text-red-800">{minimumStayError}</p>
        </div>
      )}

      {/* Price Summary - Dynamic Breakdown */}
      {pricingBreakdown && (
        <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
          <div className="flex justify-between">
            <span>
              €{pricingBreakdown.averagePricePerNight.toFixed(2)} ×{" "}
              {pricingBreakdown.nights} night
              {pricingBreakdown.nights !== 1 ? "s" : ""}
            </span>
            <span>€{pricingBreakdown.baseTotal.toFixed(2)}</span>
          </div>
          {pricingBreakdown.hasLongStayDiscount && (
            <div className="flex justify-between text-green-600">
              <span>Long stay discount (20%)</span>
              <span>-€{pricingBreakdown.longStayDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>€{pricingBreakdown.cleaningFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Security deposit</span>
            <span>€200.00</span>
          </div>
          <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>€{(pricingBreakdown.totalAmount + 200).toFixed(2)}</span>
          </div>
          {pricingBreakdown.nights >= 28 && (
            <div className="text-xs text-green-600 mt-2">
              🎉 You qualified for a 20% long stay discount!
            </div>
          )}

          <div className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
            💡 Security deposit (€200) is charged with your booking and refunded
            after property inspection
          </div>
        </div>
      )}

      {/* Contact Information - Compact */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {t("contactDetails")}
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t("nameLabel")} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t("yourName")}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t("emailLabel")} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t("yourEmail")}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+32 123 456 789"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Special requests (optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              placeholder="Any special requests..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Updated for Payment */}
      <button
        type="submit"
        disabled={
          isSubmitting ||
          !formData.checkin ||
          !formData.checkout ||
          !formData.name ||
          !formData.email ||
          !!minimumStayError ||
          !pricingBreakdown
        }
        className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {t("form.processing")}
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            {t("proceedToPayment")}
          </>
        )}
      </button>

      {/* Payment info text */}
      <p className="text-xs text-gray-500 text-center">
        {t("paymentInstructions")}
      </p>

      <p className="text-xs text-gray-500 text-center">{t("paymentInfo")}</p>
    </form>
  );
}
