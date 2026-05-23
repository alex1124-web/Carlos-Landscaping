import { useState } from "react";
import { PLANT_SPECIES_DB } from "../data";
import { PlantSpecies } from "../types";
import { Sun, Droplet, Search, Tag, Plus, Check, Trash, Spade, Eye } from "lucide-react";

interface PlantFinderProps {
  curatedPalette: string[]; // List of PlantSpecies IDs
  onTogglePalette: (plantId: string) => void;
  onClearPalette: () => void;
  onStartInquiryFromPalette: () => void;
}

export default function PlantFinder({ curatedPalette, onTogglePalette, onClearPalette, onStartInquiryFromPalette }: PlantFinderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterSun, setFilterSun] = useState("All");
  const [filterWater, setFilterWater] = useState("All");
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null);

  // Filter Categories
  const categories = ["All", "Tree", "Shrub", "Perennial", "Groundcover", "Ornamental Grass"];
  const sunOptions = ["All", "Full Sun", "Partial Shade", "Full Shade"];
  const waterOptions = ["All", "Low", "Medium", "High"];

  // Filter Logic
  const filteredPlants = PLANT_SPECIES_DB.filter((p) => {
    const matchesSearch = p.commonName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.architecturalRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || p.type === filterType;
    const matchesSun = filterSun === "All" || p.sunlight.includes(filterSun) || (filterSun === "Partial Shade" && p.sunlight.includes("Part"));
    const matchesWater = filterWater === "All" || p.water === filterWater;
    return matchesSearch && matchesType && matchesSun && matchesWater;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
      
      {/* Page Title Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[11px] text-secondary font-extrabold uppercase tracking-[0.2em]">CARLOS BOTANICAL DIRECTORY</span>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mt-2">Living Plant Catalog</h2>
        <p className="text-secondary text-xs lg:text-sm max-w-2xl mt-2">
          Explore our handpicked palette of high-concept specimens. Cultivated for structural form, texture, seasonal color transitions, and ecological sustainability in exclusive environments.
        </p>
      </div>

      {/* Grid: Main interactive search vs Curated Wishlist Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Search, Filter, and Grid of plants */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Controls Bar */}
          <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/15 flex flex-col gap-4 shadow-sm">
            
            {/* Direct Text Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by common, botanical name or role... (e.g. Japanese Pine, gold-green...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-3.5 pl-10 bg-background border border-outline-variant focus:border-primary focus:outline-none rounded transition"
              />
              <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-secondary" />
            </div>

            {/* Quick Filters Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Category selector */}
              <div>
                <label className="text-[9px] text-[#737973] font-bold uppercase tracking-wider block mb-1">PLANT CATEGORY</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-[11px] font-semibold py-2.5 px-3 rounded"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                  ))}
                </select>
              </div>

              {/* Sunlight requirements select */}
              <div>
                <label className="text-[9px] text-[#737973] font-bold uppercase tracking-wider block mb-1">SUNLIGHT LEVEL</label>
                <select
                  value={filterSun}
                  onChange={(e) => setFilterSun(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-[11px] font-semibold py-2.5 px-3 rounded"
                >
                  {sunOptions.map((s) => (
                    <option key={s} value={s}>{s === "All" ? "Any Sunlight Class" : s}</option>
                  ))}
                </select>
              </div>

              {/* Water requirements */}
              <div>
                <label className="text-[9px] text-[#737973] font-bold uppercase tracking-wider block mb-1">IRRIGATION WATER PLAN</label>
                <select
                  value={filterWater}
                  onChange={(e) => setFilterWater(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-[11px] font-semibold py-2.5 px-3 rounded"
                >
                  {waterOptions.map((w) => (
                    <option key={w} value={w}>{w === "All" ? "Any Water Range" : `${w} Water Demand`}</option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Plant Grid Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlants.map((plant) => {
              const inPalette = curatedPalette.includes(plant.id);
              return (
                <div
                  key={plant.id}
                  className="group bg-white rounded-lg border border-outline-variant/15 overflow-hidden shadow-luxurious flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Plant image */}
                    <div className="relative h-44 w-full overflow-hidden bg-primary/5">
                      <img 
                        src={plant.image} 
                        alt={plant.commonName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-primary/75 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {plant.type}
                      </div>

                      <button 
                        onClick={() => setSelectedPlant(plant)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition flex items-center gap-1 text-[10px] pr-2.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                    </div>

                    {/* Plant details */}
                    <div className="p-5 flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-base text-primary select-all">
                          {plant.commonName}
                        </h4>
                      </div>
                      <span className="text-[11px] italic text-[#737973] font-medium leading-none block mb-2">{plant.botanicalName}</span>
                      
                      <p className="text-secondary text-[11px] line-clamp-2 leading-relaxed mb-4">
                        {plant.description}
                      </p>

                      {/* Info badges */}
                      <div className="flex flex-wrap gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 bg-surface-container-low text-[#434843] text-[9px] font-bold py-1 px-2.5 rounded border border-outline-variant/10">
                          <Sun className="w-3 h-3 text-amber-500" />
                          {plant.sunlight}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-surface-container-low text-[#434843] text-[9px] font-bold py-1 px-2.5 rounded border border-outline-variant/10">
                          <Droplet className="w-3 h-3 text-secondary" />
                          {plant.water} Water
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add to palette footer */}
                  <div className="p-5 pt-0 mt-auto">
                    <button
                      onClick={() => onTogglePalette(plant.id)}
                      className={`w-full py-2 px-4 text-[10px] font-bold tracking-widest rounded transition flex items-center justify-center gap-1.5 border ${
                        inPalette
                          ? "bg-primary-container text-white border-primary"
                          : "bg-white hover:bg-secondary-container/20 text-primary border-outline-variant"
                      }`}
                    >
                      {inPalette ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          IN MY PALETTE
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          ADD TO PALETTE
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}

            {filteredPlants.length === 0 && (
              <div className="col-span-full bg-surface p-12 text-center rounded-lg border border-dashed border-outline-variant/60">
                <Spade className="w-10 h-10 text-[#737973] mx-auto mb-3 animate-bounce" />
                <h5 className="font-serif font-bold text-sm text-primary">No Matching Flora Found</h5>
                <p className="text-secondary text-xs mt-1">Please reset your search variables to look at details.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Dynamic My Palette Sidebar selection */}
        <div className="lg:col-span-4 bg-surface-container p-6 lg:p-8 rounded-lg border border-outline-variant/20 shadow-sm self-start flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/20 pb-2 flex items-center gap-1.5 mb-1">
              <Tag className="w-4 h-4 text-primary" />
              CURATED REPERTOIRE
            </h3>
            <p className="text-[10px] text-secondary">
              Save favorite specimens to compose a customized palette before launching custom inquiries.
            </p>
          </div>

          {curatedPalette.length === 0 ? (
            <div className="py-10 text-center border border-dashed border-outline-variant/40 rounded bg-background p-4 flex flex-col items-center">
              <Spade className="w-8 h-8 text-[#737973]/60 mb-2" />
              <p className="text-xs text-secondary font-medium">No botanical selections yet.</p>
              <p className="text-[10px] text-secondary/70 mt-1 leading-relaxed">
                Click “Add to Palette” on options/specimens in the left catalogs to plan cohesive textures.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 bg-background p-4 rounded border border-outline-variant/10">
              
              <div className="flex items-center justify-between font-bold text-[10px] text-primary border-b border-outline-variant/10 pb-2">
                <span>MY SELECTED TAXA</span>
                <span>{curatedPalette.length} PALETTE ITEMS</span>
              </div>

              {/* Mini List */}
              <div className="flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
                {curatedPalette.map((id) => {
                  const item = PLANT_SPECIES_DB.find((spec) => spec.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs border-b border-outline-variant/5 last:border-b-0 pb-2">
                      <div className="pr-2 select-all">
                        <span className="font-bold text-primary block leading-tight">{item.commonName}</span>
                        <span className="italic text-[9px] text-[#737973]">{item.botanicalName}</span>
                      </div>
                      <button
                        onClick={() => onTogglePalette(id)}
                        className="p-1 rounded text-red-700 hover:bg-red-50"
                        title="Remove specimen from wish list"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="h-[1px] bg-outline-variant/10 mt-2"></div>

              {/* Palette actions */}
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={onStartInquiryFromPalette}
                  className="w-full bg-primary hover:bg-primary-container text-white text-[10px] font-bold py-3 px-3 tracking-widest rounded uppercase cursor-pointer"
                >
                  PLAN CONSULTATION WITH FLORA
                </button>
                <button
                  onClick={onClearPalette}
                  className="w-full text-secondary hover:text-red-700 text-[10px] font-bold py-1 px-3 tracking-wider"
                >
                  CLEAR MY SELECTIONS
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Full detail modal for botanical specimen */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 bg-[#061b0e]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-xl rounded-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Slide showcase image */}
            <div className="relative h-56 w-full">
              <img 
                src={selectedPlant.image} 
                alt={selectedPlant.commonName} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/40"></div>
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-primary/90 text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded">
                  {selectedPlant.type}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-2 text-white drop-shadow">
                  {selectedPlant.commonName}
                </h3>
                <span className="text-[11px] italic text-slate-100 font-medium block mt-0.5">{selectedPlant.botanicalName}</span>
              </div>

              <button 
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spec Card specs body */}
            <div className="p-6 flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
              <div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">ECO-PHYSIOLOGY DESCRIPTION</span>
                <p className="text-secondary text-xs mt-1 leading-relaxed">
                  {selectedPlant.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-surface-container p-4 rounded-lg border border-outline-variant/10">
                <div>
                  <span className="text-[9px] text-[#737973] uppercase font-bold tracking-wider block">SUNLIGHT VALUE</span>
                  <span className="text-xs text-primary font-semibold flex items-center gap-1 mt-0.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                    {selectedPlant.sunlight}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#737973] uppercase font-bold tracking-wider block">WATER SCHEDULE</span>
                  <span className="text-xs text-primary font-semibold flex items-center gap-1 mt-0.5">
                    <Droplet className="w-3.5 h-3.5 text-secondary" />
                    {selectedPlant.water} Demand
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#737973] uppercase font-bold tracking-wider block">PREFERRED SOIL MIXTURE</span>
                  <span className="text-xs text-primary font-semibold block mt-0.5">
                    {selectedPlant.soil}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#737973] uppercase font-bold tracking-wider block">MAX MATURE HEIGHT</span>
                  <span className="text-xs text-primary font-semibold block mt-0.5">
                    {selectedPlant.height}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-0.5">ESTHETIC ARCHITECTURAL ACTION</span>
                <p className="text-xs text-primary font-medium">{selectedPlant.architecturalRole}</p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-0.5">CREST SEASONAL HIGHLIGHTS</span>
                <p className="text-xs text-primary font-medium">{selectedPlant.seasonOfColor}</p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-surface-container border-t border-outline-variant/15 flex items-center justify-between">
              <button
                onClick={() => {
                  onTogglePalette(selectedPlant.id);
                  setSelectedPlant(null);
                }}
                className="bg-primary hover:bg-primary-container text-white text-[10px] font-bold py-2.5 px-4 tracking-widest rounded"
              >
                {curatedPalette.includes(selectedPlant.id) ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
              </button>
              
              <button
                onClick={() => setSelectedPlant(null)}
                className="text-xs font-semibold text-secondary hover:text-primary"
              >
                DISMISS SPECS
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Inline missing tag X component needed for modal close in case lucide name conflict
function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
