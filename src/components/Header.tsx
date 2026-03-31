"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-serif font-bold text-navy text-lg group-hover:bg-gold-light transition-colors">
              T
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-lg font-semibold leading-tight">
                Texas Philanthropy
              </div>
              <div className="text-gold text-xs tracking-widest uppercase">
                Network
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="ml-4 px-6 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm rounded-lg transition-colors"
            >
              Donate
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10">
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
          </nav>
        </div>
      )}
    </header>
  );
}
