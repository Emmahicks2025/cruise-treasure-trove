import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCruises, fetchDestinations, fetchCruiseLines } from "@/lib/cruiseApi";
import { Search, Star, Ship, MapPin, Calendar, Filter, X } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const CruiseSearch = () => {
  const [searchParams] = useSearchParams();
  const [destinationId, setDestinationId] = useState(searchParams.get("destination") || "");
  const [cruiseLineId, setCruiseLineId] = useState(searchParams.get("cruiseLine") || "");
  const [duration, setDuration] = useState(searchParams.get("duration") || "");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(
    !!(searchParams.get("destination") || searchParams.get("cruiseLine") || searchParams.get("duration"))
  );

  // Sync URL params on navigation
  useEffect(() => {
    setDestinationId(searchParams.get("destination") || "");
    setCruiseLineId(searchParams.get("cruiseLine") || "");
    setDuration(searchParams.get("duration") || "");
    setSearchTerm(searchParams.get("search") || "");
    if (searchParams.get("destination") || searchParams.get("cruiseLine") || searchParams.get("duration")) {
      setShowFilters(true);
    }
  }, [searchParams]);

  const { data: destinations } = useQuery({ queryKey: ["destinations"], queryFn: fetchDestinations });
  const { data: cruiseLines } = useQuery({ queryKey: ["cruiseLines"], queryFn: fetchCruiseLines });
  const { data: cruises, isLoading } = useQuery({
    queryKey: ["cruises", destinationId, cruiseLineId, duration, searchTerm],
    queryFn: () => fetchCruises({ destination: destinationId || undefined, cruiseLine: cruiseLineId || undefined, duration: duration || undefined, search: searchTerm || undefined }),
  });

  const discountedPrice = (price: number, discount: number) => price * (1 - discount / 100);

  const activeFilterCount = [destinationId, cruiseLineId, duration].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <MainNav />

      <div className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-heading font-bold text-primary-foreground mb-4">Search Cruises</h1>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cruises by name, ship, destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm text-sm bg-background text-foreground"
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-search px-4 py-2 rounded-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-red-sale text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{activeFilterCount}</span>
              )}
            </button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 animate-fade-in">
              <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)} className="px-3 py-2 rounded-sm text-sm bg-background text-foreground">
                <option value="">All Destinations</option>
                {destinations?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <select value={cruiseLineId} onChange={(e) => setCruiseLineId(e.target.value)} className="px-3 py-2 rounded-sm text-sm bg-background text-foreground">
                <option value="">All Cruise Lines</option>
                {cruiseLines?.map((cl) => <option key={cl.id} value={cl.id}>{cl.name}</option>)}
              </select>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="px-3 py-2 rounded-sm text-sm bg-background text-foreground">
                <option value="">All Lengths</option>
                <option value="1-5">1-5 Days</option>
                <option value="6-9">6-9 Days</option>
                <option value="10+">10+ Days</option>
              </select>
            </div>
          )}
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setDestinationId(""); setCruiseLineId(""); setDuration(""); setSearchTerm(""); }}
              className="text-primary-foreground text-xs mt-2 flex items-center gap-1 hover:opacity-80"
            >
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-4">
          {isLoading ? "Loading..." : `${cruises?.length || 0} cruises found`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cruises?.map((cruise) => (
            <Link to={`/cruise/${cruise.slug}`} key={cruise.id} className="deal-card group">
              <div className="relative overflow-hidden">
                <img src={cruise.image_url || "/images/deals/caribbean.jpg"} alt={cruise.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                {cruise.discount_percent > 0 && (
                  <span className="absolute top-2 right-2 bg-red-sale text-primary-foreground text-xs font-bold px-2 py-1 rounded-sm">
                    {cruise.discount_percent}% OFF
                  </span>
                )}
                {cruise.is_featured && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase">Featured</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold text-ocean uppercase tracking-wider mb-1">{cruise.cruise_lines?.name}</p>
                <h3 className="font-heading font-bold text-foreground text-sm mb-2 line-clamp-2">{cruise.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Ship className="w-3 h-3" />{cruise.ship_name}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{cruise.duration_days} Days</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{cruise.departure_port} → {cruise.destinations?.name}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-xs font-semibold">{cruise.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({cruise.review_count} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">from </span>
                    {cruise.discount_percent > 0 && (
                      <span className="text-xs text-muted-foreground line-through mr-1">${cruise.base_price_usd}</span>
                    )}
                    <span className="text-xl font-heading font-black text-primary">
                      ${Math.round(discountedPrice(cruise.base_price_usd, cruise.discount_percent))}
                    </span>
                    <span className="text-xs text-muted-foreground">/pp</span>
                  </div>
                  <span className="btn-book text-xs px-4 py-1.5">View Deal</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!isLoading && cruises?.length === 0 && (
          <div className="text-center py-16">
            <Ship className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">No cruises found</h2>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CruiseSearch;
