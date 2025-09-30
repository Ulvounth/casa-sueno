// app/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & beskrivelse */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo/CasaSueño.png"
              alt="Casa Sueño"
              width={350}
              height={90}
              className="h-16 w-auto hover:opacity-80 transition-opacity duration-200 brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-stone-400">{t("description")}</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-100">{t("quickLinks")}</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies & Legal */}
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-100">{t("policiesLegal")}</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/house-rules"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("houseRules")}
              </Link>
            </li>
            <li>
              <Link
                href="/cancellation-policy"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("cancellationPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("terms")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-amber-200 transition-colors text-sm"
              >
                {tNav("privacy")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="font-semibold text-amber-100">{t("getInTouch")}</h3>
          <div className="space-y-2 text-sm text-stone-400">
            <p>
              <strong>{t("email")}:</strong> info@casa-sueno.com
            </p>
            <p>
              <strong>{t("phone")}:</strong> +34 623 545 857
            </p>
            <p>
              <strong>{t("emergency")}:</strong> {t("support24")}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-amber-100 mb-2 text-sm">
              {t("followUs")}
            </h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/casasueno.es/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-5 w-5 hover:text-rose-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-stone-700 py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-stone-400">
            &copy; {new Date().getFullYear()} Casa Sueño.{" "}
            {t("allRightsReserved")}
          </div>
          <div className="text-xs text-stone-500 flex items-center gap-4">
            <span>{t("propertyLocation")}</span>
            <Link
              href="/en/admin"
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
