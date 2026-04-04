"use client";
import { useState } from 'react';

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="group border-b border-zinc-900 py-6 cursor-pointer outline-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className={`font-light tracking-wide text-lg md:text-xl transition-colors duration-300 group-hover:text-[#f3c5ae] ${isOpen ? "text-[#f3c5ae]" : "text-zinc-300"}`}>
        {q}
      </h3>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="pt-4 text-zinc-400 leading-relaxed font-light text-sm md:text-base pr-8">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
