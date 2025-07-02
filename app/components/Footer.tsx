// app/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & beskrivelse */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-100">Casa Sueño</h2>
          <p className="text-sm text-stone-400">
            Your dream holiday home in Spain. Welcome guests year-round for an
            unforgettable stay.
          </p>
        </div>

        {/* Hurtiglenker */}
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-100">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-amber-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-amber-200 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-amber-200 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="hover:text-amber-200 transition-colors"
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosiale medier */}
        <div className="space-y-4">
          <h3 className="font-semibold text-amber-100">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6 hover:text-amber-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-rose-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-amber-300 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bunntekst */}
      <div className="max-w-7xl mx-auto border-t border-stone-700 py-6 px-4 text-center text-sm text-stone-400">
        &copy; {new Date().getFullYear()} Casa Sueño. All rights reserved.
      </div>
    </footer>
  );
}
