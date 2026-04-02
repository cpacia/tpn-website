import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Board Members",
  description: "Meet the dedicated individuals who guide the Texas Philanthropy Network's mission.",
};

const boardMembers = [
  {
    name: "Caitlin Williams",
    role: "President",
    photo: "/caitlin-williams.png",
    bio: "Caitlin Williams is a dedicated philanthropist committed to creating a lasting impact through advocacy, outreach, and community engagement. With a deep passion for supporting initiatives that empower individuals and families, Caitlin works tirelessly to address issues such as poverty, hunger, education, and mental health. Her background in nonprofit development and her hands-on experience in various volunteer roles have shaped her understanding of the transformative power of accessible resources and inclusive support systems.",
    extended:
      "Driven by a belief in equal opportunity, Caitlin has collaborated with organizations across Texas to provide essential resources to underserved communities and to raise awareness around critical social issues. Caitlin's vision is a world where all individuals have the opportunity to thrive. Through her work, she continues to champion causes that reflect her core values: compassion, integrity, and an unwavering commitment to positive change. Whether she's organizing community events, supporting local charities, or advocating for policy changes, Caitlin is a powerful force for good in the philanthropic community.",
  },
  {
    name: "Jim Cogburn",
    role: "Treasurer",
    photo: "/jim-cogburn.png",
    bio: "Jim Cogburn is a prominent philanthropist and advocate for community development in Texas. With a career spanning over two decades, he has made significant contributions to various sectors, including education, healthcare, and social services. As the founder of the Cogburn Foundation, Jim focuses on innovative solutions to pressing social issues, partnering with local organizations to enhance their impact.",
    extended:
      "A graduate of Abilene Christian University, Jim is deeply committed to fostering collaboration among nonprofits and driving sustainable change. He serves on multiple boards, where he champions initiatives that promote equity and access for underserved populations. Outside of his philanthropic endeavors, Jim enjoys exploring Texas's natural beauty and supporting local arts and culture.",
  },
  {
    name: "Chris Pacia",
    role: "Secretary",
    bio: "Chris Pacia is a dedicated philanthropist and community leader based in New Hampshire. With a strong foundation in Christian values, he is committed to making a positive impact in the lives of others. Chris actively supports various charitable initiatives focused on education, poverty alleviation, and community development.",
    extended:
      "His leadership and passion for service inspire those around him to engage in meaningful giving and community involvement. Through his work, Chris embodies the spirit of compassion and generosity, striving to uplift and empower individuals and families across Texas.",
  },
];

export default function BoardMembersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Leadership
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Our Board Members
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Meet the dedicated individuals who guide the Texas Philanthropy
            Network&apos;s mission and ensure our commitment to transparent,
            impactful giving.
          </p>
        </div>
      </section>

      {/* Board Members */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-sm border border-cream-dark overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Avatar */}
                  <div className="md:w-64 shrink-0 bg-navy/5 flex items-center justify-center p-12 md:p-8">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-40 h-40 rounded-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-navy/10 flex items-center justify-center">
                        <User size={48} className="text-navy/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 sm:p-10">
                    <div className="mb-4">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                        {member.name}
                      </h2>
                      <span className="inline-block mt-2 text-sm font-medium px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-warm-gray leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <p className="text-warm-gray leading-relaxed">
                      {member.extended}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Together with our board and community partners, we&apos;re building a
            stronger, more compassionate Texas.
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
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-lg transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
