export type Project = {
  id: string;
  name: string;
  client: string;
  type: "Balcony" | "Terrace" | "Garden" | "Landscape";
  city: string;
  area: string;
  style: string;
  thumbnail: string;
  updatedAt: string;
  status: "Draft" | "In Review" | "Approved" | "Delivered";
  budget: number;
};

export const PROJECTS: Project[] = [
  { id: "p1", name: "Skyline Balcony Retreat", client: "Mehta Residence", type: "Balcony", city: "Mumbai", area: "120 sq ft", style: "Minimal", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", updatedAt: "2h ago", status: "In Review", budget: 185000 },
  { id: "p2", name: "Tropical Terrace Garden", client: "Kapoor Villa", type: "Terrace", city: "Goa", area: "640 sq ft", style: "Tropical", thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", updatedAt: "Yesterday", status: "Approved", budget: 720000 },
  { id: "p3", name: "Zen Courtyard", client: "Iyer Estate", type: "Garden", city: "Bengaluru", area: "880 sq ft", style: "Zen", thumbnail: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80", updatedAt: "3d ago", status: "Draft", budget: 450000 },
  { id: "p4", name: "Café Rooftop Lounge", client: "Brew & Bloom Co.", type: "Terrace", city: "Pune", area: "1100 sq ft", style: "Café-style", thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", updatedAt: "5d ago", status: "Delivered", budget: 980000 },
  { id: "p5", name: "Luxury Penthouse Garden", client: "Rao Penthouse", type: "Terrace", city: "Hyderabad", area: "1800 sq ft", style: "Luxury", thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", updatedAt: "1w ago", status: "In Review", budget: 2400000 },
  { id: "p6", name: "Organic Edible Garden", client: "Singh Farmhouse", type: "Garden", city: "Chandigarh", area: "2200 sq ft", style: "Organic", thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80", updatedAt: "2w ago", status: "Approved", budget: 540000 },
];

export const TEMPLATES = [
  { id: "t1", name: "Petite Parisian Balcony", theme: "Minimal", area: "60–120 sq ft", cost: 95000, tier: "Modern", thumbnail: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80" },
  { id: "t2", name: "Tuscan Terrace", theme: "Luxury", area: "400–700 sq ft", cost: 480000, tier: "Luxury", thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" },
  { id: "t3", name: "Bali Tropical Escape", theme: "Tropical", area: "300–600 sq ft", cost: 360000, tier: "Modern", thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
  { id: "t4", name: "Kyoto Zen Court", theme: "Zen", area: "500–900 sq ft", cost: 410000, tier: "Traditional", thumbnail: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800&q=80" },
  { id: "t5", name: "Brooklyn Loft Patio", theme: "Contemporary", area: "150–300 sq ft", cost: 220000, tier: "Modern", thumbnail: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
  { id: "t6", name: "Cottage Wildflower", theme: "Organic", area: "200–500 sq ft", cost: 175000, tier: "Traditional", thumbnail: "https://images.unsplash.com/photo-1416664806563-bb6be3be8b3d?w=800&q=80" },
  { id: "t7", name: "Riviera Café Deck", theme: "Café-style", area: "400–800 sq ft", cost: 540000, tier: "Modern", thumbnail: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" },
  { id: "t8", name: "Skyline Penthouse", theme: "Luxury", area: "1000+ sq ft", cost: 1850000, tier: "Luxury", thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80" },
];

export type AssetCategory = "Plants" | "Pots" | "Pergolas" | "Seating" | "Tables" | "Flooring" | "Railings" | "Lighting" | "Decor" | "Vertical Garden" | "Water Features";

export const ASSET_CATEGORIES: { name: AssetCategory; icon: string }[] = [
  { name: "Plants", icon: "🪴" },
  { name: "Pots", icon: "🏺" },
  { name: "Pergolas", icon: "🏛️" },
  { name: "Seating", icon: "🪑" },
  { name: "Tables", icon: "🍽️" },
  { name: "Flooring", icon: "🧱" },
  { name: "Railings", icon: "🚧" },
  { name: "Lighting", icon: "💡" },
  { name: "Decor", icon: "🕯️" },
  { name: "Vertical Garden", icon: "🌿" },
  { name: "Water Features", icon: "⛲" },
];

export const ASSETS: Record<AssetCategory, { id: string; name: string; price: number }[]> = {
  Plants: [
    { id: "pl1", name: "Areca Palm", price: 1200 },
    { id: "pl2", name: "Monstera Deliciosa", price: 950 },
    { id: "pl3", name: "Snake Plant", price: 480 },
    { id: "pl4", name: "Bird of Paradise", price: 2400 },
    { id: "pl5", name: "Bougainvillea", price: 650 },
    { id: "pl6", name: "Jasmine Vine", price: 380 },
  ],
  Pots: [
    { id: "po1", name: "Terracotta Round", price: 800 },
    { id: "po2", name: "Concrete Cube", price: 1800 },
    { id: "po3", name: "Glazed Ceramic", price: 1200 },
    { id: "po4", name: "Fiber Tall", price: 2200 },
  ],
  Pergolas: [
    { id: "pe1", name: "Teak Pergola 8x8", price: 78000 },
    { id: "pe2", name: "Bamboo Canopy", price: 32000 },
    { id: "pe3", name: "Steel Modern", price: 95000 },
  ],
  Seating: [
    { id: "s1", name: "Rattan Lounge", price: 24000 },
    { id: "s2", name: "Teak Bench", price: 18000 },
    { id: "s3", name: "Hanging Egg Chair", price: 32000 },
  ],
  Tables: [
    { id: "ta1", name: "Round Bistro", price: 9800 },
    { id: "ta2", name: "Concrete Coffee", price: 14500 },
  ],
  Flooring: [
    { id: "f1", name: "IPE Wood Deck", price: 380 },
    { id: "f2", name: "Artificial Turf", price: 95 },
    { id: "f3", name: "Stone Tile", price: 240 },
  ],
  Railings: [
    { id: "r1", name: "Glass Frameless", price: 1800 },
    { id: "r2", name: "Wrought Iron", price: 950 },
  ],
  Lighting: [
    { id: "l1", name: "Festoon String", price: 2400 },
    { id: "l2", name: "Bollard Light", price: 4800 },
    { id: "l3", name: "Spotlight LED", price: 1200 },
  ],
  Decor: [
    { id: "d1", name: "Stone Lantern", price: 3200 },
    { id: "d2", name: "Outdoor Rug", price: 5400 },
  ],
  "Vertical Garden": [
    { id: "v1", name: "Modular Green Wall", price: 18500 },
    { id: "v2", name: "Felt Pocket Panel", price: 6200 },
  ],
  "Water Features": [
    { id: "w1", name: "Pebble Fountain", price: 22000 },
    { id: "w2", name: "Wall Cascade", price: 48000 },
  ],
};

export const STYLES = ["Minimal", "Luxury", "Tropical", "Zen", "Modern", "Organic", "Café-style", "Contemporary"];

export const TEAM_ACTIVITY = [
  { who: "Aanya Sharma", action: "approved render for", what: "Skyline Balcony Retreat", when: "12m" },
  { who: "Vikram Rao", action: "added 4 plants to", what: "Zen Courtyard", when: "1h" },
  { who: "Priya Nair", action: "shared quotation for", what: "Café Rooftop Lounge", when: "3h" },
  { who: "Daniel Joseph", action: "uploaded site photos to", what: "Luxury Penthouse Garden", when: "Yesterday" },
];
