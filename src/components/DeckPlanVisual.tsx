import { useState } from "react";
import { Layers, Anchor, Utensils, Music, Waves, Bed, ChevronDown, ChevronUp } from "lucide-react";

interface DeckPlan {
  id: string;
  deck_number: number;
  deck_name: string;
  features: string[];
  cabin_categories: string[];
}

interface CabinType {
  id: string;
  name: string;
  category: string;
  deck: string | null;
  base_price_usd: number;
  size_sqft: number;
}

const categoryColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  Interior: { bg: "bg-slate-200", border: "border-slate-400", text: "text-slate-700", label: "Interior" },
  interior: { bg: "bg-slate-200", border: "border-slate-400", text: "text-slate-700", label: "Interior" },
  "Ocean View": { bg: "bg-sky-200", border: "border-sky-400", text: "text-sky-700", label: "Ocean View" },
  ocean_view: { bg: "bg-sky-200", border: "border-sky-400", text: "text-sky-700", label: "Ocean View" },
  Balcony: { bg: "bg-emerald-200", border: "border-emerald-400", text: "text-emerald-700", label: "Balcony" },
  balcony: { bg: "bg-emerald-200", border: "border-emerald-400", text: "text-emerald-700", label: "Balcony" },
  Suite: { bg: "bg-amber-200", border: "border-amber-400", text: "text-amber-700", label: "Suite" },
  suite: { bg: "bg-amber-200", border: "border-amber-400", text: "text-amber-700", label: "Suite" },
  Penthouse: { bg: "bg-purple-200", border: "border-purple-400", text: "text-purple-700", label: "Penthouse" },
  penthouse: { bg: "bg-purple-200", border: "border-purple-400", text: "text-purple-700", label: "Penthouse" },
};

const featureIcons: Record<string, typeof Anchor> = {
  dining: Utensils,
  restaurant: Utensils,
  grill: Utensils,
  buffet: Utensils,
  café: Utensils,
  bistro: Utensils,
  theater: Music,
  theatre: Music,
  lounge: Music,
  club: Music,
  casino: Music,
  spa: Waves,
  pool: Waves,
  fitness: Waves,
  sport: Waves,
  aqua: Waves,
};

function getFeatureIcon(feature: string) {
  const lower = feature.toLowerCase();
  for (const [key, Icon] of Object.entries(featureIcons)) {
    if (lower.includes(key)) return Icon;
  }
  return Anchor;
}

interface Props {
  deckPlans: DeckPlan[];
  cabins?: CabinType[];
  shipName: string;
}

export default function DeckPlanVisual({ deckPlans, cabins, shipName }: Props) {
  const [expandedDeck, setExpandedDeck] = useState<string | null>(null);
  const sorted = [...deckPlans].sort((a, b) => b.deck_number - a.deck_number);
  const maxDeck = sorted[0]?.deck_number || 16;
  const minDeck = sorted[sorted.length - 1]?.deck_number || 1;

  return (
    <div className="space-y-6">
      {/* Ship cross-section SVG */}
      <div className="offer-card overflow-hidden">
        <h3 className="font-heading font-bold text-primary mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Ship Cross-Section — {shipName}
        </h3>

        <div className="relative">
          {/* SVG Ship outline */}
          <svg viewBox="0 0 800 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Ship hull outline */}
            <defs>
              <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210, 40%, 96%)" />
                <stop offset="100%" stopColor="hsl(210, 30%, 88%)" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200, 80%, 70%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(210, 80%, 50%)" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200, 70%, 92%)" />
                <stop offset="100%" stopColor="hsl(200, 50%, 96%)" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="800" height="480" fill="url(#skyGrad)" rx="8" />

            {/* Water */}
            <path d="M0 400 Q100 390 200 400 Q300 410 400 400 Q500 390 600 400 Q700 410 800 400 L800 480 L0 480 Z" fill="url(#waterGrad)" />
            <path d="M0 420 Q100 412 200 420 Q300 428 400 420 Q500 412 600 420 Q700 428 800 420 L800 480 L0 480 Z" fill="hsl(210, 80%, 50%)" opacity="0.15" />

            {/* Ship hull */}
            <path
              d={`M80 ${380} L80 120 Q80 100 100 100 L680 100 Q700 100 710 110 L740 140 Q750 150 750 170 L750 350 Q750 370 730 380 L700 395 Q680 400 660 400 L120 400 Q90 400 80 ${380} Z`}
              fill="url(#hullGrad)"
              stroke="hsl(210, 30%, 70%)"
              strokeWidth="2"
            />

            {/* Bow shape */}
            <path
              d="M710 110 L760 160 Q770 180 770 200 L770 300 Q770 350 750 370 L730 380"
              fill="none"
              stroke="hsl(210, 30%, 70%)"
              strokeWidth="2"
            />
            <path
              d="M710 110 L760 160 Q770 180 770 200 L770 300 Q770 350 750 370 L730 380 L750 350 L750 170 Q750 150 740 140 Z"
              fill="hsl(210, 35%, 90%)"
              stroke="none"
            />

            {/* Funnel */}
            <rect x="300" y="60" width="80" height="50" rx="4" fill="hsl(210, 20%, 30%)" />
            <rect x="310" y="55" width="60" height="10" rx="3" fill="hsl(0, 70%, 55%)" />
            <ellipse cx="340" cy="55" rx="30" ry="5" fill="hsl(210, 20%, 25%)" />

            {/* Deck lines and labels */}
            {sorted.map((deck, i) => {
              const totalDecks = sorted.length;
              const deckHeight = 240 / totalDecks;
              const y = 120 + i * deckHeight;
              const cabinCats = deck.cabin_categories || [];

              // Calculate section widths for cabin categories
              const totalWidth = 620;
              const featureWidth = 200;
              const cabinWidth = totalWidth - featureWidth;
              const catWidth = cabinCats.length > 0 ? cabinWidth / cabinCats.length : cabinWidth;

              return (
                <g key={deck.id}>
                  {/* Deck separator line */}
                  <line x1="85" y1={y} x2="745" y2={y} stroke="hsl(210, 30%, 80%)" strokeWidth="1" strokeDasharray="4 2" />

                  {/* Deck number label */}
                  <rect x="88" y={y + 2} width="32" height={deckHeight - 4} rx="3" fill="hsl(220, 50%, 35%)" />
                  <text x="104" y={y + deckHeight / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">
                    {deck.deck_number}
                  </text>

                  {/* Deck name */}
                  <text x="128" y={y + deckHeight / 2 + 1} dominantBaseline="middle" fill="hsl(220, 30%, 35%)" fontSize="9" fontWeight="600">
                    {deck.deck_name}
                  </text>

                  {/* Cabin category color blocks */}
                  {cabinCats.map((cat, ci) => {
                    const colors = categoryColors[cat] || { bg: "bg-gray-200", border: "border-gray-400", text: "text-gray-600", label: cat };
                    const colorMap: Record<string, string> = {
                      Interior: "hsl(210, 15%, 78%)",
                      interior: "hsl(210, 15%, 78%)",
                      "Ocean View": "hsl(200, 70%, 78%)",
                      ocean_view: "hsl(200, 70%, 78%)",
                      Balcony: "hsl(150, 50%, 75%)",
                      balcony: "hsl(150, 50%, 75%)",
                      Suite: "hsl(40, 70%, 75%)",
                      suite: "hsl(40, 70%, 75%)",
                      Penthouse: "hsl(270, 50%, 78%)",
                      penthouse: "hsl(270, 50%, 78%)",
                    };
                    const fillColor = colorMap[cat] || "hsl(210, 20%, 85%)";
                    const xPos = 230 + ci * catWidth;

                    return (
                      <g key={`${deck.id}-${cat}`}>
                        <rect
                          x={xPos}
                          y={y + 3}
                          width={catWidth - 3}
                          height={deckHeight - 6}
                          rx="3"
                          fill={fillColor}
                          stroke={fillColor.replace("78%", "60%").replace("75%", "55%")}
                          strokeWidth="1"
                          opacity="0.85"
                        />
                        {deckHeight >= 20 && (
                          <text
                            x={xPos + (catWidth - 3) / 2}
                            y={y + deckHeight / 2 + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="hsl(220, 30%, 25%)"
                            fontSize="8"
                            fontWeight="500"
                          >
                            {colors.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Feature dots */}
                  {(deck.features || []).slice(0, 3).map((feat, fi) => (
                    <g key={`${deck.id}-feat-${fi}`}>
                      <circle
                        cx={580 + fi * 50}
                        cy={y + deckHeight / 2}
                        r="8"
                        fill="hsl(220, 50%, 35%)"
                        opacity="0.15"
                      />
                      <text
                        x={580 + fi * 50}
                        y={y + deckHeight / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="hsl(220, 50%, 35%)"
                        fontSize="8"
                      >
                        {feat.charAt(0)}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Waterline */}
            <line x1="0" y1="395" x2="800" y2="395" stroke="hsl(200, 70%, 60%)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
            <text x="30" y="392" fill="hsl(200, 70%, 50%)" fontSize="9" fontWeight="500" opacity="0.7">Waterline</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border">
          {Object.entries(categoryColors)
            .filter(([key]) => key === key.charAt(0).toUpperCase() + key.slice(1) || !key.includes("_"))
            .filter(([key]) => !key.includes("_"))
            .map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-4 h-3 rounded-sm ${val.bg} ${val.border} border`} />
                <span className="text-xs text-muted-foreground">{val.label}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Interactive deck list */}
      <div className="space-y-2">
        {sorted.map((deck) => {
          const isExpanded = expandedDeck === deck.id;
          const deckCabins = cabins?.filter(c =>
            c.deck?.includes(String(deck.deck_number)) ||
            c.deck?.toLowerCase().includes(deck.deck_name.toLowerCase())
          ) || [];

          return (
            <div key={deck.id} className="offer-card overflow-hidden">
              <button
                onClick={() => setExpandedDeck(isExpanded ? null : deck.id)}
                className="w-full flex items-center gap-4 text-left"
              >
                {/* Deck badge */}
                <div className="bg-primary text-primary-foreground rounded-lg w-14 h-14 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] opacity-70 leading-none">DECK</span>
                  <span className="text-xl font-heading font-black leading-none">{deck.deck_number}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground">{deck.deck_name}</h3>
                  {/* Cabin category chips */}
                  {deck.cabin_categories?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {deck.cabin_categories.map(cat => {
                        const colors = categoryColors[cat] || categoryColors["Interior"];
                        return (
                          <span key={cat} className={`${colors.bg} ${colors.text} text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.border}`}>
                            {colors.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  {/* Features as visual horizontal layout */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Venues & Features</p>
                    <div className="flex flex-wrap gap-2">
                      {(deck.features || []).map((feat) => {
                        const Icon = getFeatureIcon(feat);
                        return (
                          <div key={feat} className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-medium text-foreground">{feat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Deck cabin layout visualization */}
                  {deck.cabin_categories?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Cabin Layout</p>
                      <div className="relative h-12 rounded-lg overflow-hidden border border-border flex">
                        {deck.cabin_categories.map((cat, i) => {
                          const colors = categoryColors[cat] || categoryColors["Interior"];
                          return (
                            <div
                              key={cat}
                              className={`flex-1 ${colors.bg} flex items-center justify-center ${i > 0 ? "border-l border-white/50" : ""}`}
                            >
                              <div className="text-center">
                                <Bed className={`w-3.5 h-3.5 mx-auto ${colors.text}`} />
                                <span className={`text-[9px] font-semibold ${colors.text}`}>{colors.label}</span>
                              </div>
                            </div>
                          );
                        })}

                        {/* Port/Starboard labels */}
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-foreground/40 font-bold tracking-widest rotate-[-90deg] origin-center">PORT</div>
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-foreground/40 font-bold tracking-widest rotate-90 origin-center">STBD</div>
                      </div>
                    </div>
                  )}

                  {/* Cabins on this deck */}
                  {deckCabins.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Staterooms on This Deck</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {deckCabins.map(cabin => {
                          const colors = categoryColors[cabin.category] || categoryColors["Interior"];
                          return (
                            <div key={cabin.id} className={`flex items-center gap-3 p-2 rounded-lg border ${colors.border} ${colors.bg} bg-opacity-30`}>
                              <Bed className={`w-4 h-4 ${colors.text} shrink-0`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">{cabin.name}</p>
                                <p className="text-[10px] text-muted-foreground">{cabin.size_sqft} sq ft</p>
                              </div>
                              <span className="text-sm font-heading font-bold text-primary">${Math.round(cabin.base_price_usd)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
