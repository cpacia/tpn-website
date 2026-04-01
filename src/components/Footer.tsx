import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/transparency", label: "Transparency" },
  { href: "/board-members", label: "Board Members" },
  { href: "/requests", label: "Requests" },
  { href: "/contact", label: "Contact Us" },
];

const causeLinks = [
  { href: "/about#childhood-hunger", label: "Ending Childhood Hunger" },
  { href: "/about#domestic-violence", label: "Domestic Violence Prevention" },
  { href: "/about#suicide-prevention", label: "Suicide Prevention" },
  { href: "/about#sexual-assault", label: "Sexual Assault Prevention" },
  { href: "/about#autism", label: "Autism Awareness" },
  { href: "/about#ptsd", label: "PTSD Awareness" },
  { href: "/about#childhood-dreams", label: "Supporting Childhood Dreams" },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Texas Philanthropy Network"
                width={160}
                height={70}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mt-4">
              A collaborative alliance committed to addressing Texas&apos;s most
              pressing social challenges through direct community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Causes
            </h3>
            <ul className="space-y-2">
              {causeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone size={16} className="mt-0.5 text-gold shrink-0" />
                <span>(512) 998-0731</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={16} className="mt-0.5 text-gold shrink-0" />
                <a
                  href="mailto:admin@texasphilanthropynetwork.org"
                  className="hover:text-gold transition-colors"
                >
                  admin@texasphilanthropynetwork.org
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
                <span>700 Smith St #61070, SMB#68719</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Texas Philanthropy Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
