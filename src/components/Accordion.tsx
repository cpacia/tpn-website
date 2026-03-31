"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionSection {
  title: string;
  content: string[];
}

export function Accordion({ sections }: { sections: AccordionSection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2 mt-4">
      {sections.map((section, i) => (
        <div key={i} className="border border-cream-dark rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-3 text-left text-sm font-semibold text-navy bg-cream/50 hover:bg-cream transition-colors"
          >
            {section.title}
            <ChevronDown
              size={18}
              className={`text-warm-gray transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 py-4 bg-white space-y-2">
              {section.content.map((item, j) => (
                <p key={j} className="text-warm-gray text-sm leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
