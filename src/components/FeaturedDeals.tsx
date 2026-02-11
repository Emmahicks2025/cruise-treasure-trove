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
          {activeTab === 0
            ? cruiseDeals.map((deal) => {
                const discounted = Math.round(deal.base_price_usd * (1 - deal.discount_percent / 100));
                return (
                  <Link to={`/cruise/${deal.slug}`} key={deal.id} className="offer-card text-center py-4 px-3 hover:shadow-md transition-shadow">
                    <div className="text-primary mb-2">
                      <Ship className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">{deal.cruise_lines?.name}</p>
                    <p className="text-xs font-bold text-foreground mb-2">{deal.duration_days} Days {deal.destinations?.name}</p>
                    <p className="text-xl font-heading font-black text-primary">${discounted}</p>
                    <span className="btn-book mt-2 text-[10px] px-4 py-1 inline-block">VIEW</span>
                  </Link>
                );
              })
            : landTours.map((deal, i) => (
                <div key={i} className="offer-card text-center py-4 px-3">
                  <div className="text-primary mb-2">
                    <MapPin className="w-6 h-6 mx-auto" />
                  </div>
                  <p className="text-[10px] font-semibold text-muted-foreground mb-1">{deal.line}</p>
                  <p className="text-xs font-bold text-foreground mb-2">{deal.trip}</p>
                  <p className="text-xl font-heading font-black text-primary">{deal.price}</p>
                  <span className="btn-book mt-2 text-[10px] px-4 py-1 inline-block">VIEW</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
