// app/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & beskrivelse */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Casa Sueño</h2>
          <p className="text-sm text-gray-400">
            Your dream holiday home in Spain. Welcome guests year-round for an
            unforgettable stay.
          </p>
        </div>

        {/* Hurtiglenker */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="hover:text-white transition-colors"
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosiale medier */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-pink-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-blue-300 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bunntekst */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 py-6 px-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Casa Sueño. All rights reserved.
      </div>
    </footer>
  );
}
