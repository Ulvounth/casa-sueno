"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur z-20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Casa Sueño
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-gray-900">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
