"use client";

import { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";

const categories = [
  "Domestic Violence",
  "Sexual Assault",
  "Suicide Awareness",
  "PTSD",
  "Autism Awareness",
  "Supporting Childhood",
  "Childhood Hunger",
  "Texas Flood Relief",
];

const presetAmounts = [25, 50, 100, 150, 250, 500];

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const donationAmount = selectedAmount ?? (parseFloat(customAmount) || 0);

  function handleAmountClick(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handleCustomAmountChange(value: string) {
    setCustomAmount(value);
    setSelectedAmount(null);
  }

  function handleDonate() {
    // TODO: Wire up to Stripe
    alert(
      `Stripe integration coming soon!\n\nCategory: ${selectedCategory}\nAmount: $${donationAmount}\nFrequency: ${frequency}`
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-light)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Make a Difference
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Donate Now
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Your generosity directly supports Texas families and communities in
            need. Every dollar makes a difference.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-cream-dark overflow-hidden">
            {/* Step 1: Choose a cause */}
            <div className="p-8 sm:p-10 border-b border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-navy mb-2">
                1. Choose a Cause
              </h2>
              <p className="text-warm-gray text-sm mb-6">
                Select the focus area you&apos;d like to support.
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-navy text-white"
                        : "bg-cream text-navy/70 hover:bg-cream-dark"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Frequency */}
            <div className="p-8 sm:p-10 border-b border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-navy mb-2">
                2. Frequency
              </h2>
              <p className="text-warm-gray text-sm mb-6">
                Choose a one-time gift or set up a recurring donation.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors border-2 ${
                    frequency === "one-time"
                      ? "border-navy bg-navy text-white"
                      : "border-cream-dark bg-white text-navy hover:border-navy/30"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors border-2 ${
                    frequency === "monthly"
                      ? "border-navy bg-navy text-white"
                      : "border-cream-dark bg-white text-navy hover:border-navy/30"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Step 3: Amount */}
            <div className="p-8 sm:p-10 border-b border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-navy mb-2">
                3. Select Amount
              </h2>
              <p className="text-warm-gray text-sm mb-6">
                Choose a preset amount or enter a custom one.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountClick(amount)}
                    className={`py-4 rounded-xl text-lg font-bold transition-colors border-2 ${
                      selectedAmount === amount
                        ? "border-gold bg-gold/10 text-navy"
                        : "border-cream-dark bg-white text-navy hover:border-gold/50"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy font-bold text-lg">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Custom amount"
                  className={`w-full pl-8 pr-4 py-4 border-2 rounded-xl text-lg font-medium text-navy focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
                    selectedAmount === null && customAmount
                      ? "border-gold bg-gold/10"
                      : "border-cream-dark"
                  }`}
                />
              </div>
            </div>

            {/* Summary & Donate */}
            <div className="p-8 sm:p-10 bg-cream/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-warm-gray">Your donation</p>
                  <p className="text-navy font-medium">
                    {selectedCategory} &middot;{" "}
                    {frequency === "monthly" ? "Monthly" : "One-time"}
                  </p>
                </div>
                <div className="text-3xl font-bold text-navy font-serif">
                  ${donationAmount.toLocaleString()}
                </div>
              </div>
              <button
                onClick={handleDonate}
                disabled={donationAmount <= 0}
                className="w-full py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                <Heart size={20} />
                Donate ${donationAmount > 0 ? donationAmount.toLocaleString() : ""}
                {frequency === "monthly" ? " / month" : ""}
              </button>
              <p className="text-xs text-warm-gray text-center mt-4">
                Payments are securely processed via Stripe. You will be
                redirected to complete your donation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-6">
            Your Generosity, Our Commitment
          </h2>
          <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We believe in complete financial transparency. Every dollar donated
            is tracked and reported on our transparency page so you can see
            exactly how your contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/transparency"
              className="inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy-light text-white font-medium rounded-lg transition-colors"
            >
              View Transparency Report
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy/20 hover:border-navy/40 text-navy font-medium rounded-lg transition-colors"
            >
              Learn About Our Mission
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
