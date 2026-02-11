import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCruises } from "@/lib/cruiseApi";

const DailyDeals = () => {
  const { data: cruises } = useQuery({
    queryKey: ["dailyDeals"],
    queryFn: () => fetchCruises(),
  });

  const deals = cruises?.slice(0, 6) || [];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title mb-6">
          <span className="border-b-2 border-accent pb-1">Daily Cruise Deals</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((deal) => {
            const discounted = Math.round(deal.base_price_usd * (1 - deal.discount_percent / 100));
            return (
              <Link to={`/cruise/${deal.slug}`} key={deal.id} className="deal-card cursor-pointer">
                <div className="relative">
                  <img
                    src={deal.image_url || "/images/deals/caribbean.jpg"}
                    alt={`${deal.destinations?.name} Cruise`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-background/90 rounded-sm px-1.5 py-0.5">
                    <span className="text-[10px] font-semibold text-foreground">{deal.cruise_lines?.name}</span>
                  </div>
                  {deal.discount_percent > 0 && (
                    <div className="absolute top-1 right-1 bg-red-sale text-primary-foreground rounded-sm px-1.5 py-0.5">
                      <span className="text-[10px] font-bold">{deal.discount_percent}% OFF</span>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-bold text-foreground">
                    {deal.duration_days} Days &nbsp; {deal.destinations?.name}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    from <span className="text-lg font-heading font-black text-primary">${discounted}</span>
                  </p>
                  <span className="btn-book mt-2 text-xs px-4 py-1.5 w-full inline-block">VIEW DEAL</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;
