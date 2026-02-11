import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCruiseBySlug, fetchCabinTypes } from "@/lib/cruiseApi";
import { Star, Ship, MapPin, Calendar, Users, Check, X, Anchor, ArrowLeft } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const categoryImages: Record<string, string> = {
  interior: "/images/destinations/river-cruises.jpg",
  ocean_view: "/images/destinations/north-europe.jpg",
  balcony: "/images/destinations/mediterranean.jpg",
  suite: "/images/destinations/bahamas.jpg",
  penthouse: "/images/deals/tahiti.jpg",
};

const CruiseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: cruise, isLoading } = useQuery({
    queryKey: ["cruise", slug],
    queryFn: () => fetchCruiseBySlug(slug!),
    enabled: !!slug,
  });

  const { data: cabins } = useQuery({
    queryKey: ["cabins", cruise?.id],
    queryFn: () => fetchCabinTypes(cruise!.id),
    enabled: !!cruise?.id,
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Anchor className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!cruise) return <div className="min-h-screen flex items-center justify-center"><p>Cruise not found</p></div>;

  const discountedPrice = cruise.base_price_usd * (1 - cruise.discount_percent / 100);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <MainNav />

      {/* Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src={cruise.image_url || "/images/deals/caribbean.jpg"} alt={cruise.name} className="w-full h-full object-cover" />
        <div className="slide-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary-foreground text-sm mb-3 hover:opacity-80">
              <ArrowLeft className="w-4 h-4" /> Back to results
            </button>
            <p className="text-ocean-light text-sm font-semibold">{cruise.cruise_lines?.name}</p>
            <h1 className="text-3xl font-heading font-black text-primary-foreground mb-2">{cruise.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground text-sm">
              <span className="flex items-center gap-1"><Ship className="w-4 h-4" />{cruise.ship_name}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{cruise.duration_days} Days</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{cruise.departure_port}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{cruise.rating} ({cruise.review_count} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Itinerary */}
            {cruise.itinerary && cruise.itinerary.length > 0 && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-4">Itinerary</h2>
                <div className="space-y-2">
                  {(cruise.itinerary as Array<{day: number; port: string; description: string}>).map((stop) => (
                    <div key={stop.day} className="flex items-start gap-3 p-3 bg-muted rounded-sm">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0">
                        {stop.day}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{stop.port}</p>
                        <p className="text-xs text-muted-foreground">{stop.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Highlights */}
            {cruise.highlights?.length > 0 && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-4">Highlights</h2>
                <div className="grid grid-cols-2 gap-2">
                  {cruise.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-gold shrink-0" />{h}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Included / Not included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cruise.included?.length > 0 && (
                <section>
                  <h3 className="font-heading font-bold text-green-deal mb-3">What's Included</h3>
                  <ul className="space-y-1.5">
                    {cruise.included.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-deal shrink-0" />{i}</li>
                    ))}
                  </ul>
                </section>
              )}
              {cruise.not_included?.length > 0 && (
                <section>
                  <h3 className="font-heading font-bold text-red-sale mb-3">Not Included</h3>
                  <ul className="space-y-1.5">
                    {cruise.not_included.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><X className="w-4 h-4 text-red-sale shrink-0" />{i}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Cabin Types */}
            <section>
              <h2 className="text-xl font-heading font-bold text-primary mb-4">Select Your Cabin</h2>
              <div className="space-y-4">
                {cabins?.map((cabin) => (
                  <div key={cabin.id} className="offer-card flex flex-col md:flex-row gap-4">
                    <img
                      src={cabin.image_url || categoryImages[cabin.category] || "/images/destinations/bahamas.jpg"}
                      alt={cabin.name}
                      className="w-full md:w-48 h-32 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-heading font-bold text-foreground">{cabin.name}</h3>
                          <p className="text-xs text-muted-foreground capitalize">{cabin.category.replace("_", " ")} • {cabin.size_sqft} sq ft • {cabin.deck}</p>
                        </div>
                        <div className="text-right">
                          {cabin.original_price_usd && cabin.original_price_usd > cabin.base_price_usd && (
                            <p className="text-xs text-muted-foreground line-through">${Math.round(cabin.original_price_usd)}</p>
                          )}
                          <p className="text-xl font-heading font-black text-primary">${Math.round(cabin.base_price_usd)}</p>
                          <p className="text-[10px] text-muted-foreground">per person</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{cabin.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cabin.amenities?.slice(0, 5).map((a) => (
                          <span key={a} className="bg-muted text-xs px-2 py-0.5 rounded-sm text-foreground">{a}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />Up to {cabin.max_occupancy} guests • {cabin.beds}
                        </div>
                        <button
                          onClick={() => navigate(`/book/${cruise.slug}?cabin=${cabin.id}`)}
                          className="btn-book text-xs px-6 py-2"
                        >
                          SELECT
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 offer-card">
              <h3 className="font-heading font-bold text-primary text-lg mb-3">Price Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base price</span>
                  <span className="line-through text-muted-foreground">${cruise.base_price_usd}/pp</span>
                </div>
                {cruise.discount_percent > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-red-sale font-semibold">{cruise.discount_percent}% discount</span>
                    <span className="text-red-sale font-semibold">-${Math.round(cruise.base_price_usd * cruise.discount_percent / 100)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold">From</span>
                  <span className="text-2xl font-heading font-black text-primary">${Math.round(discountedPrice)}/pp</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <p>📅 {new Date(cruise.departure_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                <p>🚢 {cruise.ship_name}</p>
                <p>📍 {cruise.departure_port} → {cruise.arrival_port}</p>
              </div>
              <a href="tel:888-333-3116" className="block text-center bg-primary text-primary-foreground py-2 rounded-sm text-sm font-bold mb-2 hover:opacity-90 transition-opacity">
                Call 888-333-3116
              </a>
              <p className="text-[10px] text-muted-foreground text-center">Select a cabin above to book online</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CruiseDetail;
