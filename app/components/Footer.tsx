// app/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & beskrivelse */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-100">Casa Sueño</h2>
          <p className="text-sm text-stone-400">
            Your dream holiday home in Spain. Experience authentic Spanish charm
            with modern comfort in beautiful Orihuela.
          </p>
          <div className="space-y-1 text-sm text-stone-400">
            <p>
              <strong>License:</strong> VT-123456-A
            </p>
            <p>
              <strong>Registration:</strong> AT-123456-A
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-100">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies & Legal */}
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-100">Policies & Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/house-rules"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                House Rules
              </Link>
            </li>
            <li>
              <Link
                href="/cancellation-policy"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="font-semibold text-amber-100">Get in Touch</h3>
          <div className="space-y-2 text-sm text-stone-400">
            <p>
              <strong>Email:</strong> info@casasueno.com
            </p>
            <p>
              <strong>Phone:</strong> +34 123 456 789
            </p>
            <p>
              <strong>Emergency:</strong> 24/7 Support
            </p>
          </div>
          <div>
            <h4 className="font-medium text-amber-100 mb-2 text-sm">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5 hover:text-amber-400 transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 hover:text-rose-400 transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter className="h-5 w-5 hover:text-amber-300 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-stone-700 py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-stone-400">
            &copy; {new Date().getFullYear()} Casa Sueño. All rights reserved.
          </div>
          <div className="text-xs text-stone-500 flex items-center gap-4">
            <span>
              Licensed vacation rental property in Orihuela, Spain • GDPR
              Compliant
            </span>
            <Link
              href="/admin"
              className="text-stone-600 hover:text-amber-400 transition-colors"
              title="Admin Panel"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
