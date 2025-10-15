// app/terms/page.tsx
import {
  DocumentTextIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the terms and conditions for booking Casa Sueño vacation rental. Booking policies, payment terms, and rental agreement details.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">{t("title")}</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Booking Terms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("bookingTerms.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>{t("bookingTerms.minimumAge.label")}:</strong>{" "}
                  {t("bookingTerms.minimumAge.value")}
                </li>
                <li>
                  • <strong>{t("bookingTerms.maxGuests.label")}:</strong>{" "}
                  {t("bookingTerms.maxGuests.value")}
                </li>
                <li>
                  • <strong>{t("bookingTerms.minimumStay.label")}:</strong>{" "}
                  {t("bookingTerms.minimumStay.value")}
                </li>
                <li>
                  • <strong>{t("bookingTerms.payment.label")}:</strong>{" "}
                  {t("bookingTerms.payment.value")}
                </li>
                <li>
                  • <strong>{t("bookingTerms.securityDeposit.label")}:</strong>{" "}
                  {t("bookingTerms.securityDeposit.value")}
                </li>
                <li>
                  • <strong>{t("bookingTerms.cleaningFee.label")}:</strong>{" "}
                  {t("bookingTerms.cleaningFee.value")}
                </li>
              </ul>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>{t("bookingTerms.seasonalStays.title")}:</strong>{" "}
                  {t("bookingTerms.seasonalStays.text")}
                </p>
              </div>
            </div>
          </div>

          {/* Check-in & Check-out */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("checkInOut.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>{t("checkInOut.checkIn.label")}:</strong>{" "}
                  {t("checkInOut.checkIn.time")}
                </li>
                <li>
                  • <strong>{t("checkInOut.checkOut.label")}:</strong>{" "}
                  {t("checkInOut.checkOut.time")}
                </li>
                <li>
                  • <strong>{t("checkInOut.lateArrival.label")}:</strong>{" "}
                  {t("checkInOut.lateArrival.fee")}
                </li>
                <li>
                  • <strong>{t("checkInOut.keyCollection.label")}:</strong>{" "}
                  {t("checkInOut.keyCollection.text")}
                </li>
              </ul>
            </div>
          </div>

          {/* Responsibility & Damages */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("responsibility.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>• {t("responsibility.guestResponsibility")}</li>
                <li>• {t("responsibility.securityDeposit")}</li>
                <li>• {t("responsibility.additionalCleaning")}</li>
                <li>• {t("responsibility.lostKeys")}</li>
              </ul>
            </div>
          </div>

          {/* Cancellation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("cancellation.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>{t("cancellation.freeCancellation.label")}:</strong>{" "}
                  {t("cancellation.freeCancellation.period")}
                </li>
                <li>
                  • <strong>{t("cancellation.fiftyPercent.label")}:</strong>{" "}
                  {t("cancellation.fiftyPercent.period")}
                </li>
                <li>
                  • <strong>{t("cancellation.noRefund.label")}:</strong>{" "}
                  {t("cancellation.noRefund.period")}
                </li>
                <li>• {t("cancellation.depositNonRefundable")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
