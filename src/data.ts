import { LandscapeProject, PlantSpecies } from "./types";

export const PORTFOLIO_PROJECTS: LandscapeProject[] = [
  {
    id: "ravine-estate",
    title: "The Ravine Estate",
    category: "Contemporary Hardscaping",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA28vWkibtA9pL5Fp8seu-XRr3hpRDDG1hjkqCBbkykRYryY_xlcpPfkXTz_yqt1elz_FD9wo8j1P51_1WU9DVNZi9B8Wp_zrGo5OHlNJG1B1X7larN5PxqFqWeq843wL44Ej3ebCVN-QOreEZ32faZ63DQQd-jVc5nLl5yBPfg5A-Cegrb1NfIzZ1RHRDEaENu1oADELt-ljotPJtwuFRexiPz-7sNTaJff4pxuaRgw7vTZFj9bspU5eu7qf83LKR8ooIbbADZgVlxVTI",
    description: "An elegant patio with high-end limestone paving and a custom fire pit made of dark basalt. Lush, structured plantings of ferns and ornamental grasses frame the seating area.",
    quote: "Carlos transformed our ravine slope into a living masterpiece. The basalt fire circle feels rooted in the earth, and the light washes beautifully at dusk.",
    scope: [
      "Custom basalt fire-pit fabrication",
      "Pristine silver-grey limestone paving",
      "Subtle ground wash uplighting",
      "Perennial ornamental grass bedding",
      "Tiered structural drainage integration"
    ],
    materials: [
      { name: "Silver Limestone", type: "Paving & Stairs" },
      { name: "Basalt Grains & Slabs", type: "Custom Fire Ring" },
      { name: "Corten Steel Panels", type: "Soil Retention" }
    ],
    plants: [
      { common: "Japanese Forest Grass", botanical: "Hakonechloa macra", role: "Soft texture borders" },
      { common: "Ostrich Fern", botanical: "Matteuccia struthiopteris", role: "Lush shade foliage" },
      { common: "Paperbark Maple", botanical: "Acer grisium", role: "Cinnamon bark specimen tree" }
    ],
    timeline: "12 Weeks",
    costCategory: "$$$$",
    beforeImage: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
    challenge: "Extreme silt erosion and a 30-degree steep slope made standard stone paving impossible without rigorous soil anchors.",
    solution: "Using hidden structural helical anchors and a series of Corten steel retention levels, we secured the bank and nested the fire pavilion into the land."
  },
  {
    id: "minimalist-verticals",
    title: "Minimalist Verticals",
    category: "Architectural Concrete",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUZprrmNr0lKoEusJpPIo2utqKOLmsQa6Eh5lMDcENzkxCatc0wmFgCsH4msny7TafdZer2HjnG4XaMqsnoejAwCk1ZFx4AbZ_HosKO-eWsqvKJMcqNtax7AFf2La-JtTx1Gz4tgHeZ_c4up_Zdvk0omo2mCxwqC33GTDD4H0ueJ84ZN9xM7_YXnk9aCjMTHksyx1bX6FDyspank38ZpbWnZxw-Yy8ipau4Dww97uJvolCD-BKYjUt05tXlOTn6lOabZ3RwlVOnWwq5ec",
    description: "A minimalist architectural garden featuring vertical concrete walls acting as planters for trailing ivy. Clean lines emphasize spatial purity and concrete texturing.",
    quote: "A sublime study of brutalism meeting softness. The concrete seams align perfectly with the interior windows of our home, completing the gallery feel.",
    scope: [
      "Cast-in-place board-formed concrete planter borders",
      "Precise alignment with interior architectural sightlines",
      "Dwarf pine specimen potting",
      "Embedded low-voltage spot fixtures",
      "Polished basalt river stone ground wash"
    ],
    materials: [
      { name: "Board-Formed Architectural Concrete", type: "Retaining planter walls" },
      { name: "Matte Black Aluminum Trim", type: "Shadow gaps" },
      { name: "Szechuan River Pebbles", type: "Ground cover texture" }
    ],
    plants: [
      { common: "Japanese Black Pine", botanical: "Pinus thunbergii 'Kotobuki'", role: "Architectural focal specimen" },
      { common: "Boston Ivy", botanical: "Parthenocissus tricuspidata", role: "Cascading wall wrap" },
      { common: "Mondo Grass", botanical: "Ophiopogon japonicus", role: "Deep emerald carpet" }
    ],
    timeline: "8 Weeks",
    costCategory: "$$$",
    beforeImage: "https://images.unsplash.com/photo-1590012357609-0a1372af98aa?auto=format&fit=crop&w=1200&q=80",
    challenge: "The concrete walls required a flawless poured finish with exactly 2-inch wood board textures that matched the high exacting criteria of a brutalist aesthetic.",
    solution: "We milled custom Douglas Fir formwork and used a specialized self-consolidating architectural concrete mix to ensure zero air voids and pristine surface relief."
  },
  {
    id: "azure-slope",
    title: "Azure Slope",
    category: "Terraced Ecology",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG2J619FvukSrJ2VKnvMcw_XomeDNWw3tDagHLenV5KpuxXdK4mZU3BECdOkx6wtueAaN60N-DeBK010n2rLBmYlNT2oeP6n3TSTEZxV7CUtynAt_IlrDw4dkzPYQ8PppnAkEtcKzVOaxdw-A3fJDo1aFIJSz3nHH_IpZfohuO92j3cum1NmPJxMm9MomohJFKCByb1MzNBGj2VRtD_4Tig72SOeT5yQd-4j2XlX6V4skN2Hr0Tf4PYDJRVBl-quWoCdRShoQn1TFFNDc",
    description: "A lush, tiered hillside garden with sustainable water features, curving wooden steps, and carefully dense micro-shrub topiary frames that respect the natural hydrology.",
    quote: "Carlos honored the existing flow of rainwater, turning what used to be a muddy bog into a series of crystal pools flanked by sculptural multi-tiered moss boxes.",
    scope: [
      "Natural stone stepped cascade water feature",
      "Curving hand-milled teak transition steps",
      "Precision boxwood topiary globes in graduated scales",
      "Hydraulic recirculation pump hidden within rock cavities",
      "Sustainable biological filtration system"
    ],
    materials: [
      { name: "Tuscan Fieldstone Blocks", type: "Stream banking & walls" },
      { name: "Grade-A Natural Teak Wood", type: "Floating walk treads" },
      { name: "Fine Granite Aggregates", type: "Permeable base" }
    ],
    plants: [
      { common: "Japanese Boxwood", botanical: "Buxus microphylla", role: "Clouds of deep green spheres" },
      { common: "Golden Hinoki Cypress", botanical: "Chamaecyparis obtusa 'Nana'", role: "Miniature tiered structures" },
      { common: "Irish Moss", botanical: "Sagina subulata", role: "Tactile bright green carpet" }
    ],
    timeline: "14 Weeks",
    costCategory: "$$$$$",
    beforeImage: "https://images.unsplash.com/photo-1558904541-efa8c1a68f6f?auto=format&fit=crop&w=1200&q=80",
    challenge: "The hillside had high hydrostatic pressure and clay soil that was heavily saturated, leading to swampy and unstable footing.",
    solution: "We integrated underlying French drains and designed an active creek bed with living filtration plants to collect and recirculate water sustainably."
  },
  {
    id: "horizon-infinity",
    title: "Horizon Infinity",
    category: "Aquatic Engineering",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQj76CvzgWiyppu7HYFPF8kjj3SpbszcYmGavE3HE63WMWAR6c5GWKbo3OYFxt-A6DfF3_TIo6HyoKWY_AU_VOlouyADZR9PaY7iR4ICohK18dIswmSpId7H6JJlIESBD4B5HRNp91Y0j7pn2zSGQUoBH9NyGB5YJ8lp681IvGOyA-TmiP3pCkpP0Hpqr42YpFHSJUJR2t1b1Kxver1X0AFO-1-_owiL8U2yciXEr89qHczw3X4s7syQiIaPmdyqQZJ7mOvrKU0p5tFPE",
    description: "A luxury backyard remodel featuring a negative-edge reflecting pool that perfectly mirrors the twilight sky, framed by sleek loungers and minimalist privacy screens.",
    quote: "The visual line from our dining table across the water to the horizon is absolute perfection. It feels like living in an endless high-end resort.",
    scope: [
      "Negative-edge swimming pool & integrated hot tub design",
      "Invisible channel perimeter drainage",
      "Ultra-wide stone outdoor kitchen masonry",
      "Teak architectural shade pergolas",
      "Gas-fire element alignment"
    ],
    materials: [
      { name: "Thassos White Marble Tile", type: "Pool interior & decking" },
      { name: "Charcoal Slate Slab", type: "Perimeter spillways" },
      { name: "Smoked Oak Planks", type: "Architectural wind panels" }
    ],
    plants: [
      { common: "Bougainvillea", botanical: "Bougainvillea spectabilis", role: "Vibrant fuchsia vertical cascade" },
      { common: "Olive Tree (Century Old)", botanical: "Olea europaea", role: "Ancient centerpiece specimen" },
      { common: "Blue Fescue", botanical: "Festuca glauca", role: "Steel-blue structural tussocks" }
    ],
    timeline: "18 Weeks",
    costCategory: "$$$$$",
    beforeImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    challenge: "The soil below the pool had low load-bearing capacity and sand pockets, threatening the long-term leveling of a zero-edge spillway.",
    solution: "We engineered a deep foundation structure using twenty-four 40-foot deep concrete piers to guarantee zero-tolerance leveling for the pool deck."
  }
];

export const PLANT_SPECIES_DB: PlantSpecies[] = [
  {
    id: "jp-black-pine",
    commonName: "Japanese Black Pine",
    botanicalName: "Pinus thunbergii 'Kotobuki'",
    type: "Tree",
    image: "https://images.unsplash.com/photo-1613143323153-90dccbdd1906?auto=format&fit=crop&w=600&q=80",
    sunlight: "Full Sun",
    water: "Low",
    soil: "Well-Drained",
    height: "10 - 15 ft",
    architecturalRole: "Focal specimen for entryways and courtyard sightlines",
    seasonOfColor: "Evergreen (Year-round visual presence)",
    description: "An extraordinarily architectural evergreen with dense, upright branches and deep emerald needles. Highly receptive to aesthetic structural pruning and cloud-forming."
  },
  {
    id: "forest-grass",
    commonName: "Japanese Forest Grass",
    botanicalName: "Hakonechloa macra 'Aureola'",
    type: "Ornamental Grass",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    sunlight: "Partial Shade",
    water: "Medium",
    soil: "Loamy",
    height: "1 - 2 ft",
    architecturalRole: "Soft-textured movement borders contrasting rigid stonework",
    seasonOfColor: "Bright gold-green in Summer, copper-tan in Autumn",
    description: "A cascade of brilliant golden-striped ribbons that ripples elegantly in the wind. Prefers cool shade and moisture, creating fluid movement across stone margins."
  },
  {
    id: "boxwood-globe",
    commonName: "Japanese Boxwood",
    botanicalName: "Buxus microphylla 'Green Beauty'",
    type: "Shrub",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    sunlight: "Sun to Part Shade",
    water: "Medium",
    soil: "Well-Drained",
    height: "3 - 5 ft (Pruned to size)",
    architecturalRole: "Structural cloud geometries and spatial framing hedges",
    seasonOfColor: "Deep bronze-green in Winter, brilliant lime-crest in Spring",
    description: "The premier species for creating clean spheres and organic hedge lines. Tough, responsive to precision topiary shear work, and perfectly dense."
  },
  {
    id: "ancient-olive",
    commonName: "Ancient Olive Tree",
    botanicalName: "Olea europaea",
    type: "Tree",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80",
    sunlight: "Full Sun",
    water: "Low",
    soil: "Sandy",
    height: "15 - 25 ft",
    architecturalRole: "Majestic focal centerpiece for Mediterranean or dry-stone gardens",
    seasonOfColor: "Silvery-grey and sage foliage year-round",
    description: "With an incredibly gnarled, sculptural trunk and delicate shimmering leaves, our hand-selected ancient olive trees infuse historical presence and quiet authority."
  },
  {
    id: "ostrich-fern",
    commonName: "Ostrich Fern",
    botanicalName: "Matteuccia struthiopteris",
    type: "Perennial",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
    sunlight: "Full Shade",
    water: "High",
    soil: "Clay",
    height: "3 - 4 ft",
    architecturalRole: "Fretwork shadow texture for shaded ravine paths and pools",
    seasonOfColor: "Emerald Green in Spring and Summer, Amber brown in Fall",
    description: "Feathery, giant plumes that unfurl majestically in early spring. Ideal for woodland settings and riverine borders where clay soils hold cool moisture."
  },
  {
    id: "purple-agapanthus",
    commonName: "Lily of the Nile",
    botanicalName: "Agapanthus praecox",
    type: "Perennial",
    image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    sunlight: "Full Sun",
    water: "Medium",
    soil: "Loamy",
    height: "2 - 3 ft",
    architecturalRole: "Sleek blue bursts that outline linear aquatic elements",
    seasonOfColor: "Cobalt and powder-blue globes throughout Summer",
    description: "Stately clusters of globose flowers rising above arching dark-green strap leaves. Incredible resistance to coastal winds and summer heatwaves."
  }
];
