"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

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

          {userEmail ? (
            <>
              <li className="text-sm text-gray-600 hidden md:block">
                {userEmail}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-pink-700"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile toggle button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white shadow-md text-gray-700">
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
          {userEmail ? (
            <>
              <li className="border-t px-4 py-2 text-sm">{userEmail}</li>
              <li className="border-t">
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border-t">
                <Link
                  href="/login"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
              </li>
              <li className="border-t">
                <Link
                  href="/register"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}
