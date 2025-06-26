// app/page.tsx
import Hero from "./components/Hero";
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
  HeartIcon,
  ClockIcon,
  BuildingOffice2Icon as BedIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import BookingWrapper from "./components/BookingWrapper";

export default function Page() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <Hero />

      {/* About This Home + Booking */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-12 justify-between">
          {/* VENSTRE: About This Home */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold">
              Entire house hosted by Casa Sueño
            </h2>
            <p className="text-gray-600 mb-4">
              4 guests · 2 bedrooms · 2 beds · 2 bathrooms
            </p>
            <p className="text-gray-700 leading-relaxed">
              Discover your perfect Mediterranean getaway in this stunning house
              in Orihuela, just minutes from La Zenia shopping mall and some of
              Costa Blanca&apos;s most beautiful beaches. Casa Sueño combines
              modern comfort with traditional Spanish charm, featuring spacious
              rooms, a private roof terrace, and everything you need for an
              unforgettable vacation.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-green-600 mt-1" />
                <span>
                  Entire place – You’ll have the villa all to yourself.
                </span>
              </li>
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
            </ul>

            {/* Enhanced Key Features */}
            <div className="space-y-6 mt-8">
              <h3 className="text-xl font-semibold">
                What makes this place special
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <KeyIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Self check-in</h4>
                    <p className="text-gray-600">
                      Check yourself in with the smart lock for hassle-free
                      arrival.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SparklesIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sparkling clean</h4>
                    <p className="text-gray-600">
                      Recent guests consistently praise our spotless cleanliness
                      standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Prime location</h4>
                    <p className="text-gray-600">
                      Walk to La Zenia mall, drive 5 minutes to stunning
                      beaches.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <SunIcon className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Private roof terrace</h4>
                    <p className="text-gray-600">
                      Enjoy Mediterranean sunsets from your own rooftop space.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-6">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <WifiIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Free WiFi throughout</span>
                </div>
                <div className="flex items-center gap-3">
                  <SnowflakeIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Air conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <KitchenIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Full equipped kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <TvIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Smart TV with streaming</span>
                </div>
                <div className="flex items-center gap-3">
                  <SunIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Private roof terrace</span>
                </div>
                <div className="flex items-center gap-3">
                  <BedIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">2 comfortable bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Safe & secure area</span>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">24/7 host support</span>
                </div>
              </div>
            </div>

            {/* Location Highlights */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Where you&apos;ll be
              </h3>
              <p className="text-gray-700 mb-4 font-medium">
                Orihuela, Costa Blanca, Spain
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Perfectly positioned in the heart of Costa Blanca, Casa Sueño
                offers the best of both worlds: peaceful residential charm and
                easy access to top attractions. La Zenia Boulevard shopping
                center is just a short walk away, while pristine beaches like
                Playa Flamenca and Cabo Roig are a quick 5-minute drive.
              </p>

              {/* Location Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>La Zenia Boulevard:</strong> 5 min walk
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Playa Flamenca Beach:</strong> 5 min drive
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Cabo Roig Beach:</strong> 7 min drive
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Alicante Airport:</strong> 45 min drive
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Enhanced Booking Card */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="relative z-10 -mt-32 lg:-mt-48 max-w-lg mx-auto lg:max-w-none">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold">€85</span>
                      <span className="text-gray-600">night</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold">4.9</span>
                      <span className="text-sm text-gray-600">
                        (127 reviews)
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-center mb-6">
                    Reserve Your Perfect Getaway
                  </h3>

                  <div className="w-full">
                    <BookingWrapper />
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <HeartIcon className="h-4 w-4" />
                      <span>You won&apos;t be charged yet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-8">
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <h3 className="text-2xl font-semibold">4.9 · 127 reviews</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div>
              <div>
                <p className="font-semibold">Maria</p>
                <p className="text-sm text-gray-600">August 2024</p>
              </div>
            </div>
            <p className="text-gray-700">
              &ldquo;Perfect location near La Zenia mall and beautiful beaches!
              The roof terrace was amazing for evening drinks. Casa Sueño
              exceeded all our expectations. Highly recommend!&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                J
              </div>
              <div>
                <p className="font-semibold">James</p>
                <p className="text-sm text-gray-600">July 2024</p>
              </div>
            </div>
            <p className="text-gray-700">
              &ldquo;Spotlessly clean and beautifully decorated. The two
              bedrooms were perfect for our family. Walking distance to shops
              and restaurants. Will definitely book again!&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="font-semibold">Ana</p>
                <p className="text-sm text-gray-600">June 2024</p>
              </div>
            </div>
            <p className="text-gray-700">
              &ldquo;The roof terrace is a dream! Perfect for sunbathing and
              enjoying the Mediterranean climate. Great location for exploring
              Costa Blanca&apos;s stunning coastline.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
