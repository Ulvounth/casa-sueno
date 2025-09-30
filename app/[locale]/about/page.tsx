// app/[locale]/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  HeartIcon,
  MapPinIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "@/app/components/FloatingBookingButton";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-40 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/about-heading.jpg"
            alt="Casa Sueño Family"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-6xl font-bold mb-6">{t("hero.title")}</h1>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - About Family */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-stone-800">
              {t("story.title")}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {t("story.paragraph1")}
            </p>
            <p className="text-stone-700 leading-relaxed">
              {t("story.paragraph2")}
            </p>
            <p className="text-stone-700 leading-relaxed">
              {t("story.paragraph3")}
            </p>
          </div>

          {/* Right Column - Property Facts */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-stone-800">
              {t("property.title")}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">
                    {t("property.location.title")}
                  </h3>
                  <p className="text-stone-600">
                    {t("property.location.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AcademicCapIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">
                    {t("property.propertyType.title")}
                  </h3>
                  <p className="text-stone-600">
                    {t("property.propertyType.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HeartIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">
                    {t("property.amenities.title")}
                  </h3>
                  <p className="text-stone-600">
                    {t("property.amenities.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                {t("contactPrompt.title")}
              </h3>
              <p className="text-stone-600 mb-4">
                {t("contactPrompt.description")}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                {t("contactPrompt.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Cool but cohesive design */}
      <section className="bg-gradient-to-br from-stone-50 to-amber-50/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-800 mb-4">
              {t("whyChoose.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">🏡</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 text-center">
                  {t("whyChoose.premium.title")}
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  {t("whyChoose.premium.description")}
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 text-center">
                  {t("whyChoose.personal.title")}
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  {t("whyChoose.personal.description")}
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 text-center">
                  {t("whyChoose.quality.title")}
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  {t("whyChoose.quality.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Booking Button */}
      <FloatingBookingButton />
    </main>
  );
}
