// app/cancellation-policy/page.tsx
import {
  CalendarIcon,
  CurrencyEuroIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Review Casa Sueño's cancellation policy. Understand refund terms, cancellation deadlines, and booking modification policies.",
};

export default async function CancellationPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cancellationPolicy" });
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
          {/* Cancellation Timeline */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("timeline.title")}
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {t("timeline.fourteenPlus.title")}
                  </h3>
                  <p className="text-green-700">
                    <strong>{t("timeline.fourteenPlus.refund")}</strong>
                    <br />
                    {t("timeline.fourteenPlus.description")}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {t("timeline.sevenToThirteen.title")}
                  </h3>
                  <p className="text-yellow-700">
                    <strong>{t("timeline.sevenToThirteen.refund")}</strong>
                    <br />
                    {t("timeline.sevenToThirteen.description")}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    {t("timeline.lessThanSeven.title")}
                  </h3>
                  <p className="text-red-700">
                    <strong>{t("timeline.lessThanSeven.refund")}</strong>
                    <br />
                    {t("timeline.lessThanSeven.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("howToCancel.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <ol className="space-y-3">
                <li>
                  <strong>1.</strong> {t("howToCancel.step1")}
                </li>
                <li>
                  <strong>2.</strong> {t("howToCancel.step2")}
                </li>
                <li>
                  <strong>3.</strong> {t("howToCancel.step3")}
                </li>
                <li>
                  <strong>4.</strong> {t("howToCancel.step4")}
                </li>
              </ol>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-blue-800">
                  <strong>{t("howToCancel.contact.label")}:</strong>{" "}
                  {t("howToCancel.contact.details")}
                </p>
              </div>
            </div>
          </div>

          {/* Special Circumstances */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <CurrencyEuroIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("specialCircumstances.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    {t("specialCircumstances.emergency.title")}
                  </h3>
                  <p>{t("specialCircumstances.emergency.description")}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    {t("specialCircumstances.hostCancellation.title")}
                  </h3>
                  <p>
                    {t("specialCircumstances.hostCancellation.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    {t("specialCircumstances.modification.title")}
                  </h3>
                  <p>{t("specialCircumstances.modification.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
