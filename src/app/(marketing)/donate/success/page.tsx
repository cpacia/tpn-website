import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Thank You — Texas Philanthropy Network",
};

export default function DonateSuccessPage() {
  return (
    <section className="bg-cream py-28 sm:py-36 min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-cream-dark p-10 sm:p-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 text-gold-dark mb-6">
            <Heart size={32} />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
            Thank You for Your Generosity
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed mb-8">
            Your donation has been received. A receipt will be emailed to you
            shortly. Every dollar goes directly toward supporting Texas
            families and communities in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/transparency"
              className="inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy-light text-white font-medium rounded-lg transition-colors"
            >
              See How Donations Are Used
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy/20 hover:border-navy/40 text-navy font-medium rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
