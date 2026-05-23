import React, { useState } from "react";
import { HardHat, Sliders, Calendar, FileText, CheckCircle2, Circle, PencilLine, Plus, Clock, Eye, HelpCircle } from "lucide-react";

interface SiteLog {
  id: string;
  date: string;
  author: string;
  message: string;
  phase: string;
}

export default function ActiveProjectTracker() {
  const [activeTab, setActiveTab] = useState<"progress" | "logs">("progress");
  
  // Custom interactive site log state to let clients feel real active collaboration
  const [siteLogs, setSiteLogs] = useState<SiteLog[]>([
    {
      id: "log-1",
      date: "May 22, 2026",
      author: "Carlos (Lead Architect)",
      message: "Limestone paving delivery successfully arrived. Arranged basalt fire circle pieces cleanly relative to coordinate vectors.",
      phase: "Phase 2: Stonemasonry"
    },
    {
      id: "log-2",
      date: "May 18, 2026",
      author: "Julian (Site Surveyor)",
      message: "Helical structural anchor tension tests completed green. Deep silt containment barriers successfully installed.",
      phase: "Phase 1: Civil grading"
    },
    {
      id: "log-3",
      date: "May 10, 2026",
      author: "Carlos (Lead Architect)",
      message: "Site core drill tests analyzed. Sandy silt layer verified. Root containment barriers approved relative to old oak canopy.",
      phase: "Phase 0: Geological prep"
    }
  ]);
  
  const [newLogMessage, setNewLogMessage] = useState("");
  const [newLogPhase, setNewLogPhase] = useState("Phase 3: Curated planting");
  
  // Milestones with exact progress tracking
  const milestones = [
    { title: "Silt Core Drilling & Hydrology Mapping", date: "May 12, 2026", desc: "Aesthetic soil sampling to design anchor loads and ecological water patterns.", status: "complete" },
    { title: "Civil Grade Excavation & Corten Installation", date: "May 19, 2026", desc: "Excavating slope levels, grading lines, and setting up core retaining barriers.", status: "complete" },
    { title: "Basalt Fabrication & Limestone Paving", date: "June 2, 2026", desc: "Custom milling the basalt ring and precision laying silver limestone paving.", status: "active" },
    { title: "Curated Specimens Botanical planting", date: "June 16, 2026", desc: "Arranging paperbark maples, hostas, and Japanese forest grass borders.", status: "upcoming" },
    { title: "Low-Voltage Luminary Zones Setup", date: "June 25, 2026", desc: "Wiring outdoor spotlights and testing water flow biological filtration.", status: "upcoming" }
  ];

  // Active steps count
  const completedCount = milestones.filter(m => m.status === "complete").length;
  const progressPercent = Math.round(((completedCount + 0.5) / milestones.length) * 100);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogMessage.trim()) return;

    const logItem: SiteLog = {
      id: `log-${Date.now()}`,
      date: "Today",
      author: "Client (Private Owner)",
      message: newLogMessage,
      phase: newLogPhase
    };

    setSiteLogs([logItem, ...siteLogs]);
    setNewLogMessage("");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
      
      {/* Title Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[11px] text-secondary font-extrabold uppercase tracking-[0.2em]">CLIENT ESCROW RETOUR</span>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mt-2">My Workspace</h2>
        <p className="text-secondary text-xs lg:text-sm max-w-2xl mt-2">
          Track outstanding biomorphic installations, interact with onsite engineering logs, write daily briefs, and audit site specifications securely in real-time.
        </p>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: active project info and milestones */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Main Active Transformation Overview */}
          <div className="bg-white border border-outline-variant/20 rounded-lg p-6 md:p-8 shadow-luxurious flex flex-col gap-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/10 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold text-amber-700 uppercase bg-amber-50 px-2.5 py-1 rounded">
                  <Clock className="w-3 h-3 text-amber-700" />
                  TRANSFORMATION IN PROGRESS
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary mt-2">The Ravine Estate Reconstruction</h3>
                <p className="text-[#737973] text-[11px] mt-1">Lead Architect: Carlos Landscape • Contract ID: #CLP-9055</p>
              </div>

              {/* Progress switcher */}
              <div className="flex bg-surface-container p-1 rounded gap-1 select-none text-[10px] font-bold">
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`px-3 py-1.5 rounded transition ${activeTab === "progress" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
                >
                  PROGRESS STEPS
                </button>
                <button
                  onClick={() => setActiveTab("logs")}
                  className={`px-3 py-1.5 rounded transition ${activeTab === "logs" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
                >
                  ON-SITE DIALOGUE ({siteLogs.length})
                </button>
              </div>
            </div>

            {/* Custom brand requirement: The "Growth" Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-bold text-primary">
                <span>ESTATE STRENGTH INDEX</span>
                <span>{progressPercent}% GROWTH</span>
              </div>
              
              {/* Custom Thin horizontal line filling with gradient from Antique Bronze (d5c4ad) to Deep Forest Green (061b0e) */}
              <div className="h-1.5 w-full bg-outline-variant/25 rounded-full overflow-hidden select-none">
                <div 
                  className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[#d5c4ad] to-[#061b0e]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-[9px] text-[#737973] mt-2 leading-relaxed">
                <span>Phase 0: Silt preparation</span>
                <span>In bloom (Est. Completed August 12)</span>
              </div>
            </div>

            {activeTab === "progress" ? (
              /* Milestone Timeline layout style */
              <div className="flex flex-col gap-6 mt-4">
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider block border-b border-outline-variant/10 pb-1">
                  CHRONOLOGICAL INSTALLATION TIMELINE
                </div>

                <div className="flex flex-col gap-6 relative pl-5 border-l border-outline-variant/30 ml-2.5">
                  {milestones.map((milestone, i) => {
                    const isComplete = milestone.status === "complete";
                    const isActive = milestone.status === "active";
                    
                    return (
                      <div key={i} className="relative flex flex-col gap-1">
                        
                        {/* Timeline node */}
                        <div className="absolute -left-[30px] top-1">
                          {isComplete ? (
                            <CheckCircle2 className="w-5.5 h-5.5 bg-white text-[#061b0e]" />
                          ) : isActive ? (
                            <div className="w-5.5 h-5.5 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-primary-container/20">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                            </div>
                          ) : (
                            <Circle className="w-5.5 h-5.5 bg-white text-outline-variant" />
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                          <span className={`text-xs font-bold leading-tight ${isComplete ? "text-secondary line-through" : "text-primary"}`}>
                            {milestone.title}
                          </span>
                          <span className="text-[10px] text-[#737973] font-medium shrink-0">
                            {milestone.date}
                          </span>
                        </div>

                        <p className="text-[11px] text-secondary leading-relaxed max-w-xl">
                          {milestone.desc}
                        </p>

                        {isActive && (
                          <div className="inline-flex self-start py-0.5 px-2 text-[9px] font-bold tracking-wider text-amber-900 bg-amber-50 border border-amber-200 rounded mt-1">
                            ACTIVE WORKMEN ONSITE TODAY
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Inside Dialogue Site logs style */
              <div className="flex flex-col gap-6 mt-4 animate-in fade-in duration-300">
                
                {/* Add dynamic site log client dialogue */}
                <form onSubmit={handleAddLog} className="border border-outline-variant/20 rounded bg-surface-container-low p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary">
                    <PencilLine className="w-4 h-4 text-primary" />
                    WRITE ONSITE MESSAGE TO ARCHITECT TEAM
                  </div>
                  <textarea
                    rows={2}
                    value={newLogMessage}
                    required
                    onChange={(e) => setNewLogMessage(e.target.value)}
                    placeholder="Ask a question or add a notation about ongoing work on-site... (e.g. Can we adjust the lighting zone?)"
                    className="w-full text-xs bg-background border border-outline-variant p-3 focus:outline-none focus:border-primary rounded resize-none"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-[#737973] font-bold">TAG PHASE:</span>
                      <select
                        value={newLogPhase}
                        onChange={(e) => setNewLogPhase(e.target.value)}
                        className="bg-transparent border-0 text-[10px] font-bold text-primary p-0 h-auto focus:ring-0 cursor-pointer"
                      >
                        <option>Phase 2: Stonemasonry</option>
                        <option>Phase 3: Curated planting</option>
                        <option>Phase 4: Lighting setups</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-container text-white text-[9px] font-bold tracking-wider py-2 px-4 rounded transition self-end uppercase"
                    >
                      POST TO TIMELINE
                    </button>
                  </div>
                </form>

                {/* Logs list output */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-[10px] text-primary font-bold uppercase tracking-wider block border-b border-outline-variant/10 pb-1">
                    ACTIVITY TIMELINE AND DAILY BRIEFS
                  </h4>
                  
                  <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-1">
                    {siteLogs.map((log) => (
                      <div key={log.id} className="p-4 rounded-lg bg-surface-container border border-outline-variant/10 text-xs flex flex-col gap-2 relative">
                        <div className="flex items-center justify-between select-none">
                          <span className="text-[10px] bg-primary-container text-[#819986] font-bold px-2 py-0.5 rounded uppercase font-sans">
                            {log.phase}
                          </span>
                          <span className="text-[10px] text-[#737973] font-medium">{log.date}</span>
                        </div>
                        <p className="text-secondary select-all font-medium leading-relaxed italic pr-2">&ldquo;{log.message}&rdquo;</p>
                        <span className="text-[10px] font-bold text-primary text-right italic block">- {log.author}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Right column: site contact and document retrieval */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Client Contacts Card */}
          <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/20 shadow-sm flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/10 pb-2">PROJECT STEARDSHIP TEAM</h4>
            
            <div className="flex flex-col gap-4">
              {/* Leader contact */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#061b0e]/5 border border-primary/10 flex items-center justify-center font-bold font-serif text-[#061b0e]">C</div>
                <div className="text-xs">
                  <div className="font-bold text-primary">Carlos Landscape</div>
                  <span className="text-[#737973] uppercase text-[9px] font-extrabold tracking-wider leading-none">Lead landscape architect</span>
                  <a href="mailto:artthegoat1134@gmail.com" className="text-primary hover:underline block mt-0.5">Owner / Contact</a>
                </div>
              </div>

              {/* Site Manager */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#061b0e]/5 border border-primary/10 flex items-center justify-center font-bold font-serif text-[#061b0e]">J</div>
                <div className="text-xs">
                  <div className="font-bold text-primary">Julian Vance</div>
                  <span className="text-[#737973] uppercase text-[9px] font-extrabold tracking-wider leading-none">Onsite civil foreman</span>
                  <span className="text-secondary block mt-0.5">Riverside Local Staff</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blueprint document download mock list */}
          <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/20 shadow-sm flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/10 pb-2">blueprint archives</h4>
            
            <ul className="flex flex-col gap-3 font-semibold text-xs text-primary">
              <li className="flex items-center justify-between p-2 rounded bg-background hover:bg-background/80 transition cursor-pointer">
                <div className="flex items-center gap-2 select-all">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="block leading-tight">Soil_Core_Survey_CLP_9055.pdf</span>
                    <span className="text-[9px] text-secondary font-medium">12.5 MB • Approved</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-background hover:bg-background/80 transition cursor-pointer">
                <div className="flex items-center gap-2 select-all">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="block leading-tight">Final_Hydrology_Concept.pdf</span>
                    <span className="text-[9px] text-secondary font-medium">8.2 MB • Active Draft</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick FAQ info panel */}
          <div className="bg-primary/5 p-5 rounded-lg border border-primary/10 flex gap-3 text-xs leading-relaxed select-none">
            <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="font-serif font-bold text-primary">Need urgent intervention?</h5>
              <p className="text-[#434843] text-[11px] mt-1">
                For structural or tree relocation emergencies, directly contact our emergency on-site engineer team at Riverside Office (9055 Philbin Ave).
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
