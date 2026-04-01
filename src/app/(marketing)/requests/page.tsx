import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";

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
              {requests.map((req) => {
                const progress = req.requestedAmount > 0
                  ? Math.min(100, (req.fundedAmount / req.requestedAmount) * 100)
                  : 0;

                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl shadow-sm border border-cream-dark overflow-hidden"
                  >
                    {req.imageUrl && (
                      <img
                        src={req.imageUrl}
                        alt=""
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-xl font-semibold text-navy">
                          {req.title}
                        </h3>
                        {req.fullyFunded && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                            Fully Funded
                          </span>
                        )}
                      </div>

                      {req.date && (
                        <p className="text-sm text-warm-gray mb-3">
                          {new Date(req.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}

                      <p className="text-warm-gray leading-relaxed mb-5">
                        {req.description}
                      </p>

                      {/* Funding progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-navy font-medium">
                            ${req.fundedAmount.toLocaleString()} raised
                          </span>
                          <span className="text-warm-gray">
                            of ${req.requestedAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full transition-all ${
                              req.fullyFunded ? "bg-green-500" : "bg-gold"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
