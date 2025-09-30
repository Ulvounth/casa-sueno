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
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
