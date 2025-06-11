// app/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & beskrivelse */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Casa Sueño</h2>
          <p className="text-sm">
            Your dream holiday home in Spain. Welcome guests year-round for an
            unforgettable stay.
          </p>
        </div>

        {/* Hurtiglenker */}
        <div className="space-y-2">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-gray-900">
                Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosiale medier */}
        <div className="space-y-4">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6 hover:text-blue-600 transition" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-pink-500 transition" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-blue-400 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bunntekst */}
      <div className="border-t border-gray-200 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Casa Sueño. All rights reserved.
      </div>
    </footer>
  );
}
