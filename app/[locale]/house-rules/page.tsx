// app/house-rules/page.tsx
import {
  ClockIcon,
  NoSymbolIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Rules",
  description:
    "Review the house rules for Casa Sueño vacation rental in Orihuela, Alicante. Check-in times, guest policies, and important guidelines for your stay.",
};

export default async function HouseRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "houseRules" });
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
          {/* Check-in/Check-out */}
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
                  {t("checkInOut.lateArrival.text")}
                </li>
                <li>
                  • <strong>{t("checkInOut.earlyDeparture.label")}:</strong>{" "}
                  {t("checkInOut.earlyDeparture.text")}
                </li>
              </ul>
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <NoSymbolIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("importantRules.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">
                    {t("importantRules.notAllowed.title")}
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• {t("importantRules.notAllowed.smoking")}</li>
                    <li>• {t("importantRules.notAllowed.parties")}</li>
                    <li>• {t("importantRules.notAllowed.pets")}</li>
                    <li>• {t("importantRules.notAllowed.additionalGuests")}</li>
                    <li>• {t("importantRules.notAllowed.ageRequirement")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    {t("importantRules.pleaseDo.title")}
                  </h3>
                  <ul className="space-y-2 text-stone-600">
                    <li>• {t("importantRules.pleaseDo.noiseLevels")}</li>
                    <li>• {t("importantRules.pleaseDo.quietHours")}</li>
                    <li>• {t("importantRules.pleaseDo.respectProperty")}</li>
                    <li>• {t("importantRules.pleaseDo.cleanUp")}</li>
                    <li>• {t("importantRules.pleaseDo.lockDoors")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Guests & Occupancy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("guestsVisitors.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>
                  • <strong>{t("guestsVisitors.maxOccupancy.label")}:</strong>{" "}
                  {t("guestsVisitors.maxOccupancy.value")}
                </li>
                <li>
                  • <strong>{t("guestsVisitors.dayVisitors.label")}:</strong>{" "}
                  {t("guestsVisitors.dayVisitors.text")}
                </li>
                <li>
                  •{" "}
                  <strong>{t("guestsVisitors.additionalGuests.label")}:</strong>{" "}
                  {t("guestsVisitors.additionalGuests.text")}
                </li>
                <li>
                  • <strong>{t("guestsVisitors.ageRequirement.label")}:</strong>{" "}
                  {t("guestsVisitors.ageRequirement.text")}
                </li>
              </ul>
            </div>
          </div>

          {/* Safety & Security */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("safetySecurity.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ul className="space-y-3">
                <li>• {t("safetySecurity.emergencyContact")}</li>
                <li>• {t("safetySecurity.safetyEquipment")}</li>
                <li>• {t("safetySecurity.reportIssues")}</li>
                <li>• {t("safetySecurity.keyReplacement")}</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-blue-800">
                  <strong>{t("safetySecurity.emergency.title")}:</strong>{" "}
                  {t("safetySecurity.emergency.text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
