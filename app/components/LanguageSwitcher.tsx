"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const languages = [
  {
    code: "en",
    name: "English",
    flag: (
      <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
        <rect width="20" height="15" fill="#012169" />
        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#fff" strokeWidth="2" />
        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#C8102E" strokeWidth="1" />
        <path d="M10,0 L10,15 M0,7.5 L20,7.5" stroke="#fff" strokeWidth="3" />
        <path
          d="M10,0 L10,15 M0,7.5 L20,7.5"
          stroke="#C8102E"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    code: "nl",
    name: "Nederlands",
    flag: (
      <svg width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
        <rect width="20" height="5" fill="#AE1C28" />
        <rect width="20" height="5" y="5" fill="#fff" />
        <rect width="20" height="5" y="10" fill="#21468B" />
      </svg>
    ),
  },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract locale from pathname
  const locale = pathname.startsWith("/nl") ? "nl" : "en";
  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from pathname and add the new one
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        aria-label="Select language"
      >
        {currentLanguage?.flag}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`${
                    locale === language.code
                      ? "bg-amber-50 text-amber-900"
                      : "text-gray-700 hover:bg-gray-50"
                  } group flex items-center gap-3 px-4 py-2 text-sm w-full text-left transition-colors`}
                  role="menuitem"
                >
                  {language.flag}
                  <span className="font-medium">{language.name}</span>
                  {locale === language.code && (
                    <span className="ml-auto text-amber-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
