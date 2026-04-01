"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/transparency", label: "Transparency" },
  { href: "/board-members", label: "Board Members" },
  { href: "/requests", label: "Requests" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 text-white overflow-visible">
        {/* Logo - desktop: top left, mobile (home only): centered */}
        <Link
          href="/"
          className={`absolute z-20 lg:top-4 lg:left-8 ${
            isHome
              ? "block top-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-8"
              : "hidden lg:block top-4 left-8"
          }`}
          style={{ width: 370, height: 190 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Texas Philanthropy Network"
            style={{ width: 370, height: 190, objectFit: "contain" }}
          />
        </Link>

        {/* Nav bar */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-end h-16 gap-6">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/people/Texas-Philanthropy-Network/61562782527365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/50 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <Link
                  href="/donate"
                  className="ml-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded-lg transition-colors"
                >
                  Donate
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center justify-end h-16">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav - fullscreen overlay, rendered outside header */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-navy text-white lg:hidden">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="px-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-4 text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-4 mt-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg text-center transition-colors text-lg"
            >
              Donate
            </Link>
            <div className="flex items-center justify-center gap-4 px-4 py-4 border-t border-white/10 mt-4">
              <a
                href="https://www.facebook.com/people/Texas-Philanthropy-Network/61562782527365/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white"
              >
                <Facebook size={22} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
