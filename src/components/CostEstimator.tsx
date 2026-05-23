import { useState } from "react";
import { LandscapeProject } from "../types";
import { DollarSign, Percent, Calculator, FileCheck, Info, User, HelpCircle, HardHat } from "lucide-react";

interface CostEstimatorProps {
  initialSelectedProject?: LandscapeProject | null;
  onConfirmEstimate: (estimateDetails: any) => void;
}

export default function CostEstimator({ initialSelectedProject = null, onConfirmEstimate }: CostEstimatorProps) {
  const [areaSize, setAreaSize] = useState<number>(initialSelectedProject ? 2500 : 1200);
  const [slopeFactor, setSlopeFactor] = useState<string>("Flat (Standard)");
  const [hardscapeMaterial, setHardscapeMaterial] = useState<string>("Teak & Silver Limestone");
  const [floraDensity, setFloraDensity] = useState<string>("Bespoke Cluster");
  const [aquaticFeature, setAquaticFeature] = useState<string>("Recirculating Creek Bioswale");
  const [lightingZones, setLightingZones] = useState<number>(3);
  
  const [activeTab, setActiveTab] = useState<"calculator" | "invoice">("calculator");
  const [proposalConfirmed, setProposalConfirmed] = useState<boolean>(false);

  // Constants for pricing variables
  const BASE_GRADING_RATE = 4.5; // per sq ft
  const slopeMultipliers: Record<string, number> = {
    "Flat (Standard)": 1.0,
    "Gentle Slope (< 15 degrees)": 1.25,
    "Heavy Slope (15 - 30 degrees)": 1.5,
    "Severe Ravine Slopes (Helix anchor anchors required)": 2.1
  };

  const hardscapeMaterialRates: Record<string, number> = {
    "Architectural Concrete Poured": 15,
    "Teak & Silver Limestone": 28,
    "Basalt Slates & Tuscan Cobble": 34,
    "None / Only Flora Bedding": 0
  };

  const floraRates: Record<string, number> = {
    "Sparsely Wild (Natural meadow)": 6,
    "Bespoke Cluster (Dwarf pines, boxwood framing)": 12,
    "Estate centerpiece cluster (Mature olive, century palms)": 22
  };

  const aquaticRates: Record<string, number> = {
    "Recirculating Creek Bioswale": 8500,
    "Reflecting Pool (Static spillways)": 14000,
    "Negative-Edge pool (Complete hydraulic integration)": 38000,
    "None": 0
  };

  const lightingZoneRate = 1850; // per electrical zone (includes high end copper spot fittings)

  // Calculations
  const baseGradingCost = Math.round(areaSize * BASE_GRADING_RATE * slopeMultipliers[slopeFactor]);
  const hardscapeCost = Math.round(areaSize * (hardscapeMaterialRates[hardscapeMaterial] || 0));
  const floraCost = Math.round(areaSize * (floraRates[floraDensity] || 0));
  const aquaticCost = aquaticRates[aquaticFeature] || 0;
  const lightingCost = lightingZones * lightingZoneRate;
  
  const subTotal = baseGradingCost + hardscapeCost + floraCost + aquaticCost + lightingCost;
  const architecturalFee = Math.round(subTotal * 0.12); // 12% design draft fee
  const soilTestingFee = 1650;
  const grandTotal = subTotal + architecturalFee + soilTestingFee;

  // Confirming and submitting the Proposal Inquiry details
  const handleConfirmProposal = () => {
    setProposalConfirmed(true);
    onConfirmEstimate({
      areaSize: `${areaSize} sq ft`,
      style: `${hardscapeMaterial} Hardscape with ${floraDensity} Flora`,
      zipCode: "Local Client Site",
      budget: `$${grandTotal.toLocaleString()}`,
      estimatedCost: grandTotal,
      notes: `Slope: ${slopeFactor}, Aquatic: ${aquaticFeature}, Lighting zones: ${lightingZones}. Calculated Proposal Sheet.`,
      elements: [hardscapeMaterial, floraDensity, aquaticFeature, `Luminaries ${lightingZones} zones`].filter(el => el !== "None")
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
      
      {/* Title Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[11px] text-secondary font-extrabold uppercase tracking-[0.2em]">PARAMETRIC CAPITAL ANALYSIS</span>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mt-2">Interactive Cost Estimator</h2>
        <p className="text-secondary text-xs lg:text-sm max-w-2xl mt-2">
          Formulate detailed architectural budget projections. Select dimensions, grade parameters, materials grading, and custom water variables for real-time visual balance sheets.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex border-b border-outline-variant/20 mb-8 select-none">
        <button
          onClick={() => {
            setActiveTab("calculator");
            setProposalConfirmed(false);
          }}
          className={`px-6 py-3 text-xs tracking-widest font-bold border-b-2 transition ${
            activeTab === "calculator"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          1. SPECIFICATION PANEL
        </button>
        <button
          onClick={() => setActiveTab("invoice")}
          className={`px-6 py-3 text-xs tracking-widest font-bold border-b-2 transition ${
            activeTab === "invoice"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          2. EXQUISITE WORK SHEET
        </button>
      </div>

      {activeTab === "calculator" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls parameters */}
          <div className="lg:col-span-7 bg-surface-container p-6 lg:p-8 rounded-lg border border-outline-variant/15 flex flex-col gap-6">
            <h3 className="font-serif text-sm font-bold text-primary border-b border-outline-variant/20 pb-2 mb-2 flex items-center gap-1.5ClassName">
              <Calculator className="w-4.5 h-4.5 text-primary" />
              STRUCTURAL & BOTANICAL PARAMETERS
            </h3>

            {/* Area Size */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block">PROPOSED AREA INFLUENCE (SQ FT)</label>
                <span className="text-xs font-bold text-primary font-serif">{areaSize.toLocaleString()} SQ FT</span>
              </div>
              <input 
                type="range" 
                min="200" 
                max="15000" 
                step="100"
                value={areaSize}
                onChange={(e) => setAreaSize(parseInt(e.target.value))}
                className="w-full accent-primary cursor-pointer mt-1"
              />
              <div className="flex justify-between text-[10px] text-secondary mt-1">
                <span>200 sq ft (Bespoke Patio)</span>
                <span>15,000 sq ft (Manor Ground)</span>
              </div>
            </div>

            {/* Grid for two panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Grading and slopes */}
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">SLOPE / TERRAIN GEOMETRY</label>
                <select
                  value={slopeFactor}
                  onChange={(e) => setSlopeFactor(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:outline-none focus:border-primary"
                >
                  {Object.keys(slopeMultipliers).map((slope) => (
                    <option key={slope} value={slope}>{slope}</option>
                  ))}
                </select>
                <span className="text-[9px] text-[#737973] inline-flex items-center gap-1 mt-1 font-medium">
                  <Info className="w-3 h-3 block shrink-0" />
                  Grade work multiplier: x{slopeMultipliers[slopeFactor]}
                </span>
              </div>

              {/* Hardscaping materials rates */}
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">HARDSCAPE MATERIAL SPECIFICATION</label>
                <select
                  value={hardscapeMaterial}
                  onChange={(e) => setHardscapeMaterial(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:outline-none focus:border-primary"
                >
                  {Object.keys(hardscapeMaterialRates).map((mat) => (
                    <option key={mat} value={mat}>
                      {mat} (${hardscapeMaterialRates[mat]}/sq ft)
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Grid for two other options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Plants density and specimen maturity */}
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">BOTANICAL SPECIES DENSTIY</label>
                <select
                  value={floraDensity}
                  onChange={(e) => setFloraDensity(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:outline-none focus:border-primary"
                >
                  {Object.keys(floraRates).map((rate) => (
                    <option key={rate} value={rate}>
                      {rate} (${floraRates[rate]}/sq ft)
                    </option>
                  ))}
                </select>
              </div>

              {/* Water features hydraulic integration */}
              <div>
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1.5">AQUATIC / REFLECTING ELEMENTS</label>
                <select
                  value={aquaticFeature}
                  onChange={(e) => setAquaticFeature(e.target.value)}
                  className="w-full bg-background border border-outline-variant text-xs p-3 rounded focus:outline-none focus:border-primary"
                >
                  {Object.keys(aquaticRates).map((aq) => (
                    <option key={aq} value={aq}>
                      {aq === "None" ? "No Aquatic Element" : `${aq} (+$${aquaticRates[aq].toLocaleString()})`}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Lighting Zones */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] text-primary font-bold uppercase tracking-wider block">ELECTRICAL LIGHTING FIXTURE ZONES</label>
                <span className="text-xs font-bold text-primary">{lightingZones} Zones</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={lightingZones}
                onChange={(e) => setLightingZones(parseInt(e.target.value))}
                className="w-full accent-primary cursor-pointer mt-1"
              />
              <p className="text-[9px] text-[#737973] mt-1">Every fixture zone includes custom 24V solid brass ground uplit spotlights and soft dusk path wash lights (+$1,850/zone).</p>
            </div>

            {/* Project match banner if applicable */}
            {initialSelectedProject && (
              <div className="bg-primary/5 border border-primary/15 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase block">PROPOSAL PRE-SET LOADER</span>
                  <p className="text-xs text-secondary font-semibold">Matched template parameters for: &ldquo;{initialSelectedProject.title}&rdquo;</p>
                </div>
                <span className="text-[10px] bg-primary text-white font-bold p-1 px-2.5 rounded">PRESET MATCHED</span>
              </div>
            )}

          </div>

          {/* Right Side: Quick summary total calculation */}
          <div className="lg:col-span-5 bg-primary-container text-white p-8 rounded-lg flex flex-col justify-between shadow-luxurious relative overflow-hidden">
            
            {/* Top design background line */}
            <div className="absolute right-0 bottom-0 top-0 w-32 bg-white/5 skew-x-12 select-none pointer-events-none"></div>

            <div className="flex flex-col gap-6 relative z-10">
              <div>
                <span className="text-amber-200 text-[10px] tracking-[0.2em] font-extrabold uppercase">ESTIMATED PROJECTION MASTER</span>
                <h4 className="font-serif text-xl font-bold mt-1 text-slate-100">Bespoke Estimate</h4>
              </div>

              {/* Line items mini breakdown */}
              <div className="flex flex-col gap-3 font-medium text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Soil Preparation & Slope Grading</span>
                  <span>${baseGradingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Hardscape Material Installation</span>
                  <span>${hardscapeCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Botanical Specimen Cultivation</span>
                  <span>${floraCost.toLocaleString()}</span>
                </div>
                {aquaticCost > 0 && (
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Aquatic Engineering & Hydraulic Setup</span>
                    <span>${aquaticCost.toLocaleString()}</span>
                  </div>
                )}
                {lightingCost > 0 && (
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Low-Voltage Luminary Zones</span>
                    <span>${lightingCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total display */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider block">ARCHITECTURAL TOTAL PROJECTION</span>
                <div className="font-serif text-3xl md:text-4xl font-extrabold text-white mt-1.5 flex items-baseline">
                  <span className="text-xs font-normal mr-0.5">$</span>
                  {grandTotal.toLocaleString()}
                  <span className="text-xs text-slate-300 font-sans font-medium ml-2">Estimated Setup</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Includes 12% architectural drafting and soil-testing site surveyor fees (${architecturalFee.toLocaleString()} + $1,650).
                </p>
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-2 relative z-10">
              <button
                onClick={() => setActiveTab("invoice")}
                className="w-full bg-white hover:bg-[#efeeec] text-primary text-xs font-bold py-4 tracking-widest rounded transition text-center uppercase"
              >
                VIEW WORK SHEET PROJECTION
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Work Sheet invoice view style */
        <div className="max-w-3xl mx-auto bg-white border border-outline-variant/30 rounded-lg p-6 md:p-12 shadow-luxurious relative">
          
          {/* Logo brand */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-outline-variant/20 pb-6 mb-8 gap-4 select-none">
            <div>
              <h4 className="font-serif text-lg font-bold text-primary">Carlos Landscaping Studio</h4>
              <p className="text-[9px] text-[#737973] uppercase tracking-wider">Bespoke Architectural Garden Creators</p>
              <p className="text-[10px] text-[#737973] mt-1 leading-relaxed">9055 Philbin Ave • Riverside, CA 92503 • CarlosLandscape.org</p>
            </div>
            <div className="md:text-right">
              <span className="text-[9px] text-primary font-bold bg-primary-container/10 px-3 py-1 rounded">ESTATE CAPITAL PROJECTION</span>
              <p className="text-[10px] text-secondary mt-1 font-semibold select-all">Proposal ID: #CLP-2026-9055</p>
              <p className="text-[9px] text-secondary">Document Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Section details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface-container-low p-4 rounded border border-outline-variant/10">
              <span className="text-[8px] font-bold text-primary block mb-2 uppercase">CLIENT LAND PREPARATION TARGET</span>
              <table className="text-[11px] text-secondary w-full">
                <tbody>
                  <tr>
                    <td className="py-0.5">ESTATE AREA SIZE</td>
                    <th className="py-0.5 text-right text-primary font-bold select-all">{areaSize.toLocaleString()} SQ FT</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">SLOPE STABILIZATION</td>
                    <th className="py-0.5 text-right text-primary font-bold">{slopeFactor}</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">HARDSCAPE STYLE</td>
                    <th className="py-0.5 text-right text-primary font-bold">{hardscapeMaterial}</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">FLORA MATURITY</td>
                    <th className="py-0.5 text-right text-primary font-bold">{floraDensity}</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-surface-container-low p-4 rounded border border-outline-variant/10">
              <span className="text-[8px] font-bold text-primary block mb-2 uppercase">ENGINEERING AND ELECTRICAL LAYERS</span>
              <table className="text-[11px] text-secondary w-full">
                <tbody>
                  <tr>
                    <td className="py-0.5">AQUATIC COMPONENT</td>
                    <th className="py-0.5 text-right text-primary font-bold">{aquaticFeature}</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">ELECTRICAL ZONES</td>
                    <th className="py-0.5 text-right text-primary font-bold">{lightingZones} Copper Spotlight Zones</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">SURVEYING FEE</td>
                    <th className="py-0.5 text-right text-primary font-bold">$1,650 (Fixed)</th>
                  </tr>
                  <tr>
                    <td className="py-0.5">ARCHITECTURAL PRE-FEE</td>
                    <th className="py-0.5 text-right text-primary font-bold">12% Included</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed tabular balance structure */}
          <div className="mb-8">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-primary/20 text-[10px] text-primary uppercase font-bold">
                  <th className="py-2">Fabrication Category / Spec Item</th>
                  <th className="py-2 text-right">Calculation Factor</th>
                  <th className="py-2 text-right">Line Calculation</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                <tr className="border-b border-outline-variant/10">
                  <td className="py-3">
                    <span className="font-bold text-primary block">Soil Grading & Grade leveling</span>
                    <span className="text-[9px] text-[#737973]">Calculated matching dynamic slope factor {slopeFactor}</span>
                  </td>
                  <td className="py-3 text-right">Rate base (${BASE_GRADING_RATE})</td>
                  <td className="py-3 text-right font-semibold text-primary">${baseGradingCost.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-3">
                    <span className="font-bold text-primary block">Slabs & Hardscape masonry work</span>
                    <span className="text-[9px] text-[#737973]">Finished paving and retaining walls using premium {hardscapeMaterial}</span>
                  </td>
                  <td className="py-3 text-right">Area: {areaSize} sq ft</td>
                  <td className="py-3 text-right font-semibold text-primary">${hardscapeCost.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-3">
                    <span className="font-bold text-primary block">Bespoke Botanical selections planting</span>
                    <span className="text-[9px] text-[#737973]">Planted and layout spacing configuration featuring: {floraDensity} Density</span>
                  </td>
                  <td className="py-3 text-right">Area: {areaSize} sq ft</td>
                  <td className="py-3 text-right font-semibold text-primary">${floraCost.toLocaleString()}</td>
                </tr>
                {aquaticCost > 0 && (
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-3">
                      <span className="font-bold text-primary block">Aquatic Engineering & Hydraulic installation</span>
                      <span className="text-[9px] text-[#737973]">{aquaticFeature} integration</span>
                    </td>
                    <td className="py-3 text-right">Specific Flat Rate</td>
                    <td className="py-3 text-right font-semibold text-primary">${aquaticCost.toLocaleString()}</td>
                  </tr>
                )}
                {lightingCost > 0 && (
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-3">
                      <span className="font-bold text-primary block">Low-Voltage luminary spotlights wiring</span>
                      <span className="text-[9px] text-[#737973]">{lightingZones} custom solid brass high-efficiency spotlight systems</span>
                    </td>
                    <td className="py-3 text-right">Zones: {lightingZones} Zone</td>
                    <td className="py-3 text-right font-semibold text-primary">${lightingCost.toLocaleString()}</td>
                  </tr>
                )}
                <tr className="border-b border-outline-variant/10">
                  <td className="py-3">
                    <span className="font-bold text-primary block">Drafting & Engineering architectural blueprint fee</span>
                    <span className="text-[9px] text-[#737973]">Bespoke drafting and aesthetic balance review</span>
                  </td>
                  <td className="py-3 text-right">Rate standard (12%)</td>
                  <td className="py-3 text-right font-semibold text-primary">${architecturalFee.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-3">
                    <span className="font-bold text-primary block">Soil testing & Land survey checklist fee</span>
                    <span className="text-[9px] text-[#737973]">Geological structural core drill test</span>
                  </td>
                  <td className="py-3 text-right">Fixed cost</td>
                  <td className="py-3 text-right font-semibold text-primary">$1,650</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Grand total segment */}
          <div className="flex justify-between items-center bg-primary-container text-white p-5 rounded mt-6">
            <div>
              <span className="text-[8px] tracking-wider text-amber-300 block font-bold">TOTAL ESTIMATE PROJECTION VALUE</span>
              <p className="text-[10px] text-[#c3c8c1] leading-relaxed">Guaranteed projection matching selected layout specs for 180 days.</p>
            </div>
            <div className="font-serif text-2xl font-bold text-slate-100 select-all">
              ${grandTotal.toLocaleString()}
            </div>
          </div>

          {/* Submitting confirmation feedback */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => {
                setActiveTab("calculator");
                setProposalConfirmed(false);
              }}
              className="text-xs font-bold text-secondary hover:text-primary tracking-wide py-2"
            >
              ← RETURN SPEC PANELS
            </button>

            {proposalConfirmed ? (
              <div className="text-xs font-semibold text-primary bg-primary/10 p-3 rounded border border-primary/20 flex items-center gap-2 select-all">
                <FileCheck className="w-4 h-4 text-primary animate-pulse" />
                <span>Exquisite Proposal Inquire submitted to project workspace team.</span>
              </div>
            ) : (
              <button
                onClick={handleConfirmProposal}
                className="bg-primary hover:bg-primary-container text-white text-[10px] font-bold py-3 px-6 tracking-widest rounded transition uppercase"
              >
                PROCEED TO ESTIMATE SUBMIT
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
