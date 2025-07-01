"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed w-full bg-white/90 backdrop-blur z-20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold">
            Casa Sueño
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 items-center">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`hover:text-gray-900 transition-colors relative ${
                    pathname === l.href ? "text-blue-600 font-medium" : ""
                  }`}
                >
                  {l.label}
                  {pathname === l.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

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
          className={`absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200/70 transform transition-all duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Subtle decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-blue-50/20 to-slate-50/30 pointer-events-none"></div>

          <div className="relative p-6 pt-20">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-3 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:shadow-md group"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>

            {/* Welcome text */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800">Casa Sueño</h3>
              <p className="text-sm text-gray-500 mt-1">Navigation</p>
            </div>

            {/* Menu items */}
            <ul className="space-y-2">
              {links.map((l, index) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group block py-4 px-5 rounded-lg transition-all duration-300 font-medium text-lg relative overflow-hidden ${
                      pathname === l.href
                        ? "bg-blue-600 text-white shadow-md transform scale-[1.02]"
                        : "text-gray-700 hover:bg-gray-100/80 hover:shadow-sm hover:transform hover:scale-[1.01]"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bottom decoration */}
            <div className="mt-12 pt-6 border-t border-gray-200/50">
              <div className="text-center">
                <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto"></div>
                <p className="text-xs text-gray-500 mt-3">
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
