import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const popularLinks = [
  { label: "Last Minute Cruises", search: "" },
  { label: "Caribbean Cruises", search: "Caribbean" },
  { label: "Royal Caribbean Deals", search: "Royal Caribbean" },
  { label: "World Cruises", search: "World" },
  { label: "Holiday Cruises", search: "Holiday" },
  { label: "Mediterranean Cruises", search: "Mediterranean" },
  { label: "River Cruises", search: "River" },
  { label: "Expedition Cruises", search: "Expedition" },
];

const PopularCruises = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-xl bg-accent/10">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-sm tracking-wide">
            Popular Cruises
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(`/cruises${link.search ? `?search=${encodeURIComponent(link.search)}` : ""}`)}
              className="glass px-5 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCruises;
