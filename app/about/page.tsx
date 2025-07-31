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
          <h1 className="text-6xl font-bold mb-6">About Casa Sueño</h1>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl font-semibold text-stone-800">Our Story</h2>
            <p className="text-stone-700 leading-relaxed">
              Welcome to Casa Sueño, your home away from home in beautiful
              Spain. Our holiday rental was carefully designed to provide guests
              with an authentic Spanish experience while maintaining all the
              comforts of modern living.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Located in one of Spain&apos;s most charming regions, Casa Sueño
              offers the perfect base for exploring the rich culture, stunning
              beaches, and vibrant local communities that make this area so
              special. We&apos;ve thoughtfully curated every detail to ensure
              your stay is memorable.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Whether you&apos;re seeking relaxation, adventure, or cultural
              immersion, Casa Sueño provides the perfect setting for your
              Spanish holiday. We&apos;re committed to helping you create
              lasting memories in this beautiful corner of Spain.
            </p>
          </div>

          {/* Right Column - Property Facts */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-stone-800">
              About Casa Sueño
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">Location</h3>
                  <p className="text-stone-600">
                    Beautiful Spanish countryside
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AcademicCapIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">
                    Property Type
                  </h3>
                  <p className="text-stone-600">Modern holiday villa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HeartIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800">Amenities</h3>
                  <p className="text-stone-600">
                    Fully equipped kitchen, comfortable bedrooms, modern
                    bathrooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">
                Have questions about the area?
              </h3>
              <p className="text-stone-600 mb-4">
                Need local recommendations or have questions about Casa Sueño?
                We&apos;re here to help make your Spanish holiday unforgettable!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Ask a question
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
              Why stay at Casa Sueño
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
                  Premium Experience
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  As local property managers, we know all the best beaches,
                  restaurants, and hidden gems in the area
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 text-center">
                  Personal Touch
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  We treat our guests like family and ensure every detail is
                  perfect for your stay
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 text-center">
                  Quality Guaranteed
                </h3>
                <p className="text-stone-600 leading-relaxed text-center">
                  Casa Sueño is our home too - we maintain the highest standards
                  of cleanliness and comfort
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
