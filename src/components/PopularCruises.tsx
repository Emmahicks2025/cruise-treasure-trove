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
    <section className="py-6 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-heading font-bold text-primary uppercase text-sm tracking-wider">
            Popular Cruises
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(`/cruises${link.search ? `?search=${encodeURIComponent(link.search)}` : ""}`)}
              className="bg-background border border-border rounded-sm px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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
