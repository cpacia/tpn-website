"use client";

import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Shield,
  Brain,
  Star,
  Ribbon,
  UtensilsCrossed,
  HandHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Star,
  Shield,
  Heart,
  HandHeart,
  Ribbon,
  Brain,
};

interface LearnMoreSection {
  title: string;
  content: string[];
}

interface FocusAreaCardProps {
  id: string;
  iconName: string;
  title: string;
  goal: string;
  how: string;
  iconBg: string;
  iconColor: string;
  learnMore: LearnMoreSection[];
  reversed?: boolean;
}

export function FocusAreaCard({
  id,
  iconName,
  title,
  goal,
  how,
  iconBg,
  iconColor,
  learnMore,
  reversed,
}: FocusAreaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const Icon = iconMap[iconName] || Heart;

  return (
    <div
      id={id}
      className={`flex flex-col md:flex-row gap-8 items-start p-8 sm:p-10 rounded-2xl border border-cream-dark bg-cream/50 ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
      >
        <Icon size={32} className={iconColor} />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
          {title}
        </h3>
        <div className="space-y-3">
          <p className="text-warm-gray leading-relaxed">
            <span className="font-semibold text-navy">Goal: </span>
            {goal}
          </p>
          <p className="text-warm-gray leading-relaxed">
            <span className="font-semibold text-navy">How we help: </span>
            {how}
          </p>
        </div>

        <button
          onClick={() => {
            setExpanded(!expanded);
            if (expanded) setOpenSection(null);
          }}
          className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-gold-dark hover:text-gold transition-colors"
        >
          {expanded ? "Show Less" : "Learn More"}
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="space-y-2 mt-4">
            {learnMore.map((section, i) => (
              <div
                key={i}
                className="border border-cream-dark rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenSection(openSection === i ? null : i)
                  }
                  className="w-full flex items-center justify-between px-5 py-3 text-left text-sm font-semibold text-navy bg-cream/50 hover:bg-cream transition-colors"
                >
                  {section.title}
                  <ChevronDown
                    size={18}
                    className={`text-warm-gray shrink-0 transition-transform ${
                      openSection === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === i && (
                  <div className="px-5 py-4 bg-white space-y-2">
                    {section.content.map((item, j) => (
                      <p
                        key={j}
                        className="text-warm-gray text-sm leading-relaxed"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
