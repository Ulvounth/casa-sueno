"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { format, parseISO } from "date-fns";
import {
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CurrencyEuroIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TrashIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import AdminLogin from "@/app/components/AdminLogin";
import ErrorBoundary from "@/app/components/ErrorBoundary";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  guests: number;
  total_price?: number;
  special_requests?: string;
  status: "pending" | "confirmed" | "cancelled";
  booking_status?: "pending" | "paid" | "expired"; // Payment status
  payment_reference?: string; // Payment reference for bank transfer
  booking_expires_at?: string; // When booking expires if not paid
  created_at: string;
}

export default function AdminPageWrapper() {
  return (
    <ErrorBoundary>
      <AdminPanel />
    </ErrorBoundary>
  );
}

function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "pending" | "cancelled"
  >("all");
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/verify");
        const data = await response.json();

        if (data.authenticated && data.admin) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchBookings().finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setLoading(true);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Logout locally even if server request fails
      setIsAuthenticated(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }
    return <AdminLogin onLogin={handleLogin} />;
  }

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: "confirmed" | "cancelled"
  ) => {
    try {
      // Update without trying to select the result (RLS issue)
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) {
        console.error("Error updating booking:", error);
        alert("Error updating booking: " + error.message);
        return;
      }

      // Refresh bookings to get updated data
      await fetchBookings();
      alert(`Booking ${newStatus === "confirmed" ? "confirmed" : "cancelled"}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating booking");
    }
  };

  const markAsPaid = async (bookingId: string) => {
    if (
      !confirm(
        "Mark this booking as paid? This will confirm the payment has been received and send a confirmation email to the guest."
      )
    ) {
      return;
    }

    try {
      // Update booking status
      const { error } = await supabase
        .from("bookings")
        .update({
          booking_status: "paid",
          status: "confirmed", // Also confirm the booking
        })
        .eq("id", bookingId);

      if (error) {
        console.error("Error marking as paid:", error);
        alert("Error marking booking as paid: " + error.message);
        return;
      }

      // Send confirmation email to guest
      try {
        const emailResponse = await fetch("/api/booking/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });

        if (!emailResponse.ok) {
          console.warn(
            "Failed to send confirmation email, but booking was marked as paid"
          );
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Continue even if email fails
      }

      // Refresh bookings to get updated data
      await fetchBookings();
      alert("Booking marked as paid and confirmation email sent to guest!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error marking booking as paid");
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking");
        return;
      }

      await fetchBookings();
      setSelectedBooking(null);
      alert("Booking deleted");
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting booking");
    }
  };

  const filteredBookings = bookings.filter(
    (booking) => statusFilter === "all" || booking.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "cancelled":
        return <XCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "pending":
        return <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />;
      default:
        return <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  const getPaymentStatusColor = (bookingStatus?: string) => {
    switch (bookingStatus) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed with high z-index to override main site header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-6 gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                Casa Sueño Admin
              </h1>
              <p className="mt-1 text-xs sm:text-base text-gray-600">
                Manage bookings and availability
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="bg-amber-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm font-medium text-amber-800">
                  Total {bookings.length} bookings
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ml-auto sm:ml-0"
                title="Log out"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with top padding to account for fixed header */}
      <div className="pt-40 sm:pt-36">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Filter bookings
            </h2>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
              {[
                { key: "all", label: "All", count: bookings.length },
                {
                  key: "confirmed",
                  label: "Confirmed",
                  count: bookings.filter((b) => b.status === "confirmed")
                    .length,
                },
                {
                  key: "pending",
                  label: "Pending",
                  count: bookings.filter((b) => b.status === "pending").length,
                },
                {
                  key: "cancelled",
                  label: "Cancelled",
                  count: bookings.filter((b) => b.status === "cancelled")
                    .length,
                },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() =>
                    setStatusFilter(
                      filter.key as
                        | "all"
                        | "confirmed"
                        | "pending"
                        | "cancelled"
                    )
                  }
                  className={`px-2 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                    statusFilter === filter.key
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="block sm:hidden">{filter.label}</span>
                  <span className="hidden sm:block">
                    {filter.label} ({filter.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-12 text-center">
              <CalendarIcon className="h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-2">
                No bookings
              </h3>
              <p className="text-xs sm:text-base text-gray-600">
                {statusFilter === "all"
                  ? "There are no bookings to show."
                  : `No bookings with status "${statusFilter}".`}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="p-3 sm:p-6">
                    {/* Status and Actions */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div
                        className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="hidden sm:inline">
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : booking.status === "cancelled"
                              ? "Cancelled"
                              : "Pending"}
                        </span>
                        <span className="sm:hidden">
                          {booking.status === "confirmed"
                            ? "OK"
                            : booking.status === "cancelled"
                              ? "X"
                              : "?"}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>

                    {/* Booking Reference */}
                    <div className="bg-amber-50 p-2 rounded-lg mb-3 border border-amber-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-800 font-bold">
                          {booking.payment_reference ||
                            `CS-${booking.id.slice(-8).toUpperCase()}`}
                        </span>
                        <span className="text-xs text-amber-600">
                          {format(
                            parseISO(booking.created_at),
                            "dd.MM.yy HH:mm"
                          )}
                        </span>
                      </div>
                      {booking.booking_status && (
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.booking_status)}`}
                          >
                            💳{" "}
                            {booking.booking_status === "paid"
                              ? "Paid"
                              : booking.booking_status === "expired"
                                ? "Expired"
                                : "Payment Pending"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Guest Info */}
                    <div className="space-y-2 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-900 text-xs sm:text-base truncate">
                          {booking.guest_name}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <EnvelopeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-600 break-all">
                          {booking.guest_email}
                        </span>
                      </div>
                      {booking.guest_phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600">
                            {booking.guest_phone}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          Stay
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        <div>
                          Check-in:{" "}
                          {format(parseISO(booking.start_date), "dd.MM.yyyy")}
                        </div>
                        <div>
                          Check-out:{" "}
                          {format(parseISO(booking.end_date), "dd.MM.yyyy")}
                        </div>
                        <div className="mt-1 font-medium">
                          {calculateNights(
                            booking.start_date,
                            booking.end_date
                          )}{" "}
                          nights • {booking.guests} guests
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    {booking.total_price && (
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <CurrencyEuroIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                        <span className="font-semibold text-green-600 text-sm sm:text-base">
                          €{booking.total_price}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {booking.booking_status === "pending" && (
                        <button
                          onClick={() => markAsPaid(booking.id)}
                          className="flex-1 bg-blue-600 text-white text-xs py-2.5 sm:py-2 px-3 rounded-md hover:bg-blue-700 transition-colors touch-manipulation"
                        >
                          Mark as Paid
                        </button>
                      )}
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "confirmed")
                            }
                            className="flex-1 bg-green-600 text-white text-xs py-2.5 sm:py-2 px-3 rounded-md hover:bg-green-700 transition-colors touch-manipulation"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setBookingToCancel(booking)}
                            className="flex-1 bg-red-600 text-white text-xs py-2.5 sm:py-2 px-3 rounded-md hover:bg-red-700 transition-colors touch-manipulation"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => setBookingToCancel(booking)}
                          className="flex-1 bg-red-600 text-white text-xs py-2.5 sm:py-2 px-3 rounded-md hover:bg-red-700 transition-colors touch-manipulation"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setSelectedBooking(null)}
              />

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Booking details
                      </h3>

                      <div className="space-y-4">
                        {/* Status */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">
                            Status:
                          </span>
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.status)}`}
                          >
                            {getStatusIcon(selectedBooking.status)}
                            {selectedBooking.status === "confirmed"
                              ? "Confirmed"
                              : selectedBooking.status === "cancelled"
                                ? "Cancelled"
                                : "Pending"}
                          </div>
                        </div>

                        {/* Guest Details */}
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Guest information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              Name:{" "}
                              <span className="font-medium">
                                {selectedBooking.guest_name}
                              </span>
                            </div>
                            <div>
                              Email:{" "}
                              <span className="font-medium">
                                {selectedBooking.guest_email}
                              </span>
                            </div>
                            {selectedBooking.guest_phone && (
                              <div>
                                Phone:{" "}
                                <span className="font-medium">
                                  {selectedBooking.guest_phone}
                                </span>
                              </div>
                            )}
                            <div>
                              Number of guests:{" "}
                              <span className="font-medium">
                                {selectedBooking.guests}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Stay
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              Check-in:{" "}
                              <span className="font-medium">
                                {format(
                                  parseISO(selectedBooking.start_date),
                                  "dd.MM.yyyy"
                                )}
                              </span>
                            </div>
                            <div>
                              Check-out:{" "}
                              <span className="font-medium">
                                {format(
                                  parseISO(selectedBooking.end_date),
                                  "dd.MM.yyyy"
                                )}
                              </span>
                            </div>
                            <div>
                              Number of nights:{" "}
                              <span className="font-medium">
                                {calculateNights(
                                  selectedBooking.start_date,
                                  selectedBooking.end_date
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        {selectedBooking.total_price && (
                          <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Price
                            </h4>
                            <div className="text-lg font-semibold text-green-600">
                              €{selectedBooking.total_price}
                            </div>
                          </div>
                        )}

                        {/* Special Requests */}
                        {selectedBooking.special_requests && (
                          <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Special requests
                            </h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                              {selectedBooking.special_requests}
                            </p>
                          </div>
                        )}

                        {/* Created Date */}
                        <div className="border-t pt-4">
                          <div className="text-xs text-gray-500">
                            Created:{" "}
                            {format(
                              parseISO(selectedBooking.created_at),
                              "dd.MM.yyyy HH:mm"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => deleteBooking(selectedBooking.id)}
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {bookingToCancel && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setBookingToCancel(null)}
              />

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <XCircleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Cancel Booking
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to cancel this booking for{" "}
                          <span className="font-medium">
                            {bookingToCancel.guest_name}
                          </span>
                          ?
                        </p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-600">
                            <strong>Reference:</strong>{" "}
                            {bookingToCancel.payment_reference ||
                              `CS-${bookingToCancel.id.slice(-8).toUpperCase()}`}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Dates:</strong>{" "}
                            {format(
                              parseISO(bookingToCancel.start_date),
                              "dd.MM.yyyy"
                            )}{" "}
                            -{" "}
                            {format(
                              parseISO(bookingToCancel.end_date),
                              "dd.MM.yyyy"
                            )}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Amount:</strong> €
                            {bookingToCancel.total_price}
                          </p>
                        </div>
                        <p className="text-sm text-red-600 mt-2">
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateBookingStatus(bookingToCancel.id, "cancelled");
                      setBookingToCancel(null);
                    }}
                  >
                    Yes, Cancel Booking
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setBookingToCancel(null)}
                  >
                    Keep Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
