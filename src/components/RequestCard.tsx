"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface RequestCardProps {
  id: string;
  title: string;
  description: string;
  requestedAmount: number;
  fundedAmount: number;
  fullyFunded: boolean;
  date: string | null;
  imageUrl: string | null;
}

const presetAmounts = [25, 50, 100, 250];

export function RequestCard({
  title,
  description,
  requestedAmount,
  fundedAmount,
  fullyFunded,
  date,
  imageUrl,
}: RequestCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const descriptionIsLong = description.length > 150;

  const progress =
    requestedAmount > 0
      ? Math.min(100, (fundedAmount / requestedAmount) * 100)
      : 0;

  const remaining = Math.max(0, requestedAmount - fundedAmount);
  const donationAmount = selectedAmount ?? (parseFloat(customAmount) || 0);

  function handleDonate() {
    // TODO: Wire up to Stripe
    alert(
      `Stripe integration coming soon!\n\nDonating $${donationAmount} to: ${title}`
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cream-dark overflow-hidden transition-shadow hover:shadow-md flex flex-col">
      {imageUrl && (
        <img src={imageUrl} alt="" className="w-full h-48 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl font-semibold text-navy">
            {title}
          </h3>
          {fullyFunded && (
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap ml-2">
              Fully Funded
            </span>
          )}
        </div>

        {date && (
          <p className="text-sm text-warm-gray mb-3">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div className="mb-5">
          <p
            className={`text-warm-gray leading-relaxed whitespace-pre-line ${
              !showFullDescription && descriptionIsLong ? "line-clamp-3" : ""
            }`}
          >
            {description}
          </p>
          {descriptionIsLong && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-gold-dark hover:text-gold font-medium mt-1"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Funding progress */}
        <div className="mt-auto space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-navy font-medium">
              ${fundedAmount.toLocaleString()} raised
            </span>
            <span className="text-warm-gray">
              of ${requestedAmount.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${
                fullyFunded ? "bg-green-500" : "bg-gold"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Donate button / expanded form */}
        {fullyFunded ? (
          <p className="text-sm text-green-700 font-medium text-center py-2">
            This request has been fully funded. Thank you!
          </p>
        ) : expanded ? (
          <div className="border-t border-cream-dark pt-5 space-y-4">
            <p className="text-sm text-navy font-medium">
              ${remaining.toLocaleString()} still needed
            </p>

            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-colors border-2 ${
                    selectedAmount === amt
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-gray-200 text-navy hover:border-gold/50"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy font-medium text-sm">
                $
              </span>
              <input
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Other amount"
                className={`w-full pl-7 pr-3 py-2.5 border-2 rounded-lg text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-gold ${
                  selectedAmount === null && customAmount
                    ? "border-gold bg-gold/10"
                    : "border-gray-200"
                }`}
              />
            </div>

            <button
              onClick={handleDonate}
              disabled={donationAmount <= 0}
              className="w-full py-3 bg-gold hover:bg-gold-light text-navy font-bold rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Heart size={16} />
              Donate ${donationAmount > 0 ? donationAmount.toLocaleString() : ""}
            </button>

            <button
              onClick={() => setExpanded(false)}
              className="w-full text-sm text-warm-gray hover:text-navy transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="w-full py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-sm inline-flex items-center justify-center gap-2"
          >
            <Heart size={16} />
            Donate to This Request
          </button>
        )}
      </div>
    </div>
  );
}
