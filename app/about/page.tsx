// app/about/page.tsx
import Image from "next/image";
import {
  HeartIcon,
  MapPinIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 bg-gray-900">
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
          <h1 className="text-5xl font-bold mb-4">Meet Our Family</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Welcome to Casa Sueño! Get to know the Belgian family behind your
            perfect Spanish getaway.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - About Family */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Hello! We&apos;re Arda, Amber, and our little son Amari.
              We&apos;re a Belgian family who took the leap and moved to
              beautiful Spain at the end of 2023, fulfilling our dream of living
              the Mediterranean lifestyle.
            </p>
            <p className="text-gray-700 leading-relaxed">
              After falling in love with the Costa Blanca region during our
              holidays, we decided to make Orihuela our permanent home. Casa
              Sueño became our sanctuary, and now we&apos;re excited to share
              this special place with fellow travelers who appreciate quality,
              comfort, and authentic Spanish charm.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Arda works as an online coach, which gives us the flexibility to
              enjoy this wonderful lifestyle while helping others achieve their
              goals. We love exploring the local beaches, discovering hidden
              restaurants, and creating memories as a family in our new Spanish
              home.
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What we love about Spain
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Beautiful beaches",
                  "Amazing cuisine",
                  "Warm weather",
                  "Friendly locals",
                  "Family lifestyle",
                  "Outdoor activities",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Family Facts */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900">
              About our family
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Originally from
                  </h3>
                  <p className="text-gray-600">Belgium</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AcademicCapIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Moved to Spain
                  </h3>
                  <p className="text-gray-600">End of 2023</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HeartIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Family</h3>
                  <p className="text-gray-600">
                    Arda (online coach), Amber, and Amari.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Planning your stay?
              </h3>
              <p className="text-gray-600 mb-4">
                We&apos;d love to help make your Spanish holiday unforgettable!
                Feel free to reach out with any questions about Casa Sueño or
                recommendations for the area.
              </p>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Why stay at Casa Sueño
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Local Knowledge
              </h3>
              <p className="text-gray-600">
                As residents, we know all the best beaches, restaurants, and
                hidden gems in the area
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personal Touch
              </h3>
              <p className="text-gray-600">
                We treat our guests like family and ensure every detail is
                perfect for your stay
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Casa Sueño is our home too - we maintain the highest standards
                of cleanliness and comfort
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
