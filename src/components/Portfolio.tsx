import { useState } from "react";
import { PORTFOLIO_PROJECTS } from "../data";
import { LandscapeProject } from "../types";
import { Eye, Info, X, Calendar, DollarSign, Hammer, Leaf, Sparkles, Sliders } from "lucide-react";

interface PortfolioProps {
  onSelectProjectForEstimate: (project: LandscapeProject) => void;
  onInquireStyle: (style: string) => void;
}

export default function Portfolio({ onSelectProjectForEstimate, onInquireStyle }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<LandscapeProject | null>(null);
  const [beforeAfterProgress, setBeforeAfterProgress] = useState<number>(50); // slider percent

  const categories = ["All", ...Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 max-w-[1440px] mx-auto px-6 lg:px-16" id="portfolio-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-secondary text-[11px] tracking-[0.2em] font-extrabold uppercase mb-2">ARCHITECTURAL ARCHIVE</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary">Our Portfolio</h2>
        </div>
        
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-bold tracking-wider py-2 px-4 rounded-full transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-secondary-container/40 text-secondary hover:bg-secondary-container/80"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-outline-variant/30 mb-8"></div>

      {/* Bento-like Grid spacing */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredProjects.map((project, idx) => {
          // Alternative layout patterns to replicate a stunning bespoke bento grid
          const isLarge = idx % 3 === 0;
          const gridColSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
          const ratioClass = isLarge ? "aspect-[16/10]" : "aspect-square md:aspect-auto md:h-full";

          return (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`${gridColSpan} group cursor-pointer overflow-hidden relative ${ratioClass} rounded-lg bg-surface-container shadow-luxurious border border-outline-variant/10`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-amber-200 text-[10px] tracking-[0.2em] font-extrabold uppercase mb-2">
                  {project.category}
                </span>
                <p className="text-white font-serif text-xl md:text-2xl font-bold tracking-wide">
                  {project.title}
                </p>
                
                {/* Expand hover view */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-2">
                  <p className="text-white/80 text-xs font-sans line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold tracking-widest">
                    <span>EXPLORE PROJECT</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background w-full max-w-5xl rounded-lg shadow-2xl relative overflow-hidden my-8 animate-in zoom-in-95 duration-300">
            
            {/* Header image top section */}
            <div className="relative h-64 md:h-80 w-full">
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/50"></div>
              
              {/* Title & category overlay */}
              <div className="absolute bottom-6 left-6 md:left-10 right-6 text-white">
                <span className="text-amber-300 text-[10px] tracking-[0.2em] font-extrabold uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {activeProject.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-white drop-shadow">
                  {activeProject.title}
                </h3>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => {
                  setActiveProject(null);
                  setBeforeAfterProgress(50);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with grid partitions */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[60vh] overflow-y-auto">
              
              {/* Left Column: Vision & Challenge/Solution */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h4 className="text-primary font-bold text-xs tracking-wider uppercase mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    DESIGN CONCEPT & VISION
                  </h4>
                  <p className="text-secondary-container/90 bg-primary-container p-4 rounded text-xs md:text-sm italic leading-relaxed text-slate-100 font-medium">
                    &ldquo;{activeProject.quote}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 rounded border border-outline-variant/10">
                    <span className="text-[10px] tracking-wider text-red-700 font-bold block mb-1">THE CONSTRAINT / CHALLENGE</span>
                    <p className="text-xs text-secondary leading-relaxed">{activeProject.challenge}</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded border border-primary/10">
                    <span className="text-[10px] tracking-wider text-primary font-bold block mb-1">THE LANDSCAPE ARCHITECT SOLUTION</span>
                    <p className="text-xs text-secondary leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Interactive Before & After comparison slider */}
                {activeProject.beforeImage && (
                  <div className="border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low">
                    <span className="text-[10px] tracking-wider text-primary font-bold block mb-2 flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5" />
                      BEFORE / AFTER SPECIMEN SLIDER
                    </span>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded select-none shadow">
                      {/* Before view */}
                      <img 
                        src={activeProject.beforeImage} 
                        alt="Before terrain state" 
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Before Transformation</div>
                      
                      {/* After view (clipping mask) */}
                      <div 
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `polygon(0 0, ${beforeAfterProgress}% 0, ${beforeAfterProgress}% 100%, 0 100%)` }}
                      >
                        <img 
                          src={activeProject.image} 
                          alt="Bespoke finish" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Complete Build</div>

                      {/* Control Line */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                        style={{ left: `${beforeAfterProgress}%` }}
                      >
                        <div className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center font-bold text-xs select-none shadow-lg">↔</div>
                      </div>

                      {/* Native range input overlay for sliding */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={beforeAfterProgress} 
                        onChange={(e) => setBeforeAfterProgress(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Specifications list, scope, materials & flora */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Project Specs Card */}
                <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10 flex flex-col gap-4">
                  <h5 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/20 pb-2">PROJECT SPECIFICATIONS</h5>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block">TIMELINE</span>
                      <span className="text-xs font-semibold text-primary flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        {activeProject.timeline}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block">BUDGET CATEGORY</span>
                      <span className="text-xs font-semibold text-primary flex items-center gap-0.5 mt-0.5 text-emerald-800">
                        <DollarSign className="w-3.5 h-3.5" />
                        {activeProject.costCategory}
                      </span>
                    </div>
                  </div>

                  {/* Scope list */}
                  <div>
                    <span className="text-[10px] text-secondary font-medium uppercase tracking-wider block mb-2">FABRICATION SCOPE</span>
                    <ul className="flex flex-col gap-1.5">
                      {activeProject.scope.map((s, i) => (
                        <li key={i} className="text-xs text-secondary flex items-start gap-1.5">
                          <span className="text-[7px] text-primary mt-1.5">◆</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Curated Flora Specifications */}
                <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
                  <h5 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/20 pb-2 flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-primary" />
                    CURATED BIOPHILIC FLORA
                  </h5>
                  <div className="flex flex-col gap-3 mt-3">
                    {activeProject.plants.map((p, i) => (
                      <div key={i} className="text-[11px] border-b border-outline-variant/10 last:border-b-0 pb-2 last:pb-0">
                        <div className="flex items-center justify-between font-semibold text-primary">
                          <span>{p.common}</span>
                          <span className="italic font-normal text-secondary text-[10px]">{p.botanical}</span>
                        </div>
                        <div className="text-secondary text-[10px] mt-0.5">{p.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction Actions */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      onSelectProjectForEstimate(activeProject);
                      setActiveProject(null);
                    }}
                    className="w-full bg-primary hover:bg-primary-container text-white text-xs font-bold py-3 px-4 tracking-widest rounded transition"
                  >
                    BUILD ESTIMATE LIKE THIS
                  </button>
                  <button 
                    onClick={() => {
                      onInquireStyle(activeProject.category);
                      setActiveProject(null);
                    }}
                    className="w-full bg-white hover:bg-surface-container text-primary border border-outline text-xs font-bold py-2.5 px-4 tracking-widest rounded transition"
                  >
                    PLAN TRANSFORMATION CONSULTATION
                  </button>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="px-10 py-5 bg-surface-container border-t border-outline-variant/30 text-right">
              <button 
                onClick={() => {
                  setActiveProject(null);
                  setBeforeAfterProgress(50);
                }}
                className="text-xs font-bold text-secondary hover:text-primary tracking-wider"
              >
                DISMISS SHOWCASE
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
