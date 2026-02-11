import { useState } from "react";
import { Anchor, Ship, MapPin } from "lucide-react";

const cruiseDeals = [
  { line: "Carnival Cruise Line", trip: "6 Days Bahamas", price: "$344" },
  { line: "MSC Cruises", trip: "7 Days W. Caribbean", price: "$319" },
  { line: "Costa Cruises", trip: "7 Days W. Mediterranean", price: "$449" },
  { line: "Princess Cruises", trip: "7 Days W. Caribbean", price: "$473" },
  { line: "MSC Cruises", trip: "7 Days Europe Coastal", price: "$495" },
  { line: "Celebrity Cruises", trip: "6 Days W. Caribbean", price: "$558" },
  { line: "Royal Caribbean", trip: "6 Days E. Caribbean", price: "$506" },
  { line: "Norwegian Cruise Line", trip: "7 Days Mexico-Pacific", price: "$588" },
  { line: "Royal Caribbean", trip: "7 Days Alaska-N./S.", price: "$507" },
  { line: "Holland America", trip: "7 Days Alaska-Inside", price: "$649" },
  { line: "Princess Cruises", trip: "7 Days Alaska-N./S.", price: "$622" },
  { line: "Celebrity Cruises", trip: "7 Days Bermuda", price: "$873" },
  { line: "Celestyal Cruises", trip: "7 Days Mediterranean-East", price: "$921" },
  { line: "Cunard", trip: "20 Days Panama Canal", price: "$1,424" },
  { line: "Azamara Cruises", trip: "7 Days Greece/Turkey", price: "$1,473" },
  { line: "Oceania Cruises", trip: "7 Days E. Mediterranean", price: "$1,605" },
  { line: "AmaWaterways", trip: "7 Days Rhine River", price: "$2,849" },
  { line: "Seabourn", trip: "7 Days Alaska", price: "$3,260" },
];

const landTours = [
  { line: "CIE Tours", trip: "7 Days Taste of Ireland", price: "$2,195" },
  { line: "Cosmos Tours", trip: "8 Days Southern Sounds", price: "$2,049" },
  { line: "Trafalgar Tours", trip: "8 Days Historic Highlights", price: "$3,127" },
  { line: "Tauck Tours", trip: "8 Days London and Paris", price: "$7,290" },
];

const tabs = ["Featured Cruise Deals", "Featured Land Tours"];

const FeaturedDeals = () => {
  const [activeTab, setActiveTab] = useState(0);
  const data = activeTab === 0 ? cruiseDeals : landTours;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title mb-4">View Featured Deals</h2>
        <div className="flex gap-1 mb-4 justify-center">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 text-sm font-bold rounded-t transition-colors ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {data.slice(0, 18).map((deal, i) => (
            <div key={i} className="offer-card text-center py-4 px-3">
              <div className="text-primary mb-2">
                {activeTab === 0 ? <Ship className="w-6 h-6 mx-auto" /> : <MapPin className="w-6 h-6 mx-auto" />}
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">{deal.line}</p>
              <p className="text-xs font-bold text-foreground mb-2">{deal.trip}</p>
              <p className="text-xl font-heading font-black text-primary">{deal.price}</p>
              <button className="btn-book mt-2 text-[10px] px-4 py-1">BOOK</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
