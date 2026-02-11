import { TrendingUp } from "lucide-react";

const popularLinks = [
  "Last Minute Cruises", "Caribbean Cruises", "Royal Caribbean Deals",
  "World Cruises", "Holiday Cruises", "Mediterranean Cruises",
  "River Cruises", "Expedition Cruises"
];

const PopularCruises = () => (
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
          <a
            key={link}
            href="#"
            className="bg-background border border-border rounded-sm px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PopularCruises;
