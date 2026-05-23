import React, { useState } from "react";
import { Sparkles, Compass, Mountain, Sprout, Lightbulb, ClipboardList, RefreshCw, Layers, MapPin, Send } from "lucide-react";

interface DesignStudioProps {
  onAddCustomInquiry: (inquiry: any) => void;
  selectedDefaultStyle?: string;
}

export default function DesignStudio({ onAddCustomInquiry, selectedDefaultStyle = "" }: DesignStudioProps) {
  const [gardenStyle, setGardenStyle] = useState<string>(selectedDefaultStyle || "Modern Minimalist");
  const [region, setRegion] = useState<string>("");
  const [soilType, setSoilType] = useState<string>("Silt/Sandy Clay (Standard)");
  const [dimensions, setDimensions] = useState<string>("");
  const [selectedElements, setSelectedElements] = useState<string[]>(["Hardscape Stone Paving"]);
  const [notes, setNotes] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const styles = [
    { name: "Modern Minimalist", desc: "Clean linear sightlines, boardconcrete, architectural accents" },
    { name: "Japanese Zen Sanctuary", desc: "Bespoke stone arrangements, gravel streams, trained pine groves" },
    { name: "Lush Mediterranean", desc: "Cozy terracotta, centuries-old olive clusters, lavender banks" },
    { name: "Native Woodland Ravine", desc: "Fallen logs, forest floor moss blankets, cascading fieldstones" }
  ];

  const elementsList = [
    "Hardscape Stone Paving",
    "Basalt Fire Pit Circle",
    "Negative-Edge Reflecting Pool",
    "Bioswale Cascade (Water feature)",
    "Vertical Concrete Ivy Wall",
    "Precision Cloud Topiaries",
    "Century Olive Specimen Bed",
    "Warm Architectural Ground Spotlights"
  ];

  const toggleElement = (el: string) => {
    if (selectedElements.includes(el)) {
      setSelectedElements(selectedElements.filter((item) => item !== el));
    } else {
      setSelectedElements([...selectedElements, el]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!region) {
      setErrorMsg("Please continuous address/zip code geographical reference to help locate local flora compatibility.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    setGeneratedPlan("");
    setLoadingStep(0);

    // Simulate luxury-focused progressive step updates
    const intervals = [
      "Analyzing micro-hydrology parameters...",
      "Mapping sunrise and twilight solar angles...",
      "Matching soil composition to architectural concrete parameters...",
      "Curating compatible botanical species palette...",
      "Drafting layout lines and sightline vectors..."
    ];

    let currentStep = 0;
    const loadingInterval = setInterval(() => {
      if (currentStep < intervals.length - 1) {
        currentStep++;
        setLoadingStep(currentStep);
      }
    }, 2000);

    try {
      const response = await fetch("/api/design-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gardenStyle,
          region,
          soilType,
          elements: selectedElements,
          dimensions,
          additionalNotes: notes
        })
      });

      if (!response.ok) {
        throw new Error("Unable to complete AI Studio draft request.");
      }

      const data = await response.json();
      setGeneratedPlan(data.text || "No draft plan received. Please try again.");
      
      // Store inquiry
      onAddCustomInquiry({
        style: gardenStyle,
        zipCode: region,
        soilType,
        elements: selectedElements,
        areaSize: dimensions,
        notes,
        estimatedCost: selectedElements.length * 8500 + (dimensions ? parseInt(dimensions) * 45 || 12000 : 15000)
      });

    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected issue occurred while requesting plan.");
    } finally {
      clearInterval(loadingInterval);
      setLoading(false);
    }
  };

  // Standard elegant parser to break down draft generated markdown into beautiful sections
  const parseSections = (text: string) => {
    if (!text) return [];
    
    // We expect sections starting with block titles
    const sections: { title: string; content: string; icon: any }[] = [];
    
    // Standard section markers
    const markers = [
      { name: "Design Concept", label: "Design Concept & Spatial Vision", icon: Compass },
      { name: "Hardscape", label: "Architectural Hardscape & Materials Selection", icon: Mountain },
      { name: "Flora", label: "Curated Flora & Seasonality", icon: Sprout },
      { name: "Water and Light", label: "Water and Light Plan", icon: Lightbulb },
      { name: "Maintenance", label: "Growth Progress & Maintenance Plan", icon: ClipboardList }
    ];

    const lines = text.split("\n");
    let currentSectionContent: string[] = [];
    let currentTitle = "General Analysis Blueprint";
    let currentIcon = Layers;

    const pushCurrent = () => {
      if (currentSectionContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentSectionContent.join("\n"),
          icon: currentIcon
        });
        currentSectionContent = [];
      }
    };

    for (const line of lines) {
      let foundHeader = false;
      
      for (const m of markers) {
        if (line.toLowerCase().includes(m.name.toLowerCase()) && (line.includes("**") || line.startsWith("#") || line.match(/^[1-5]\./))) {
          pushCurrent();
          currentTitle = m.label;
          currentIcon = m.icon;
          foundHeader = true;
          break;
        }
      }

      if (!foundHeader) {
        currentSectionContent.push(line);
      }
    }
    pushCurrent();

    // If nothing structural was parsed, return everything as one block
    if (sections.length === 0) {
      return [{
        title: "Bespoke Landscaping Masterwork Plan",
        content: text,
        icon: Compass
      }];
    }

    return sections;
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[11px] text-secondary font-extrabold uppercase tracking-[0.2em]">INTELLIGENT DRAFTING SUITE</span>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mt-2">Bespoke Design Studio</h2>
        <p className="text-secondary text-xs lg:text-sm max-w-2xl mt-2">
          Leverage our advanced parametric garden modeling assistant powered by AI. Map climate parameters, botanical synergies, and hardscape material configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Input Parameters Box */}
        <div className="lg:col-span-4 bg-surface-container p-6 lg:p-8 rounded-lg border border-outline-variant/20 shadow-sm self-start">
          <h3 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/20 pb-2 mb-6 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            DESIGN SPECIFICATIONS
          </h3>

          <form onSubmit={handleGenerate} className="flex flex-col gap-5">
            
            {/* Style Selection */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5 font-sans">AESTHETIC STYLE</label>
              <select
                value={gardenStyle}
                onChange={(e) => setGardenStyle(e.target.value)}
                className="w-full bg-background border border-outline-variant text-[11px] p-3 rounded focus:border-primary focus:outline-none transition font-medium"
              >
                {styles.map((style) => (
                  <option key={style.name} value={style.name}>
                    {style.name} — {style.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Geographical Zip / Site */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">SITE LOCATION / ZIP CODE</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-secondary/70" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Los Angeles, CA 90024"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-xs p-3 pl-10 rounded focus:border-primary focus:outline-none transition"
                />
              </div>
              <p className="text-[9px] text-secondary/70 mt-1">Allows Gemini to pull exact climate zone, precipitation levels, and winter-hardiness ranges.</p>
            </div>

            {/* Dimensions */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">ESTIMATED SPACE AREA (SQ FT)</label>
              <input
                type="text"
                placeholder="e.g. 2,400 sq ft"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:border-primary focus:outline-none transition"
              />
            </div>

            {/* Soil Type */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">SOIL COMPOSITION</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:border-primary focus:outline-none transition"
              >
                <option>Silt/Sandy Clay (Standard)</option>
                <option>Dry Gravelly Earth / Rocky</option>
                <option>Lush Loamy Garden Soil (Imported)</option>
                <option>Dense heavy clay (Retentive)</option>
              </select>
            </div>

            {/* Desired Living and Hardscape features */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-2">INTEGRATE LANDSCAPE ELEMENTS</label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 border border-outline-variant/30 p-2 rounded bg-background">
                {elementsList.map((el) => {
                  const checked = selectedElements.includes(el);
                  return (
                    <button
                      key={el}
                      type="button"
                      onClick={() => toggleElement(el)}
                      className={`p-2 rounded text-left text-[10px] font-semibold transition flex items-center justify-between border ${
                        checked
                          ? "bg-primary-container/10 border-primary text-primary"
                          : "border-transparent text-secondary hover:bg-secondary-container/20"
                      }`}
                    >
                      <span>{el}</span>
                      <input 
                        type="checkbox" 
                        checked={checked} 
                        readOnly 
                        className="w-3 h-3 rounded text-primary focus:ring-0 cursor-pointer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional requirements */}
            <div>
              <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">AESTHETIC NOTES OR SPECIAL REQUESTS</label>
              <textarea
                rows={3}
                placeholder="e.g. Children-safe flora, low-irrigation needs, dog park integration, preserve old oak..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:border-primary focus:outline-none transition resize-none"
              />
            </div>

            {errorMsg && (
              <div className="text-[10px] text-red-600 font-bold bg-red-50 p-2.5 rounded border border-red-200">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary hover:bg-primary-container text-white font-bold text-xs p-4 tracking-widest rounded transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              GENERATE DIGITAL BLUEPRINT
            </button>
          </form>
        </div>

        {/* Generated Blueprint View */}
        <div className="lg:col-span-8 bg-surface-container-low min-h-[500px] rounded-lg border border-outline-variant/20 flex flex-col relative overflow-hidden">
          
          {/* Default Empty State */}
          {!loading && !generatedPlan && (
            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <Compass className="w-8 h-8 text-[#737973] animate-pulse" />
              </div>
              <h4 className="font-serif text-lg font-bold text-primary mb-2">Bespoke Blueprint Workspace</h4>
              <p className="text-secondary text-xs max-w-sm leading-relaxed">
                Configure your design criteria on the left panels, then initiate our generative consultant to sketch out botanical palettes, lighting vectors, and material lists.
              </p>
            </div>
          )}

          {/* Loading Animation Stage */}
          {loading && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 lg:p-12 text-center my-auto min-h-[550px] relative bg-gradient-to-b from-surface/50 to-background/50 overflow-hidden">
              {/* Architectural Grid Blueprint Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(12,85,45,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(12,85,45,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              {/* Laser Scanner sweeping light beam */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.4)] animate-[bounce_4s_ease-in-out_infinite] pointer-events-none"></div>

              {/* Advanced Branded Radial Growth Ring Core */}
              <div className="relative w-36 h-36 mb-8 flex items-center justify-center z-10 select-none">
                {/* Outermost Tree Ring (Growth Layer) */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-800/20 animate-[spin_16s_linear_infinite]"></div>
                
                {/* Second Concentric Ring */}
                <div className="absolute inset-2 rounded-full border border-emerald-600/10 animate-[spin_10s_linear_infinite_reverse]"></div>
                
                {/* Golden Ratio Spiral Indicator Ring */}
                <div className="absolute inset-4 rounded-full border-2 border-double border-amber-500/20 animate-[spin_6s_ease-in-out_infinite]"></div>
                
                {/* Scanning sweep ring segment */}
                <div className="absolute inset-6 rounded-full border-[3px] border-transparent border-t-emerald-600/60 border-r-emerald-600/30 animate-[spin_2s_linear_infinite]"></div>
                
                {/* Central Botanical Glowing Focal Node */}
                <div className="absolute w-14 h-14 rounded-full bg-[#11311d] border border-emerald-500/30 shadow-[0_0_18px_rgba(16,185,129,0.25)] flex items-center justify-center animate-pulse duration-1000">
                  <Sprout className="w-6 h-6 text-emerald-400" />
                </div>
              </div>

              {/* Branded System Identity Log */}
              <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.06] border border-emerald-500/15 text-primary text-[9px] tracking-[0.3em] font-extrabold uppercase">
                <Sparkles className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
                CARLOS LIVE PLANNER STUDIO
              </div>
              
              <h4 className="font-serif text-lg font-bold text-primary mb-6">
                Architecting Your Natural Masterpiece
              </h4>

              {/* Progressive Blueprint Calculation Diagnostics Checklist */}
              <div className="w-full max-w-sm bg-white/60 backdrop-blur-md border border-outline-variant/15 p-4 rounded-lg shadow-sm text-left flex flex-col gap-2.5 mb-6 z-10">
                {[
                  { label: "Site micro-hydrology analysis", icon: Compass },
                  { label: "Solar exposure & shadow modeling", icon: Lightbulb },
                  { label: "Soil composition compatibility matrix", icon: Mountain },
                  { label: "Botanical specimen & evergreen pairing", icon: Sprout },
                  { label: "Sightline harmony & vector layout planning", icon: Layers }
                ].map((item, index) => {
                  const isDone = loadingStep > index;
                  const isActive = loadingStep === index;
                  const Icon = item.icon;
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between text-[11px] font-sans transition-all duration-300 ${
                        isDone ? "text-primary/70 font-medium" : isActive ? "text-primary font-boldScale" : "text-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-3.5 h-3.5 ${
                          isDone ? "text-emerald-600" : isActive ? "text-amber-500" : "text-secondary/30"
                        }`} />
                        <span className="tracking-wide">{item.label}</span>
                      </div>
                      
                      <div>
                        {isDone ? (
                          <span className="text-[9px] text-emerald-600 font-extrabold uppercase bg-emerald-100/60 px-1.5 py-0.5 rounded tracking-wider select-none">
                            COMPLETED
                          </span>
                        ) : isActive ? (
                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-amber-600 font-extrabold tracking-wider text-[9px] select-none">
                            <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                            CALCULATING
                          </div>
                        ) : (
                          <span className="text-[9px] text-secondary/30 font-bold uppercase tracking-wider px-1.5">
                            PENDING
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress step visual indicators */}
              <div className="flex gap-1.5 mb-6 justify-center">
                {[0, 1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded transition-all duration-500 ${
                      loadingStep === step 
                        ? "w-10 bg-amber-400" 
                        : loadingStep > step 
                        ? "w-6 bg-primary" 
                        : "w-2 bg-outline-variant/40"
                    }`}
                  ></div>
                ))}
              </div>

              {/* Precision Location Coordinates Footer */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[9px] text-secondary/40 select-none uppercase tracking-widest z-10">
                <span className="font-semibold">ENGINE COORD: RIVERSIDE CA</span>
                <span className="font-semibold">STATION: 9055-PHLBN // LMT-7</span>
              </div>
            </div>
          )}

          {/* Render Generated Structured Blueprint Content */}
          {!loading && generatedPlan && (
            <div className="flex-grow flex flex-col p-6 lg:p-10 animate-in fade-in duration-700">
              
              {/* Header metadata layout */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-outline-variant/20 pb-5 mb-8 gap-4">
                <div>
                  <span className="text-[10px] tracking-wider text-primary font-extrabold bg-primary-container/10 px-3 py-1 rounded">
                    CARLOS LANDSCAPING LABS • VERDANT
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-primary mt-2">
                    {gardenStyle} Landscape Blueprint
                  </h4>
                  <div className="text-secondary text-[10px] mt-1 font-medium select-none">
                    Target: {region} • Space Area: {dimensions || "Estate Scale"} • Soil: {soilType}
                  </div>
                </div>

                <button
                  onClick={() => setGeneratedPlan("")}
                  className="text-xs font-semibold text-[#737973] hover:text-primary transition flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  RE-DRAFT DESIGN
                </button>
              </div>

              {/* Visualized card layout from markdown blocks */}
              <div className="flex flex-col gap-8 overflow-y-auto max-h-[70vh] pr-2">
                {parseSections(generatedPlan).map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <div 
                      key={index} 
                      className="bg-white border border-outline-variant/15 p-6 rounded-lg shadow-sm font-sans flex flex-col gap-3 relative overflow-hidden"
                    >
                      {/* Top left decorative accent tag */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      
                      <div className="flex items-center gap-2.5 text-primary">
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <h5 className="font-serif font-bold text-sm md:text-base tracking-wide uppercase">
                          {section.title}
                        </h5>
                      </div>

                      <div className="h-[1px] w-full bg-outline-variant/10"></div>

                      <div className="text-secondary text-xs md:text-sm leading-relaxed whitespace-pre-line overflow-hidden font-medium">
                        {section.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer footer */}
              <div className="mt-8 pt-5 border-t border-outline-variant/10 text-[10px] text-secondary leading-relaxed flex items-center justify-between bg-surface-container p-4 rounded">
                <p>
                  *This concept map layout is drafted using site metadata. Actual builds require onsite soil drill tests, water pressure verification, and utility layout analysis.
                </p>
                <div className="font-bold text-primary shrink-0 ml-4 font-serif text-xs">CS-9055</div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
