// app/privacy/page.tsx
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
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
          {/* Information We Collect */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("informationCollect.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>{t("informationCollect.intro")}</p>
              <ul className="space-y-3">
                <li>
                  •{" "}
                  <strong>
                    {t("informationCollect.contactDetails.label")}:
                  </strong>{" "}
                  {t("informationCollect.contactDetails.text")}
                </li>
                <li>
                  •{" "}
                  <strong>{t("informationCollect.bookingInfo.label")}:</strong>{" "}
                  {t("informationCollect.bookingInfo.text")}
                </li>
                <li>
                  •{" "}
                  <strong>{t("informationCollect.paymentInfo.label")}:</strong>{" "}
                  {t("informationCollect.paymentInfo.text")}
                </li>
                <li>
                  • <strong>{t("informationCollect.messages.label")}:</strong>{" "}
                  {t("informationCollect.messages.text")}
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("howWeUse.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>{t("howWeUse.intro")}</p>
              <ul className="space-y-3">
                <li>• {t("howWeUse.processBookings")}</li>
                <li>• {t("howWeUse.communicate")}</li>
                <li>• {t("howWeUse.sendInstructions")}</li>
                <li>• {t("howWeUse.respondQuestions")}</li>
                <li>• {t("howWeUse.improveServices")}</li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("informationSharing.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold mb-2">
                  {t("informationSharing.noSelling")}
                </p>
                <p className="text-green-700">
                  {t("informationSharing.trustedProviders")}
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800">
                {t("yourRights.title")}
              </h2>
            </div>
            <div className="space-y-4 text-stone-700">
              <p>{t("yourRights.intro")}</p>
              <ul className="space-y-3">
                <li>• {t("yourRights.requestCopy")}</li>
                <li>• {t("yourRights.correctInfo")}</li>
                <li>• {t("yourRights.requestDeletion")}</li>
                <li>• {t("yourRights.withdrawConsent")}</li>
              </ul>
              <p className="mt-4">
                <strong>{t("yourRights.contact.label")}:</strong>{" "}
                {t("yourRights.contact.email")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
