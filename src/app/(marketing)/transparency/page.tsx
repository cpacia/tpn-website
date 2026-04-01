import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, DollarSign, Heart, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Transparency",
  description: "See exactly where every dollar goes. Complete financial transparency from the Texas Philanthropy Network.",
};

export const dynamic = "force-dynamic";

export default async function TransparencyPage() {
  const [donations, expenses] = await Promise.all([
    prisma.transparencyDonation.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.transparencyExpense.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const totalDonations = donations
    .filter((d) => d.amount != null)
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);

  const totalOperating = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Transparency
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Where Every Dollar Goes
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            We believe in complete financial transparency. Here is a detailed
            record of how donations have been used to support Texas families and
            communities.
          </p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="relative -mt-1 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-b-2xl shadow-lg border border-cream-dark p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <DollarSign size={24} className="text-gold-dark" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">
                  ${totalDonations.toLocaleString()}
                </div>
                <div className="text-sm text-warm-gray">Direct Donations</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Heart size={24} className="text-gold-dark" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">
                  {donations.length}
                </div>
                <div className="text-sm text-warm-gray">Acts of Giving</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <CheckCircle size={24} className="text-gold-dark" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">100%</div>
                <div className="text-sm text-warm-gray">Accountability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Record */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
              Donation Record
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
              Direct Community Support
            </h2>
            <p className="text-warm-gray text-lg">
              Every donation we receive goes directly toward helping Texas
              families and communities in need.
            </p>
          </div>

          <div className="space-y-4">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-cream-dark flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-navy font-medium">
                    {donation.description}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-gold/10 text-gold-dark">
                    {donation.category}
                  </span>
                </div>
                {donation.amount != null && (
                  <div className="text-xl font-bold text-navy font-serif shrink-0">
                    ${donation.amount.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Expenses */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
              Operating Expenses
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
              Organizational Costs
            </h2>
            <p className="text-warm-gray text-lg">
              In the interest of full transparency, here are the operating
              expenses required to run the Texas Philanthropy Network.
            </p>
          </div>

          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-cream/50 rounded-xl p-6 border border-cream-dark flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <p className="text-navy font-medium flex-1">
                  {expense.description}
                </p>
                <div className="text-xl font-bold text-navy font-serif shrink-0">
                  ${expense.amount.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="bg-navy rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 text-white">
              <p className="font-medium flex-1">Total Operating Expenses</p>
              <div className="text-xl font-bold font-serif shrink-0">
                ${totalOperating.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Support Transparent Giving
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Your donation goes directly to helping Texas families and
            communities. We account for every dollar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg"
            >
              Make a Donation
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-lg transition-colors text-lg"
            >
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
