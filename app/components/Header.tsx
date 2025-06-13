// app/components/Header.tsx
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

        <ul className="hidden md:flex space-x-8 text-gray-700">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-gray-900">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-white shadow-md">
          {links.map((l) => (
            <li key={l.href} className="border-t">
              <Link
                href={l.href}
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
