import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { RequestCard } from "@/components/RequestCard";

export const metadata: Metadata = {
  title: "Requests for Assistance",
  description: "View and support real needs from members of our Texas community. Your generosity can make a direct impact.",
};

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const requests = await prisma.publicRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Community Support
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Requests for Assistance
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            These are real needs from members of our Texas community. Your
            generosity can make a direct impact in someone&apos;s life.
          </p>
          <Link
            href="/requests/submit"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg"
          >
            Submit a Request
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Requests Grid */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {requests.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-warm-gray text-lg">
                No active requests at this time. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  id={req.id}
                  title={req.title}
                  description={req.description}
                  requestedAmount={req.requestedAmount}
                  fundedAmount={req.fundedAmount}
                  fullyFunded={req.fullyFunded}
                  date={req.date?.toISOString() ?? null}
                  imageUrl={req.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Need Assistance?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            If you or someone you know is in need, submit a request for
            assistance. All submissions are reviewed and kept anonymous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/requests/submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg"
            >
              Submit a Request
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-lg transition-colors text-lg"
            >
              Make a Donation
              <Heart size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
