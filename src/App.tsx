import { useState, useEffect } from "react";
import { Instagram, Pin } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import ContactForm from "./components/ContactForm";
import DesignStudio from "./components/DesignStudio";
import { LandscapeProject, Inquiry } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedProjectForInquiry, setSelectedProjectForInquiry] = useState<LandscapeProject | null>(null);
  const [selectedStyleForInquiry, setSelectedStyleForInquiry] = useState<string>("");
  const [selectedQuoteForInquiry, setSelectedQuoteForInquiry] = useState<{ service: string; size: string; estimate: string } | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notification, setNotification] = useState<string>("");

  // Smooth-scroll to portfolio segment if we are already on the home page
  useEffect(() => {
    if (currentView === "portfolio-section" && currentView !== "portfolio") {
      const element = document.getElementById("portfolio-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentView]);

  // Auto-dismiss custom feedback notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
  };

  const handleSelectProjectForInquiry = (project: LandscapeProject) => {
    setSelectedProjectForInquiry(project);
    setSelectedStyleForInquiry("");
    setSelectedQuoteForInquiry(null);
    setCurrentView("contact");
    triggerNotification(`Luxury template details loaded for '${project.title}'.`);
  };

  const handleInquireStyle = (style: string) => {
    setSelectedStyleForInquiry(style);
    setSelectedProjectForInquiry(null);
    setSelectedQuoteForInquiry(null);
    setCurrentView("contact");
    triggerNotification(`Aesthetic style reference of '${style}' parsed into inquiry.`);
  };

  const handleSelectQuoteForInquiry = (quote: { service: string; size: string; estimate: string }) => {
    setSelectedQuoteForInquiry(quote);
    setSelectedProjectForInquiry(null);
    setSelectedStyleForInquiry("");
    setCurrentView("contact");
    triggerNotification(`Free quote of ${quote.estimate} saved! Opening request form.`);
  };

  const handleAddInquiry = (inquiryDetails: any) => {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      clientName: inquiryDetails.clientName,
      clientEmail: inquiryDetails.clientEmail,
      clientPhone: inquiryDetails.clientPhone,
      zipCode: inquiryDetails.zipCode,
      style: inquiryDetails.style,
      budget: inquiryDetails.budget,
      elements: inquiryDetails.elements,
      areaSize: inquiryDetails.areaSize,
      notes: inquiryDetails.notes,
      timestamp: new Date().toLocaleDateString()
    };

    setInquiries([newInquiry, ...inquiries]);
    triggerNotification("Estate garden survey commission files created!");
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-white flex flex-col">
      {/* Sticky Top App Bar */}
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        paletteCount={0}
      />

      {/* Floating Status Notification Alerts */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container border border-[#819986]/40 text-slate-100 font-semibold text-xs py-3.5 px-6 rounded-lg shadow-xl animate-in slide-in-from-bottom duration-300 flex items-center gap-2 select-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Primary Route/View Render Engines */}
      <main className="flex-grow">
        {currentView === "home" && (
          <div className="animate-in fade-in duration-500">
            {/* Cinematic Hero header banner */}
            <Hero 
              onStartTransformation={() => setCurrentView("contact")}
              onExplorePortfolio={() => setCurrentView("portfolio")}
              onSelectQuote={handleSelectQuoteForInquiry}
            />

            {/* Featured Portfolio Gallery block */}
            <Portfolio 
              onSelectProjectForEstimate={handleSelectProjectForInquiry}
              onInquireStyle={handleInquireStyle}
            />

            {/* Elegantly styled CTA panel */}
            <section className="py-20 bg-primary-container text-white">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
                <span className="text-[10px] text-amber-200 tracking-[0.2em] font-extrabold uppercase block mb-3">EXCLUSIVE SEASONAL OPENINGS</span>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-4 text-slate-100">Begin Your Evolution</h2>
                <p className="text-slate-300 font-sans text-xs md:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Limited openings available for private estate transformations in the upcoming season. Engage our master architectural designers.
                </p>
                <button 
                  onClick={() => {
                    setSelectedQuoteForInquiry(null);
                    setCurrentView("contact");
                  }}
                  className="bg-primary hover:bg-[#0b2014] text-white border border-[#819986]/30 font-bold text-xs tracking-widest py-4 px-12 transition duration-300 shadow-xl"
                >
                  START TRANSFORMATION
                </button>
              </div>
            </section>
          </div>
        )}

        {currentView === "portfolio" && (
          <div className="animate-in fade-in duration-500">
            <Portfolio 
              onSelectProjectForEstimate={handleSelectProjectForInquiry}
              onInquireStyle={handleInquireStyle}
            />
          </div>
        )}

        {currentView === "contact" && (
          <ContactForm 
            initialProject={selectedProjectForInquiry}
            initialStyle={selectedStyleForInquiry}
            initialQuote={selectedQuoteForInquiry}
            onAddInquiry={handleAddInquiry}
            inquiries={inquiries}
          />
        )}

        {currentView === "studio" && (
          <div className="animate-in fade-in duration-500">
            <DesignStudio 
              onAddCustomInquiry={handleAddInquiry}
              selectedDefaultStyle=""
            />
          </div>
        )}
      </main>

      {/* Consistent Luxury aesthetic footer */}
      <footer className="w-full pt-16 pb-10 bg-surface border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between px-6 lg:px-16 max-w-[1440px] mx-auto gap-12">
          
          <div className="flex flex-col gap-4 max-w-xs">
            <div 
              onClick={() => setCurrentView("home")}
              className="font-serif text-xl tracking-widest text-[#061b0e] font-semibold cursor-pointer hover:opacity-85 transition"
            >
              Carlos Landscaping
            </div>
            <p className="font-sans text-secondary text-xs leading-relaxed">
              Crafting exquisite living structures where architectural boundaries dissolve harmoniously into the surrounding nature.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
            <div className="flex flex-col gap-3.5">
              <p className="font-sans text-[#061b0e] text-[10px] font-extrabold tracking-[0.2em] mb-1">QUICK LINKS</p>
              <button onClick={() => setCurrentView("home")} className="text-xs text-secondary hover:text-primary transition-colors text-left font-semibold cursor-pointer">Home</button>
              <button onClick={() => setCurrentView("portfolio")} className="text-xs text-secondary hover:text-primary transition-colors text-left font-semibold cursor-pointer">Our Portfolio</button>
              <button onClick={() => setCurrentView("contact")} className="text-xs text-secondary hover:text-primary transition-colors text-left font-semibold cursor-pointer">Request Consultation</button>
            </div>

            <div className="flex flex-col gap-3.5">
              <p className="font-sans text-[#061b0e] text-[10px] font-extrabold tracking-[0.2em] mb-1">OFFICE STATION</p>
              <p className="text-xs text-[#605e57] leading-relaxed">
                9055 Philbin Ave<br />
                Riverside, CA 92503
              </p>
              <p className="text-xs text-primary font-bold tracking-wider">CarlosLandscape.org</p>
            </div>

            <div className="flex flex-col gap-3.5 col-span-2 md:col-span-1">
              <p className="font-sans text-[#061b0e] text-[10px] font-extrabold tracking-[0.2em] mb-1">VISUAL PORTFOLIO</p>
              <div className="flex items-center gap-2.5">
                <a 
                  href="https://instagram.com/carlos_landscaping" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded bg-primary/5 hover:bg-primary/10 text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer"
                  title="Instagram Portfolio"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://pinterest.com/carlos_landscaping" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded bg-primary/5 hover:bg-primary/10 text-secondary hover:text-primary flex items-center justify-center transition cursor-pointer"
                  title="Pinterest Boards"
                >
                  <Pin className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[11px] text-[#605e57] leading-relaxed">
                Follow our design inspiration & live garden aesthetics.
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mt-16 pt-8 border-t border-outline-variant/10">
          <p className="font-sans text-[#605e57] text-[11px] text-center md:text-left select-none">
            © 2026 Carlos Landscaping. All Rights Reserved. Crafted with precision for exceptional living spaces.
          </p>
        </div>
      </footer>
    </div>
  );
}
