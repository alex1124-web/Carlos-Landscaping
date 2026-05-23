export interface LandscapeProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  quote: string;
  scope: string[];
  materials: { name: string; type: string }[];
  plants: { common: string; botanical: string; role: string }[];
  timeline: string;
  costCategory: "$$$" | "$$$$" | "$$$$$";
  beforeImage?: string;
  challenge: string;
  solution: string;
}

export interface PlantSpecies {
  id: string;
  commonName: string;
  botanicalName: string;
  type: "Tree" | "Shrub" | "Perennial" | "Groundcover" | "Ornamental Grass";
  image: string;
  sunlight: "Full Sun" | "Partial Shade" | "Full Shade" | "Sun to Part Shade";
  water: "Low" | "Medium" | "High";
  soil: "Sandy" | "Loamy" | "Clay" | "Well-Drained";
  height: string;
  architecturalRole: string;
  seasonOfColor: string;
  description: string;
}

export interface Inquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  zipCode: string;
  style: string;
  budget: string;
  elements: string[];
  areaSize: string;
  notes: string;
  timestamp: string;
  curatedPlants?: string[];
  estimatedCost?: number;
}
