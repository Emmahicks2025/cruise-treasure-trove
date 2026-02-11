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
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title mb-8">
          <span className="relative">
            Daily Cruise Deals
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-full" />
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((deal) => {
            const discounted = Math.round(deal.base_price_usd * (1 - deal.discount_percent / 100));
            return (
              <Link to={`/cruise/${deal.slug}`} key={deal.id} className="deal-card cursor-pointer group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={deal.image_url || "/images/deals/caribbean.jpg"}
                    alt={`${deal.destinations?.name} Cruise`}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 glass px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-semibold text-foreground">{deal.cruise_lines?.name}</span>
                  </div>
                  {deal.discount_percent > 0 && (
                    <div className="absolute top-2 right-2 bg-red-sale text-primary-foreground rounded-lg px-2 py-1">
                      <span className="text-[10px] font-bold">{deal.discount_percent}% OFF</span>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-semibold text-foreground">
                    {deal.duration_days} Days · {deal.destinations?.name}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1.5">
                    from <span className="text-xl font-heading font-black text-primary">${discounted}</span>
                  </p>
                  <span className="btn-book mt-3 text-xs px-4 py-2 w-full inline-block">VIEW DEAL</span>
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
