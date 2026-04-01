"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Facebook } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Contact Us
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Have a question, want to get involved, or need more information?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                  Reach Out to Us
                </h2>
                <p className="text-warm-gray leading-relaxed">
                  Whether you have questions about our programs, want to
                  volunteer, or need assistance, our team is here to help.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={18} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">Phone</p>
                    <a
                      href="tel:+15129980731"
                      className="text-warm-gray hover:text-navy transition-colors"
                    >
                      (512) 998-0731
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={18} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">Email</p>
                    <a
                      href="mailto:admin@texasphilanthropynetwork.org"
                      className="text-warm-gray hover:text-navy transition-colors"
                    >
                      admin@texasphilanthropynetwork.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">
                      Mailing Address
                    </p>
                    <p className="text-warm-gray">
                      700 Smith St #61070
                      <br />
                      SMB#68719
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Facebook size={18} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">
                      Facebook
                    </p>
                    <a
                      href="https://www.facebook.com/people/Texas-Philanthropy-Network/61562782527365/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-gray hover:text-navy transition-colors"
                    >
                      Texas Philanthropy Network
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-navy mb-3">
                    Thank You!
                  </h3>
                  <p className="text-warm-gray leading-relaxed mb-6">
                    Your message has been sent successfully. We&apos;ll get back
                    to you as soon as possible. You can also reach us directly at{" "}
                    <a
                      href="mailto:admin@texasphilanthropynetwork.org"
                      className="text-gold-dark hover:text-gold"
                    >
                      admin@texasphilanthropynetwork.org
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setSubject("");
                      setMessage("");
                    }}
                    className="text-sm text-gold-dark hover:text-gold font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8 sm:p-10">
                  <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-navy mb-2"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-navy"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-navy mb-2"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-navy"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-navy mb-2"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-navy"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-navy mb-2"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-navy"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
