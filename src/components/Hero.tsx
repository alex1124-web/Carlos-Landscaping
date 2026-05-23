import React, { useState, useMemo } from "react";
import { Sparkles, ArrowRight, Calculator, Check, Info } from "lucide-react";

interface HeroProps {
  onStartTransformation: () => void;
  onExplorePortfolio: () => void;
  onSelectQuote?: (quote: { service: string; size: string; estimate: string }) => void;
}

const SERVICES = [
  { id: "design", label: "Complete Landscape Design", estS: "$1,500 – $3,200", estM: "$3,500 – $7,500", estL: "$8,000 – $15,000", estXL: "$16,000 – $30,000" },
  { id: "cleanup", label: "Garden Restoration & Cleanups", estS: "$450 – $950", estM: "$1,000 – $2,200", estL: "$2,400 – $4,800", estXL: "$5,000 – $9,500" },
  { id: "irrigation", label: "Irrigation, Sprinklers & Drainage", estS: "$500 – $1,500", estM: "$1,800 – $3,500", estL: "$3,800 – $6,500", estXL: "$7,000 – $12,500" },
  { id: "hardscape", label: "Custom Stonework & Patios", estS: "$2,800 – $5,500", estM: "$6,000 – $14,000", estL: "$15,000 – $28,000", estXL: "$30,000 – $55,000" },
  { id: "care", label: "Regular Premium Lawn Care", estS: "$150 – $230/mo", estM: "$240 – $380/mo", estL: "$400 – $580/mo", estXL: "$600 – $980/mo" }
];

const SIZES = [
  { id: "S", label: "Small Garden", approx: "150 sq ft", formValue: "Small Garden (150 sq ft)" },
  { id: "M", label: "Medium Garden", approx: "200-300 sq ft", formValue: "Medium Garden (200-300 sq ft)" },
  { id: "L", label: "Large Garden", approx: "400-500 sq ft", formValue: "Large Garden (400-500 sq ft)" },
  { id: "XL", label: "Premium Plaza", approx: "600+ sq ft", formValue: "Premium Plaza / Estate (600+ sq ft)" }
];

export default function Hero({ onStartTransformation, onExplorePortfolio, onSelectQuote }: HeroProps) {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedSize, setSelectedSize] = useState("M");

  const computedEstimate = useMemo(() => {
    const serviceObj = SERVICES.find(s => s.id === selectedService);
    if (!serviceObj) return "To Be Custom Appraised";
    switch (selectedSize) {
      case "S": return serviceObj.estS;
      case "M": return serviceObj.estM;
      case "L": return serviceObj.estL;
      case "XL": return serviceObj.estXL;
      default: return serviceObj.estM;
    }
  }, [selectedService, selectedSize]);

  const handleApplyQuote = () => {
    const sObj = SERVICES.find(s => s.id === selectedService);
    const szObj = SIZES.find(sz => sz.id === selectedSize);
    if (sObj && szObj && onSelectQuote) {
      onSelectQuote({
        service: sObj.label,
        size: szObj.formValue,
        estimate: computedEstimate
      });
    } else {
      onStartTransformation();
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] w-full flex items-center justify-center overflow-hidden py-12 lg:py-4">
      {/* Background Image holding premium contrast shading */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Carlos Landscapes Masterwork"
          className="w-full h-full object-cover select-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe90CVHmHux-OTqN_ime0pr8WhVbHTdh-tLTuZq6NAQ8jhRkDYa3s6HNtfWC4mNtnnIsN0d6h0LuYr9PW2DQTDVmm4UKHf0c-e1PBSP3KarUeLT-V4mEOeBBXqNkcXsjnSXqvthcJIuOPy8d4Pd15-FhG3g2wRDrwyf2k4iTZvQ_daLk7aOQrRNAa2Ld6-Oq0WIbF0y2sqECWoPL0uWd8OtqdILYzQNUtpalbN2YcZPUf9GoComjEHL5WFbw27OhpzykAveIdNXVBm"
        />
        {/* Shading gradients to maximize readability of light text */}
        <div className="absolute inset-0 bg-[#0d2114]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#06140c]/70 via-[#0a1e12]/30 to-[#050f09]/80"></div>
      </div>

      {/* Primary Container Layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left column: Cinematic Title & Descriptive text */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.2em] font-extrabold text-amber-200">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />
            ESTATE GARDENS & LANDSCAPING
          </div>

          <h1 className="text-white font-serif text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.1] mb-5 tracking-tight font-bold select-none drop-shadow-xl">
            Carlo's Landscapes
          </h1>
          
          <p className="text-white/95 font-sans tracking-[0.2em] uppercase text-xs sm:text-sm font-semibold mb-6 max-w-xl">
            Bespoke outdoor architecture designed for exceptional living spaces.
          </p>

          <p className="text-white/80 font-sans text-xs sm:text-sm max-w-lg mb-8 leading-relaxed">
            From complete garden restorations in Riverside, CA to custom fine stone walkways and state-of-the-art water design systems. Experience professional mastery daily.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full sm:w-auto">
            <button
              onClick={onStartTransformation}
              id="cta-start-trans"
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-[#091b10] font-bold text-xs tracking-widest py-4 px-8 rounded transition shadow-xl flex items-center justify-center gap-2 group"
            >
              START TRANSFORMATION
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplorePortfolio}
              id="cta-explore-port"
              className="w-full sm:w-auto border-2 border-white/70 hover:bg-white/15 text-white font-bold text-xs tracking-widest py-3.5 px-8 rounded transition"
            >
              EXPLORE PORTFOLIO
            </button>
          </div>
        </div>

        {/* Right column: Subtle, Noticeable, Compact FREE Quote Estimator Engine */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#0f2418]/85 backdrop-blur-xl border border-white/10 rounded-lg p-6 lg:p-7 shadow-2xl text-white select-none">
            
            {/* Header / Interactive tags */}
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Calculator className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-bold text-white tracking-wide">
                    Instant Quote Estimator
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block font-sans">
                    100% Free Appraisal
                  </span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[9px] px-2.5 py-1 rounded tracking-widest uppercase border border-emerald-500/20">
                FREE APPRAISAL
              </span>
            </div>

            {/* Service Selection input list */}
            <div className="mb-4">
              <label className="text-[10px] text-white/60 font-bold uppercase tracking-wider block mb-1.5">
                CHOOSE LANDSCAPE SERVICE
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white/5 border border-white/15 text-white text-[12px] p-3 rounded font-serif focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/25 transition cursor-pointer"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#12281b] text-white py-2">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property size scale segmented buttons */}
            <div className="mb-5">
              <label className="text-[10px] text-white/60 font-bold uppercase tracking-wider block mb-2">
                ESTIMATED LANDSCAPE AREA
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz.id)}
                    className={`p-2 rounded text-center transition flex flex-col items-center justify-center border ${
                      selectedSize === sz.id
                        ? "bg-emerald-500/20 border-emerald-400 text-white"
                        : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-serif text-xs font-bold">{sz.id}</span>
                    <span className="text-[8px] opacity-75 mt-0.5 line-clamp-1">{sz.approx}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Output Display Area */}
            <div className="bg-white/5 border border-white/10 rounded-md p-4 mb-5 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[9px] text-[#8cb29a] font-bold uppercase tracking-widest mb-1 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ESTIMATED APPRAISAL RESULT
              </div>

              <div className="font-serif text-2xl lg:text-3xl font-bold text-white tracking-tight text-center drop-shadow">
                {computedEstimate}
              </div>

              <p className="text-[10px] text-white/70 font-sans tracking-wide text-center mt-2 flex items-center justify-center gap-1 leading-relaxed">
                <Info className="w-3 h-3 text-emerald-400 shrink-0" />
                This estimate qualifies for a fully <span className="font-bold underline text-white">FREE</span> on-site appraisal survey.
              </p>
            </div>

            {/* Primary checkout buttons */}
            <button
              onClick={handleApplyQuote}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#091b10] font-bold text-xs tracking-widest py-3 px-4 rounded transition duration-200 flex items-center justify-center gap-2"
            >
              <span>CLAIM FREE CONSULTATION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-center mt-3 text-[10px] text-white/50">
              No charge card required • Zero obligation
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
