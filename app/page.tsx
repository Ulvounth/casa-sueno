// app/page.tsx
import Link from "next/link";
import Hero from "./components/Hero";
import FloatingBookingButton from "./components/FloatingBookingButton";
import InteractiveMap from "./components/InteractiveMap";
import AvailabilityPreview from "./components/AvailabilityPreview";
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
  searchParams,
}: {
  searchParams?: Promise<{ cancelled?: string }>;
}) {
  const params = await searchParams;
  const cancelled = params?.cancelled === "true";

  return (
    <main className="flex flex-col">
      {/* Cancelled Notification */}
      {cancelled && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Payment was cancelled. You can try booking again anytime.
              </p>
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
              <h2 className="text-3xl font-semibold">
                Modern townhouse in residential complex
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Up to 5 guests · 2 bedrooms · 3 beds · 2 bathrooms
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Discover your perfect Mediterranean getaway in this stunning,
                newly renovated townhouse in Orihuela. Casa Sueño features two
                comfortable bedrooms (one with a double bed, one with twin
                beds), a sofa bed for additional guests, and two full bathrooms
                with both a bathtub and separate shower. Enjoy the spectacular
                private roof terrace with panoramic views and outdoor BBQ -
                perfect for morning coffee or evening grilling under the Spanish
                sun. Located in the heart of Costa Blanca near La Zenia,
                you&apos;re just 10 minutes from La Zenia Boulevard shopping
                center and 15 minutes from multiple pristine beaches including
                Cabo Roig and La Zenia. The townhouse combines modern comfort
                with traditional Spanish charm, plus access to a communal pool -
                everything you need for an unforgettable vacation for up to 5
                guests.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>Self check-in with smart lock.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>
                    Air conditioning & ceiling fan for a comfortable stay.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>
                    Walkable neighborhood with restaurants & shops nearby.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <span>Access to private pool shared with neighbors.</span>
                </li>
              </ul>
            </div>

            {/* Enhanced Key Features */}
            <div className="space-y-6 mt-8">
              <h3 className="text-2xl font-semibold">
                What makes this place special
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <KeyIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Self check-in</h4>
                    <p className="text-gray-600">
                      Check yourself in with the smart lock for hassle-free
                      arrival.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SparklesIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Sparkling clean</h4>
                    <p className="text-gray-600">
                      Recent guests consistently praise our spotless cleanliness
                      standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Prime location</h4>
                    <p className="text-gray-600">
                      Walk to La Zenia mall, drive 5 minutes to stunning
                      beaches.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SunIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Private roof terrace
                    </h4>
                    <p className="text-gray-600">
                      Enjoy Mediterranean sunsets from your own rooftop space.
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
              <h4 className="font-semibold text-lg mb-4">Quick Facts</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">11:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum stay</span>
                  <span className="font-medium">3-7 nights*</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max guests</span>
                  <span className="font-medium">5 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age requirement</span>
                  <span className="font-medium">Families welcome</span>
                </div>
                <div className="pt-2 text-xs text-gray-500">
                  *Low season: 3 nights, Middle season: 4 nights, High season: 7
                  nights
                </div>
              </div>
            </div>

            {/* House Rules Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-lg mb-4">House Rules</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">
                    No smoking indoors (outdoor OK)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">No parties or events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-600">No pets allowed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">⏰</span>
                  <span className="text-gray-600">
                    Quiet hours: 22:00 - 08:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">�‍👩‍👧‍👦</span>
                  <span className="text-gray-600">
                    Families and children welcome
                  </span>
                </div>

                <div className="pt-3">
                  <Link
                    href="/house-rules"
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    View all house rules →
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
              What this place offers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <WifiIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Free WiFi</span>
              </div>
              <div className="flex items-center gap-3">
                <SnowflakeIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">AC in living room</span>
              </div>
              <div className="flex items-center gap-3">
                <KitchenIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Full kitchen</span>
              </div>
              <div className="flex items-center gap-3">
                <TvIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Smart TV (Netflix)</span>
              </div>
              <div className="flex items-center gap-3">
                <SunIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Roof terrace with BBQ</span>
              </div>
              <div className="flex items-center gap-3">
                <PoolIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Communal pool</span>
              </div>
              <div className="flex items-center gap-3">
                <BedIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">3 beds + sofa bed</span>
              </div>
              <div className="flex items-center gap-3">
                <CoffeeMachineIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Nespresso machine</span>
              </div>
              <div className="flex items-center gap-3">
                <WashingMachineIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Washing machine</span>
              </div>
              <div className="flex items-center gap-3">
                <TowelsIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Towels & toiletries</span>
              </div>
              <div className="flex items-center gap-3">
                <TravelCribIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Baby crib available</span>
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
                <span className="text-gray-700">24/7 support</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 text-gray-600">🛁</span>
                <span className="text-gray-700">Bathtub & shower</span>
              </div>
            </div>

            {/* Everything included note */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <SparklesIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">
                    Everything you need for a perfect holiday
                  </p>
                  <p className="text-amber-700 text-sm mt-1">
                    All basic amenities are included - just bring your clothes
                    and enjoy your stay! From kitchen essentials to fresh
                    linens, we&apos;ve got you covered.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Highlights */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Where you&apos;ll be
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 font-medium text-lg">
                  Orihuela, Costa Blanca, Spain
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Perfectly positioned in the heart of Costa Blanca, Casa Sueño
                  offers the best of both worlds: peaceful residential charm and
                  easy access to top attractions. La Zenia Boulevard shopping
                  center is just 10 minutes away by car (4.4km), while pristine
                  beaches like Cabo Roig and La Zenia are within 12-15 minutes
                  drive. The charming restaurants of Punta Prima are only 3km
                  away, and Alicante Airport is a convenient 40-minute drive.
                  Exact address will be provided after booking confirmation.
                </p>
              </div>

              {/* Location Features */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>La Zenia Boulevard:</strong> 4.4km (10 min drive)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Cabo Roig Beach:</strong> 7km (15 min drive)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>La Zenia Beach:</strong> 5.8km (12 min drive)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Punta Prima Restaurants:</strong> 3km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Aldi Supermarket:</strong> 900m
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Alicante Airport:</strong> 60km (40 min drive)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Pink Lake:</strong> 9km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Aquapolis Water Park:</strong> 8km
                  </span>
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
