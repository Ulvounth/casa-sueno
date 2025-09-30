// app/[locale]/page.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Hero from "@/app/components/Hero";
import FloatingBookingButton from "@/app/components/FloatingBookingButton";
import InteractiveMap from "@/app/components/InteractiveMap";
import AvailabilityPreview from "@/app/components/AvailabilityPreview";
import {
  CheckIcon,
  KeyIcon,
  WifiIcon,
  AcademicCapIcon as SnowflakeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
  TvIcon,
  BeakerIcon as KitchenIcon,
  ClockIcon,
  BuildingOffice2Icon as BedIcon,
  CogIcon as WashingMachineIcon,
  CakeIcon as CoffeeMachineIcon,
  FireIcon as MicrowaveIcon,
  UserIcon as TowelsIcon,
  HomeIcon as TravelCribIcon,
  ArrowPathIcon as PoolIcon,
} from "@heroicons/react/24/outline";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ cancelled?: string }>;
}) {
  const { locale } = await params;
  const searchParamsData = await searchParams;
  const cancelled = searchParamsData?.cancelled === "true";
  const t = await getTranslations({ locale, namespace: "homepage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="flex flex-col">
      {/* Cancelled Notification */}
      {cancelled && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{t("paymentCancelled")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <Hero />

      {/* About This Home */}
      <section id="about-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">{t("title")}</h2>
              <p className="text-gray-600 text-lg mb-4">{t("guestInfo")}</p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t("description")}
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>{t("features.selfCheckIn")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>{t("features.airConditioning")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>{t("features.walkableNeighborhood")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>{t("features.privatePool")}</span>
                </li>
              </ul>
            </div>

            {/* Enhanced Key Features */}
            <div className="space-y-6 mt-8">
              <h3 className="text-2xl font-semibold">
                {t("specialFeatures.title")}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <KeyIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {t("specialFeatures.selfCheckIn.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("specialFeatures.selfCheckIn.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SparklesIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {t("specialFeatures.sparklingClean.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("specialFeatures.sparklingClean.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {t("specialFeatures.primeLocation.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("specialFeatures.primeLocation.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SunIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {t("specialFeatures.roofTerrace.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("specialFeatures.roofTerrace.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar content */}
          <div className="lg:col-span-1 space-y-8">
            {/* Availability Preview */}
            <AvailabilityPreview />

            {/* Quick Facts */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-4">
                {t("quickFacts.title")}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{tCommon("checkIn")}</span>
                  <span className="font-medium">{t("quickFacts.checkIn")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{tCommon("checkOut")}</span>
                  <span className="font-medium">
                    {t("quickFacts.checkOut")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("quickFacts.minimumStayLabel")}
                  </span>
                  <span className="font-medium">
                    {t("quickFacts.minimumStay")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("quickFacts.maxGuestsLabel")}
                  </span>
                  <span className="font-medium">
                    {t("quickFacts.maxGuests")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("quickFacts.ageRequirementLabel")}
                  </span>
                  <span className="font-medium">
                    {t("quickFacts.ageRequirement")}
                  </span>
                </div>
                <div className="pt-2 text-xs text-gray-500">
                  {t("quickFacts.seasonNote")}
                </div>
              </div>
            </div>

            {/* House Rules Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-lg mb-4">
                {t("houseRules.title")}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">
                    {t("houseRules.noSmokingIndoors")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">
                    {t("houseRules.noParties")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">
                    {t("houseRules.noPets")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">⏰</span>
                  <span className="text-gray-600">
                    {t("houseRules.quietHours")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">�</span>
                  <span className="text-gray-600">
                    {t("houseRules.familiesWelcome")}
                  </span>
                </div>

                <div className="pt-3">
                  <Link
                    href="/house-rules"
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    {t("houseRules.viewAll")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width sections below */}
        <div className="mt-12 space-y-12">
          {/* Amenities */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold mb-6">
              {t("amenities.title")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <WifiIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{t("amenities.freeWifi")}</span>
              </div>
              <div className="flex items-center gap-3">
                <SnowflakeIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.acLivingRoom")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <KitchenIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.fullKitchen")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TvIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{t("amenities.smartTv")}</span>
              </div>
              <div className="flex items-center gap-3">
                <SunIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.roofTerraceBbq")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <PoolIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.communalPool")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <BedIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{t("amenities.beds")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CoffeeMachineIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.nespresso")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <WashingMachineIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.washingMachine")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TowelsIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.towelsToiletries")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TravelCribIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{t("amenities.babyCrib")}</span>
              </div>
              <div className="flex items-center gap-3">
                <MicrowaveIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Microwave</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Safe area</span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {t("amenities.support24")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 text-gray-600">🛁</span>
                <span className="text-gray-700">
                  {t("amenities.bathtubShower")}
                </span>
              </div>
            </div>

            {/* Everything included note */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <SparklesIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">
                    {t("amenities.everythingIncluded.title")}
                  </p>
                  <p className="text-amber-700 text-sm mt-1">
                    {t("amenities.everythingIncluded.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Highlights */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold mb-4">
              {t("location.title")}
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 font-medium text-lg">
                  {t("location.cityCountry")}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t("location.description")}
                </p>
              </div>

              {/* Location Features */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.laZeniaBoulevard")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.caboRoigBeach")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.laZeniaBeach")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.puntaPrimaRestaurants")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.aldiSupermarket")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.alicanteAirport")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.pinkLake")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>{t("location.features.aquapolisWaterPark")}</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Section */}
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Floating Booking Button */}
      <FloatingBookingButton />
    </main>
  );
}
