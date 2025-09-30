// app/[locale]/contact/page.tsx
import { getTranslations } from "next-intl/server";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "@/app/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50/30 to-orange-50/50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-amber-600">{t("hero.title")}</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">
                {t("information.title")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <EnvelopeIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">
                      {t("information.email.title")}
                    </h3>
                    <p className="text-stone-600">
                      {t("information.email.value")}
                    </p>
                    <p className="text-sm text-stone-500">
                      {t("information.email.note")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">
                      {t("information.phone.title")}
                    </h3>
                    <p className="text-stone-600">
                      {t("information.phone.value")}
                    </p>
                    <p className="text-sm text-stone-500">
                      {t("information.phone.note")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">
                      {t("information.location.title")}
                    </h3>
                    <p className="text-stone-600">
                      {t("information.location.value")}
                    </p>
                    <p className="text-sm text-stone-500">
                      {t("information.location.note")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                {t("quickContact.title")}
              </h3>
              <p className="mb-6 text-amber-100">
                {t("quickContact.description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/34623545857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-lg p-4 text-center group"
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold">
                    {t("quickContact.whatsapp")}
                  </div>
                </a>

                <a
                  href="mailto:info@casa-sueno.com"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-lg p-4 text-center group"
                >
                  <div className="text-2xl mb-2">✉️</div>
                  <div className="font-semibold">{t("quickContact.email")}</div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              {t("map.title")}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t("map.description")}
            </p>
          </div>

          <div className="bg-stone-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-stone-500">
              <MapPinIcon className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">{t("map.placeholder")}</p>
              <p className="text-sm">{t("map.location")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
