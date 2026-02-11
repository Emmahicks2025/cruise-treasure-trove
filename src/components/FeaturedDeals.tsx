import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCruises } from "@/lib/cruiseApi";
import { Ship, MapPin } from "lucide-react";

const landTours = [
  { line: "CIE Tours", trip: "7 Days Taste of Ireland", price: "$2,195" },
  { line: "Cosmos Tours", trip: "8 Days Southern Sounds", price: "$2,049" },
  { line: "Trafalgar Tours", trip: "8 Days Historic Highlights", price: "$3,127" },
  { line: "Tauck Tours", trip: "8 Days London and Paris", price: "$7,290" },
];

const tabs = ["Featured Cruise Deals", "Featured Land Tours"];

const FeaturedDeals = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: cruises } = useQuery({
    queryKey: ["featuredDeals"],
    queryFn: () => fetchCruises(),
  });

  const cruiseDeals = cruises?.slice(0, 18) || [];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title mb-5">View Featured Deals</h2>
        <div className="flex gap-1 mb-5 justify-center">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {activeTab === 0
            ? cruiseDeals.map((deal) => {
                const discounted = Math.round(deal.base_price_usd * (1 - deal.discount_percent / 100));
                return (
                  <Link to={`/cruise/${deal.slug}`} key={deal.id} className="offer-card text-center py-5 px-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
                      <Ship className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">{deal.cruise_lines?.name}</p>
                    <p className="text-xs font-bold text-foreground mb-2">{deal.duration_days} Days {deal.destinations?.name}</p>
                    <p className="text-xl font-heading font-black text-primary">${discounted}</p>
                    <span className="btn-book mt-3 text-[10px] px-4 py-1.5 inline-block">VIEW</span>
                  </Link>
                );
              })
            : landTours.map((deal, i) => (
                <div key={i} className="offer-card text-center py-5 px-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground mb-1">{deal.line}</p>
                  <p className="text-xs font-bold text-foreground mb-2">{deal.trip}</p>
                  <p className="text-xl font-heading font-black text-primary">{deal.price}</p>
                  <span className="btn-book mt-3 text-[10px] px-4 py-1.5 inline-block">VIEW</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
