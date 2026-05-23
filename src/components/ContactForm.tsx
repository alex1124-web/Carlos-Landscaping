import React, { useState, useEffect, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Edit3, Check, X } from "lucide-react";
import { LandscapeProject, Inquiry } from "../types";

interface ContactFormProps {
  initialProject?: LandscapeProject | null;
  initialStyle?: string;
  initialQuote?: { service: string; size: string; estimate: string } | null;
  onAddInquiry: (inquiry: any) => void;
  inquiries: Inquiry[];
}

export default function ContactForm({ initialProject, initialStyle, initialQuote, onAddInquiry, inquiries }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    style: "",
    areaSize: "Medium Garden (200-300 sq ft)",
    notes: ""
  });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [recipientEmail, setRecipientEmail] = useState(() => {
    return localStorage.getItem("carlos_destination_email") || "artthegoat1134@gmail.com";
  });
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);
  const [recipientInput, setRecipientInput] = useState(recipientEmail);

  const saveRecipientEmail = () => {
    if (recipientInput.trim()) {
      const emailValue = recipientInput.trim();
      localStorage.setItem("carlos_destination_email", emailValue);
      setRecipientEmail(emailValue);
      setIsEditingRecipient(false);
    }
  };

  const resetRecipientEmail = () => {
    localStorage.removeItem("carlos_destination_email");
    setRecipientEmail("artthegoat1134@gmail.com");
    setRecipientInput("artthegoat1134@gmail.com");
    setIsEditingRecipient(false);
  };

  useEffect(() => {
    if (initialProject) {
      setFormData(prev => ({
        ...prev,
        style: initialProject.category,
        notes: `Inquiry initiated from portfolio masterpiece: "${initialProject.title}".`
      }));
    } else if (initialQuote) {
      setFormData(prev => ({
        ...prev,
        style: initialQuote.service,
        areaSize: initialQuote.size,
        notes: `Requested Free Appraisal & On-Site Survey for service: "${initialQuote.service}". Model calculation: ${initialQuote.estimate}. Please arrange a consultation.`
      }));
    } else if (initialStyle) {
      setFormData(prev => ({
        ...prev,
        style: initialStyle,
        notes: `Refined design path selected: "${initialStyle}".`
      }));
    }
  }, [initialProject, initialStyle, initialQuote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      clientName: formData.name || "Estate Client",
      clientEmail: formData.email,
      clientPhone: formData.phone || "Not specified",
      style: formData.style || "Bespoke Classic Garden",
      budget: initialQuote ? initialQuote.estimate : (initialProject ? `Preset: ${initialProject.costCategory}` : "To Be Appraised"),
      elements: initialProject ? initialProject.scope.slice(0, 3) : ["Flora Restoration", "Bespoke Patios", "Living Water features"],
      areaSize: formData.areaSize,
      notes: formData.notes || "No additional parameters specified.",
      destinationEmail: recipientEmail
    };

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("[QUOTE INQUIRY API RESULT]", result);
    } catch (err) {
      console.error("[QUOTE INQUIRY API ERROR]", err);
    } finally {
      setSubmitting(false);
    }

    onAddInquiry(payload);
    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      style: "",
      areaSize: "Medium Garden (200-300 sq ft)",
      notes: ""
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="py-16 max-w-[1440px] mx-auto px-6 lg:px-16 animate-in fade-in duration-500">
      <div className="mb-10 text-center lg:text-left">
        <span className="text-secondary text-[11px] tracking-[0.2em] font-extrabold uppercase mb-2 block">
          COMMISSION AN ESTATE ARCHITECT
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary">
          Begin Your Garden Transformation
        </h2>
        <div className="h-[1px] w-full bg-outline-variant/30 mt-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact info channels */}
        <div className="lg:col-span-5 flex flex-col gap-8 bg-surface-container p-8 rounded-lg border border-outline-variant/10">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Office Station</h3>
            <p className="text-xs text-secondary leading-relaxed mb-4">
              Our designs require thorough on-site analysis. Reach us directly or submit an inquiry to schedule an architectural survey.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block">STUDIO LOCATION</span>
                  <span className="text-xs font-semibold text-primary">9055 Philbin Ave, Riverside, CA 92503</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block">EMAIL INQUIRIES / RECEIVER</span>
                    {!isEditingRecipient ? (
                      <button 
                        type="button"
                        onClick={() => {
                          setRecipientInput(recipientEmail);
                          setIsEditingRecipient(true);
                        }}
                        className="text-[9px] text-primary/60 hover:text-primary font-bold tracking-widest uppercase ml-2 flex items-center gap-1 cursor-pointer transition hover:underline"
                        title="Edit where quote requests are forwarded"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <button 
                          type="button"
                          onClick={resetRecipientEmail}
                          className="text-[9px] text-zinc-500 hover:text-zinc-700 font-extrabold tracking-widest uppercase cursor-pointer"
                          title="Reset to default owner email"
                        >
                          Default
                        </button>
                        <span className="text-zinc-300 text-[9px]">|</span>
                        <button 
                          type="button"
                          onClick={saveRecipientEmail}
                          className="text-[9px] text-emerald-700 hover:text-emerald-900 font-extrabold tracking-widest uppercase flex items-center gap-0.5 cursor-pointer"
                        >
                          <Check className="w-2.5 h-2.5" />
                          Save
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsEditingRecipient(false)}
                          className="text-[9px] text-red-600 hover:text-red-800 font-extrabold tracking-widest uppercase flex items-center gap-0.5 cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditingRecipient ? (
                    <span className="text-xs font-semibold text-primary block mt-0.5 select-all">{recipientEmail}</span>
                  ) : (
                    <div className="mt-1 flex flex-col gap-1.5 animate-in fade-in duration-200">
                      <input
                        type="email"
                        value={recipientInput}
                        onChange={(e) => setRecipientInput(e.target.value)}
                        className="w-full bg-background border border-primary/30 font-semibold text-xs p-1.5 rounded focus:border-emerald-600 focus:outline-none"
                        placeholder="owner@example.com"
                        required
                      />
                      <span className="text-[9px] text-[#737973] leading-normal block">
                        Prospect quote entries submitted on this page will route directly to this custom inbox.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block">DIRECT PHONE</span>
                  <span className="text-xs font-semibold text-primary">(951) 321-4467</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-outline-variant/15 w-full"></div>

          <div>
            <h4 className="font-serif text-sm font-bold text-primary mb-2">Hours of Operation</h4>
            <div className="text-xs text-secondary flex flex-col gap-1.5 font-medium">
              <div className="flex justify-between"><span>Monday — Friday:</span><span className="font-semibold text-primary">8:00 AM — 5:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday:</span><span className="font-semibold text-primary">9:00 AM — 2:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday:</span><span className="font-semibold text-primary">Closed for Design Study</span></div>
            </div>
          </div>
        </div>

        {/* Input fields */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-outline-variant/15 shadow-sm">
          {success && (
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded flex items-center gap-3 text-xs text-primary font-medium">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <p className="font-bold">Inquiry Registered Successfully!</p>
                <p className="text-[11px] text-secondary">Our lead master gardener is reviewing your design reference parameters.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (951) 555-0199"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                  AESTHETIC STYLE OR CLASS
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Minimalist, Japanese Sanctuary"
                  value={formData.style}
                  onChange={e => setFormData({ ...formData, style: e.target.value })}
                  className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                APPROXIMATE PROPERTY SIZE
              </label>
              <select
                value={formData.areaSize}
                onChange={e => setFormData({ ...formData, areaSize: e.target.value })}
                className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition"
              >
                <option>Small Garden (150 sq ft)</option>
                <option>Medium Garden (200-300 sq ft)</option>
                <option>Large Garden (400-500 sq ft)</option>
                <option>Premium Plaza / Estate (600+ sq ft)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">
                DESIGN PRE-SET PARAMETERS & PROJECT NOTES
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detail materials, specific botanical desires, or landscape installation notes here..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-background border border-outline-variant/30 font-semibold text-xs p-3 rounded focus:border-primary focus:outline-none transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-primary hover:bg-[#0b2014] disabled:bg-primary/50 text-white font-bold text-xs tracking-widest py-4 px-6 rounded transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className={`w-3.5 h-3.5 ${submitting ? "animate-pulse" : ""}`} />
              {submitting ? "TRANSMITTING SECURE ARCHIVE..." : "SUBMIT INQUIRY SHEET"}
            </button>
          </form>
        </div>
      </div>

      {/* Inquiry Archive Registry */}
      {inquiries.length > 0 && (
        <div className="mt-16 pt-12 border-t border-outline-variant/20">
          <span className="text-[10px] text-secondary uppercase tracking-wider block font-bold mb-6">
            LOGGED SURVEY & INQUIRY STATUSES ({inquiries.length})
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 bg-surface-container border border-outline-variant/10 rounded-lg shadow-sm text-xs flex flex-col gap-3"
              >
                <div className="flex justify-between items-center select-none font-bold text-primary">
                  <span className="bg-primary/5 px-2.5 py-0.5 rounded uppercase tracking-wider text-[9px]">
                    ACTIVE COMMISSION SURVEY
                  </span>
                  <span className="text-secondary/70">{inq.timestamp}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-secondary font-medium">
                  <div>
                    <span className="text-[9px] block text-[#737973] uppercase tracking-wider">Aesthetic Preference</span>
                    <span className="text-primary font-semibold select-all text-xs">{inq.style}</span>
                  </div>
                  <div>
                    <span className="text-[9px] block text-[#737973] uppercase tracking-wider">Appraisal Value</span>
                    <span className="text-primary font-semibold text-xs text-emerald-800">{inq.budget}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] block text-[#737973] uppercase tracking-wider">Surveyor Status</span>
                    <span className="text-primary font-semibold text-xs">Awaiting Site Appraisal</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] block text-[#737973] uppercase tracking-wider">Estate Area Influence</span>
                    <span className="text-primary font-semibold text-xs truncate max-w-full">{inq.areaSize}</span>
                  </div>
                </div>

                <div className="bg-white/50 p-2.5 border border-outline-variant/10 rounded mt-1">
                  <span className="text-[9px] block text-[#737973] uppercase tracking-wider mb-0.5">Parameters Configured</span>
                  <p className="text-secondary tracking-normal text-[11px] leading-relaxed italic">
                    "{inq.notes}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
