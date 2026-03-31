import Link from "next/link";
import {
  Heart,
  Shield,
  Brain,
  Star,
  Ribbon,
  UtensilsCrossed,
  HandHeart,
  ArrowRight,
  Users,
  DollarSign,
  Target,
} from "lucide-react";

const causes = [
  {
    icon: UtensilsCrossed,
    title: "Ending Childhood Hunger",
    description:
      "Providing meals and resources to ensure no Texas child goes hungry.",
    color: "bg-amber-50 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: Shield,
    title: "Domestic Violence Prevention",
    description:
      "Supporting survivors and working toward safe communities for all families.",
    color: "bg-purple-50 text-purple-700",
    iconBg: "bg-purple-100",
  },
  {
    icon: Heart,
    title: "Suicide Prevention",
    description:
      "Promoting mental health awareness and providing crisis support resources.",
    color: "bg-rose-50 text-rose-700",
    iconBg: "bg-rose-100",
  },
  {
    icon: Ribbon,
    title: "Sexual Assault Prevention",
    description:
      "Advocating for survivors and funding education and prevention programs.",
    color: "bg-teal-50 text-teal-700",
    iconBg: "bg-teal-100",
  },
  {
    icon: Brain,
    title: "Autism Awareness",
    description:
      "Supporting individuals and families affected by autism across Texas.",
    color: "bg-blue-50 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: HandHeart,
    title: "PTSD Awareness",
    description:
      "Helping those affected by PTSD access treatment, support, and understanding.",
    color: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Star,
    title: "Supporting Childhood Dreams",
    description:
      "Empowering children to pursue their potential through mentorship and resources.",
    color: "bg-orange-50 text-orange-700",
    iconBg: "bg-orange-100",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Lives Impacted" },
  { icon: Target, value: "7", label: "Focus Areas" },
  { icon: DollarSign, value: "100%", label: "Transparent Giving" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
              Making a Difference in Texas
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Building a Stronger,
              <br />
              <span className="text-gold">More Hopeful</span> Texas
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              A collaborative alliance committed to addressing Texas&apos;s most
              pressing social challenges through direct, transparent community
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 50.7C840 56 960 64 1080 64C1200 64 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              className="fill-cream"
            />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-1 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-cream-dark p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <stat.icon size={24} className="text-gold-dark" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-sm text-warm-gray">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
              Our Focus Areas
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
              Seven Pillars of Change
            </h2>
            <p className="text-warm-gray text-lg">
              We address Texas&apos;s most critical social challenges through
              targeted programs and direct community support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => (
              <div
                key={cause.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md border border-cream-dark hover:border-gold/30 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${cause.iconBg} flex items-center justify-center mb-5`}
                >
                  <cause.icon size={28} className={cause.color.split(" ")[1]} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-3">
                  {cause.title}
                </h3>
                <p className="text-warm-gray leading-relaxed mb-4">
                  {cause.description}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-sm font-medium text-gold-dark hover:text-gold group-hover:translate-x-1 transition-all"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
                About Us
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-6">
                A Collaborative Alliance for{" "}
                <span className="text-gold-dark">Positive Change</span>
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                The Texas Philanthropy Network is dedicated to creating
                meaningful impact across seven critical focus areas. We believe
                in the power of community-driven giving and transparent
                stewardship of every dollar donated.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Our mission is to build a safer, healthier, and more hopeful
                state for all Texans. Through direct assistance, advocacy, and
                collaboration, we work to address the root causes of social
                challenges facing our communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy-light text-white font-medium rounded-lg transition-colors"
                >
                  Our Mission
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  href="/transparency"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy/20 hover:border-navy/40 text-navy font-medium rounded-lg transition-colors"
                >
                  View Transparency Report
                </Link>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="bg-cream rounded-2xl p-10 relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-navy font-serif">
                      7
                    </div>
                    <div className="text-sm text-warm-gray mt-1">
                      Focus Areas
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-navy font-serif">
                      3
                    </div>
                    <div className="text-sm text-warm-gray mt-1">
                      Board Members
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm text-center col-span-2">
                    <div className="text-3xl font-bold text-gold-dark font-serif">
                      100%
                    </div>
                    <div className="text-sm text-warm-gray mt-1">
                      Financial Transparency
                    </div>
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy/5 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Whether through a donation, volunteering, or submitting a request
            for assistance, there are many ways to get involved with the Texas
            Philanthropy Network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg"
            >
              Donate Now
              <Heart size={20} className="ml-2" />
            </Link>
            <Link
              href="/requests"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-lg transition-colors text-lg"
            >
              Request Assistance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
