import { Menu, Search, Compass, HardHat, DollarSign, Sprout, Sparkles, X, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  paletteCount: number;
}

export default function Header({ currentView, onViewChange, paletteCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "HOME", icon: Compass },
    { id: "portfolio", label: "PORTFOLIO", icon: HardHat }
  ];

  return (
    <header id="navbar" className="w-full top-0 sticky z-50 bg-background/95 backdrop-blur-md transition-all duration-300 h-16 border-b border-outline-variant/10 px-6 lg:px-16 flex items-center justify-between">
      {/* Brand logo and mobile controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-1 text-primary hover:bg-secondary-container/50 rounded-md transition"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div 
          onClick={() => onViewChange("home")} 
          className="font-serif text-lg lg:text-xl tracking-widest text-primary cursor-pointer hover:opacity-85 select-none font-semibold"
        >
          Carlos Landscaping
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 items-center">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`text-xs font-semibold tracking-widest transition-colors duration-300 pb-1 border-b-2 hover:text-primary ${
                isActive 
                  ? "text-primary border-primary" 
                  : "text-secondary border-transparent"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Contact Trigger / Minimalist status bar */}
      <div className="flex items-center gap-4">
        <span className="hidden md:inline-block text-[11px] font-bold text-secondary/70 tracking-widest uppercase">
          RIVERSIDE, CA
        </span>
        <button
          onClick={() => onViewChange("contact")}
          className="p-1 px-[18px] py-2 rounded text-[10px] font-bold tracking-widest bg-primary hover:bg-primary-container text-white transition uppercase"
        >
          CONTACT
        </button>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm lg:hidden flex">
          <div className="w-[280px] bg-background h-full shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
              <span className="font-serif font-bold tracking-wider text-primary text-base">Carlos Navigation</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-secondary hover:bg-secondary-container/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                      isActive 
                        ? "bg-primary-container text-white" 
                        : "text-secondary hover:bg-secondary-container/30 hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-secondary"}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            {/* Side-drawer Footer info */}
            <div className="mt-auto pt-6 border-t border-outline-variant/10 text-[11px] text-secondary leading-relaxed">
              <p className="font-bold text-primary mb-1">Carlos Landscaping Studio</p>
              <p>9055 Philbin Ave</p>
              <p>Riverside, CA 92503</p>
              <p className="mt-2 text-primary">Inquiries: arthegoat1134@gmail.com</p>
            </div>
          </div>

          {/* Dismiss scrim */}
          <div className="flex-grow cursor-pointer" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
}
