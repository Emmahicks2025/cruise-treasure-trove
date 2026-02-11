import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "@/lib/cruiseApi";

const destImages: Record<string, string> = {
  "bahamas": "/images/destinations/bahamas.jpg",
  "alaska-inside-passage": "/images/destinations/alaska.jpg",
  "mediterranean-western": "/images/destinations/mediterranean.jpg",
  "northern-europe": "/images/destinations/north-europe.jpg",
  "panama-canal": "/images/destinations/panama-canal.jpg",
  "rhine-river": "/images/destinations/river-cruises.jpg",
  "danube-river": "/images/destinations/river-cruises.jpg",
  "caribbean-eastern": "/images/destinations/bahamas.jpg",
  "caribbean-western": "/images/destinations/bahamas.jpg",
  "hawaii": "/images/destinations/land-tours.jpg",
};

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const { data: destinations } = useQuery({ queryKey: ["destinations"], queryFn: fetchDestinations });

  const featured = destinations?.slice(0, 7) || [];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-heading font-bold text-primary text-center mb-6">
          Featured Destinations
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {featured.map((dest) => (
            <div
              key={dest.id}
              onClick={() => navigate(`/cruises?destination=${dest.id}`)}
              className="deal-card cursor-pointer text-center"
            >
              <img
                src={destImages[dest.slug] || "/images/destinations/mediterranean.jpg"}
                alt={dest.name}
                className="w-full h-28 object-cover"
              />
              <div className="p-2">
                <h4 className="font-bold text-sm text-foreground">{dest.name}</h4>
                <p className="text-xs text-primary font-semibold">{dest.region}</p>
                <button className="btn-book mt-1.5 text-[10px] px-3 py-1 w-full">VIEW CRUISES</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
