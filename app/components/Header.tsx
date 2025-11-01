"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const t = useTranslations("navigation");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      try {
        if (
          dropdownRef.current &&
          event.target &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setPoliciesOpen(false);
        }
      } catch (error) {
        console.error("Error in handleClickOutside:", error);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/prices`, label: t("prices") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const policyLinks = [
    { href: `/${locale}/house-rules`, label: t("houseRules") },
    { href: `/${locale}/cancellation-policy`, label: t("cancellationPolicy") },
    { href: `/${locale}/terms`, label: t("terms") },
    { href: `/${locale}/privacy`, label: t("privacy") },
  ];

  return (
    <>
      <header className="fixed w-full bg-stone-50/90 backdrop-blur z-20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-2">
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo/CasaSueño.png"
              alt="Casa Sueño"
              width={300}
              height={80}
              className="h-16 w-auto hover:opacity-80 transition-opacity duration-200"
              priority
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8 text-stone-700 items-center text-lg">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`hover:text-stone-900 transition-colors relative ${
                      pathname === l.href ? "text-amber-600 font-medium" : ""
                    }`}
                  >
                    {l.label}
                    {pathname === l.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}

              {/* Policies Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setPoliciesOpen(!policiesOpen)}
                  className={`hover:text-stone-900 transition-colors relative flex items-center gap-1 text-lg ${
                    policyLinks.some((link) => pathname === link.href)
                      ? "text-amber-600 font-medium"
                      : ""
                  }`}
                >
                  Policies
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${policiesOpen ? "rotate-180" : ""}`}
                  />
                  {policyLinks.some((link) => pathname === link.href) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {policiesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
                    {policyLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${
                          pathname === link.href
                            ? "text-amber-600 bg-amber-50"
                            : "text-stone-700"
                        }`}
                        onClick={() => setPoliciesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay - always rendered but hidden */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Slide-in menu from right */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-stone-50/95 backdrop-blur-lg shadow-2xl border-l border-stone-200/70 transform transition-all duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Subtle decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-stone-50/30 pointer-events-none"></div>

          <div className="relative p-6 pt-20">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-3 hover:bg-stone-100/80 rounded-full transition-all duration-200 hover:shadow-md group"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6 text-stone-500 group-hover:text-stone-700 transition-colors" />
            </button>

            {/* Welcome text */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-stone-800">Casa Sueño</h3>
              <p className="text-sm text-stone-500 mt-1">Navigation</p>
            </div>

            {/* Language Switcher - Mobile */}
            <div className="mb-6 pb-4 border-b border-stone-200/50">
              <LanguageSwitcher />
            </div>

            {/* Menu items */}
            <ul className="space-y-2">
              {links.map((l, index) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group block py-4 px-5 rounded-lg transition-all duration-300 font-medium text-lg relative overflow-hidden ${
                      pathname === l.href
                        ? "bg-amber-600 text-white shadow-md transform scale-[1.02]"
                        : "text-stone-700 hover:bg-stone-100/80 hover:shadow-sm hover:transform hover:scale-[1.01]"
                    }`}
                    onClick={() => setOpen(false)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: open
                        ? "slideInRight 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    {/* Active indicator */}
                    {pathname === l.href && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    )}

                    <span className="relative z-10">{l.label}</span>

                    {/* Subtle hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-50/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                </li>
              ))}

              {/* Policies Section */}
              <li className="pt-4">
                <div className="text-sm font-semibold text-stone-500 px-5 pb-2">
                  Policies
                </div>
                {policyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group block py-3 px-5 ml-4 rounded-lg transition-all duration-300 text-sm relative overflow-hidden ${
                      pathname === link.href
                        ? "bg-amber-100 text-amber-800 shadow-sm"
                        : "text-stone-600 hover:bg-stone-100/60 hover:shadow-sm"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ))}
              </li>
            </ul>

            {/* Bottom decoration */}
            <div className="mt-6 pt-6 border-t border-stone-200/50">
              <div className="text-center">
                <div className="w-12 h-1 bg-amber-600 rounded-full mx-auto"></div>
                <p className="text-xs text-stone-500 mt-3">
                  Your dream holiday home
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
