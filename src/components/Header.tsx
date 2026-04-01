"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <header className="absolute top-0 left-0 right-0 z-50 text-white overflow-visible">
      {/* Logo - positioned absolutely in top left, allowed to overflow */}
      <Link
        href="/"
        className="absolute top-4 left-8 z-20"
        style={{ width: 280, height: 144 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Texas Philanthropy Network"
          style={{ width: 336, height: 173, objectFit: "contain" }}
        />
      </Link>

      {/* Nav bar */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-end h-16 gap-6">
            {/* Nav Links */}
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

            {/* Social Links + Donate */}
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

          {/* Mobile */}
          <div className="lg:hidden flex items-center justify-end h-16">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy/90 backdrop-blur-md border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 mt-2 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg text-center transition-colors"
            >
              Donate
            </Link>
            <div className="flex items-center gap-4 px-4 pt-4 border-t border-white/10 mt-4">
              <a href="https://www.facebook.com/people/Texas-Philanthropy-Network/61562782527365/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white"><Facebook size={20} /></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
