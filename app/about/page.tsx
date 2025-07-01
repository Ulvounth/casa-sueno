// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  MapPinIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import FloatingBookingButton from "../components/FloatingBookingButton";

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
          <h1 className="text-5xl font-bold mb-4">About Casa Sueño</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the story behind your perfect Spanish getaway and what
            makes our holiday home special.
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
              Welcome to Casa Sueño, your home away from home in beautiful
              Spain. Our holiday rental was carefully designed to provide guests
              with an authentic Spanish experience while maintaining all the
              comforts of modern living.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Located in one of Spain&apos;s most charming regions, Casa Sueño
              offers the perfect base for exploring the rich culture, stunning
              beaches, and vibrant local communities that make this area so
              special. We&apos;ve thoughtfully curated every detail to ensure
              your stay is memorable.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you&apos;re seeking relaxation, adventure, or cultural
              immersion, Casa Sueño provides the perfect setting for your
              Spanish holiday. We&apos;re committed to helping you create
              lasting memories in this beautiful corner of Spain.
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What makes our location special
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Beautiful beaches",
                  "Amazing cuisine",
                  "Warm weather",
                  "Rich culture",
                  "Historic sites",
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

          {/* Right Column - Property Facts */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900">
              About Casa Sueño
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Beautiful Spanish countryside</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AcademicCapIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Property Type</h3>
                  <p className="text-gray-600">Modern holiday villa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HeartIcon className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Amenities</h3>
                  <p className="text-gray-600">
                    Fully equipped kitchen, comfortable bedrooms, modern
                    bathrooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Have questions about the area?
              </h3>
              <p className="text-gray-600 mb-4">
                Need local recommendations or have questions about Casa Sueño?
                We&apos;re here to help make your Spanish holiday unforgettable!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ask a question
              </Link>
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
                Premium Experience
              </h3>
              <p className="text-gray-600">
                As local property managers, we know all the best beaches,
                restaurants, and hidden gems in the area
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

      {/* Floating Booking Button */}
      <FloatingBookingButton />
    </main>
  );
}
