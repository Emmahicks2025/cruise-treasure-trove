import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCruiseBySlug, fetchCabinTypes } from "@/lib/cruiseApi";
import {
  Star, Ship, MapPin, Calendar, Users, Check, X, Anchor, ArrowLeft,
  Utensils, Music, Dumbbell, Waves, Wifi, Wine, Baby, Heart,
  Camera, ChevronDown, ChevronUp, Bed, Maximize, Layers, Shield,
  Clock, Globe, Navigation, Sun, Coffee, Sparkles, Award, Phone
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const categoryImages: Record<string, string> = {
  interior: "/images/cabins/interior.jpg",
  ocean_view: "/images/cabins/ocean-view.jpg",
  balcony: "/images/cabins/balcony.jpg",
  suite: "/images/cabins/suite.jpg",
  penthouse: "/images/cabins/penthouse.jpg",
};

const categoryLabels: Record<string, string> = {
  interior: "Interior Stateroom",
  ocean_view: "Ocean View Stateroom",
  balcony: "Balcony Stateroom",
  suite: "Suite",
  penthouse: "Penthouse Suite",
};

// Ship amenities data
const shipAmenities = {
  dining: [
    { name: "Main Dining Room", desc: "Elegant multi-course dining with rotating menus, open seating available" },
    { name: "Lido Buffet", desc: "Casual buffet with international cuisine, pizza station, deli, salad bar" },
    { name: "Specialty Restaurant", desc: "Premium steakhouse and seafood restaurant (surcharge applies)" },
    { name: "24-Hour Room Service", desc: "In-cabin dining available around the clock" },
    { name: "Pool Bar & Grill", desc: "Casual poolside burgers, hot dogs, and tropical drinks" },
    { name: "Patisserie & Café", desc: "Fresh pastries, gourmet coffee, and afternoon tea service" },
  ],
  entertainment: [
    { name: "Broadway-Style Theater", desc: "Nightly production shows, comedy acts, and live performances" },
    { name: "Casino", desc: "Full casino with slots, poker, blackjack, and roulette tables" },
    { name: "Nightclub & Lounge", desc: "Live music, DJ sets, and themed dance parties" },
    { name: "Movie Theater", desc: "First-run films and classics shown daily" },
    { name: "Live Music Venues", desc: "Piano bars, jazz clubs, and acoustic sessions throughout the ship" },
    { name: "Trivia & Game Shows", desc: "Daily interactive activities and competitions" },
  ],
  wellness: [
    { name: "Spa & Thermal Suite", desc: "Full-service spa with sauna, steam room, and hydrotherapy pool" },
    { name: "Fitness Center", desc: "State-of-the-art gym with personal trainers and fitness classes" },
    { name: "Jogging Track", desc: "Outdoor track with ocean views for running and walking" },
    { name: "Yoga & Pilates", desc: "Daily classes on the sports deck" },
    { name: "Salon & Barber", desc: "Hair styling, manicures, pedicures, and grooming services" },
  ],
  activities: [
    { name: "Pool Complex", desc: "Multiple pools including adults-only retreat and kids' splash zone" },
    { name: "Sports Court", desc: "Basketball, volleyball, and mini-golf" },
    { name: "Rock Climbing Wall", desc: "Multi-story climbing challenge with ocean views" },
    { name: "Water Slides", desc: "Thrilling waterslides and aqua park" },
    { name: "Art Gallery & Auction", desc: "Curated art exhibitions and auction events" },
    { name: "Library & Card Room", desc: "Quiet spaces for reading and card games" },
    { name: "Kids & Teen Club", desc: "Age-appropriate supervised activities and hangout spaces" },
  ],
  services: [
    { name: "Guest Services", desc: "24-hour assistance desk for any requests" },
    { name: "Shore Excursion Desk", desc: "Book guided tours and activities at each port of call" },
    { name: "Photo Studio", desc: "Professional photographers capture memories throughout your voyage" },
    { name: "Medical Center", desc: "Fully equipped medical facility with doctor and nurse on call" },
    { name: "Laundry Service", desc: "Same-day laundry, dry cleaning, and pressing" },
    { name: "Wi-Fi & Connectivity", desc: "Internet packages available for staying connected at sea" },
  ],
};

// Package add-ons
const packageAddOns = [
  {
    name: "All-Inclusive Beverage Package",
    icon: Wine,
    price: 89,
    unit: "per person/day",
    desc: "Unlimited cocktails, wines by the glass, beer, specialty coffees, bottled water, juices, and sodas throughout the ship",
    includes: ["Premium spirits & cocktails", "Wine by the glass (up to $15)", "Beer & cider", "Specialty coffees & teas", "Bottled water & soft drinks", "Fresh-squeezed juices"],
  },
  {
    name: "Wi-Fi & Connectivity Package",
    icon: Wifi,
    price: 19,
    unit: "per device/day",
    desc: "Stay connected with high-speed internet access throughout your cruise",
    includes: ["Social media access", "Email & messaging", "Web browsing", "Video calling (Premium)", "Streaming (Premium)"],
  },
  {
    name: "Specialty Dining Package",
    icon: Utensils,
    price: 49,
    unit: "per person (3 meals)",
    desc: "Experience the finest cuisine at our specialty restaurants",
    includes: ["3 specialty restaurant visits", "Multi-course tasting menus", "Wine pairing available", "Priority reservations", "Chef's Table experience"],
  },
  {
    name: "Shore Excursion Credit",
    icon: Globe,
    price: 150,
    unit: "per cabin",
    desc: "Credit toward guided shore excursions at ports of call",
    includes: ["$150 shore excursion credit", "Priority booking", "Expert guided tours", "Small group options", "Cultural immersion experiences"],
  },
  {
    name: "Photo Package",
    icon: Camera,
    price: 199,
    unit: "per cabin",
    desc: "Capture all your cruise memories with unlimited professional photos",
    includes: ["Unlimited digital photos", "Embarkation photo", "Formal night portraits", "Port of call photos", "Digital download access"],
  },
  {
    name: "Spa & Wellness Package",
    icon: Heart,
    price: 299,
    unit: "per person",
    desc: "Indulge in relaxation with spa treatments and thermal suite access",
    includes: ["2 spa treatments (50 min each)", "Thermal suite access", "Fitness class pass", "Spa amenity kit", "Priority appointments"],
  },
];

// Deck plan info
const deckInfo = [
  { deck: "Deck 4-5", features: "Interior & Ocean View Staterooms, Medical Center, Guest Services" },
  { deck: "Deck 6-7", features: "Ocean View & Balcony Staterooms, Main Dining Room, Theater (lower)" },
  { deck: "Deck 8-9", features: "Balcony Staterooms, Spa & Fitness Center, Specialty Restaurants" },
  { deck: "Deck 10-11", features: "Suites & Premium Cabins, Pool Complex, Lido Buffet" },
  { deck: "Deck 12-14", features: "Penthouse Suites, Sports Court, Water Slides, Sun Deck" },
  { deck: "Deck 15-16", features: "Observation Lounge, Nightclub, Penthouse & Owner Suites" },
];

const CruiseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "cabins" | "dining" | "entertainment" | "deck" | "packages">("overview");
  const [expandedCabin, setExpandedCabin] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

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
  const departureDate = new Date(cruise.departure_date);
  const returnDate = new Date(cruise.return_date);
  const galleryImages = cruise.gallery_urls?.length > 0
    ? cruise.gallery_urls
    : [cruise.image_url || "/images/deals/caribbean.jpg", "/images/destinations/bahamas.jpg", "/images/destinations/mediterranean.jpg", "/images/destinations/alaska.jpg"];

  const tabs = [
    { key: "overview", label: "Overview", icon: Navigation },
    { key: "cabins", label: "Staterooms & Suites", icon: Bed },
    { key: "dining", label: "Dining", icon: Utensils },
    { key: "entertainment", label: "Entertainment", icon: Music },
    { key: "deck", label: "Deck Plans", icon: Layers },
    { key: "packages", label: "Packages & Add-Ons", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <MainNav />

      {/* Hero with Gallery */}
      <div className="relative h-[320px] md:h-[420px]">
        <img src={galleryImages[galleryIdx]} alt={cruise.name} className="w-full h-full object-cover transition-all duration-500" />
        <div className="slide-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary-foreground text-sm mb-3 hover:opacity-80">
              <ArrowLeft className="w-4 h-4" /> Back to results
            </button>
            <p className="text-ocean-light text-sm font-semibold">{cruise.cruise_lines?.name}</p>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-primary-foreground mb-2">{cruise.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground text-sm">
              <span className="flex items-center gap-1"><Ship className="w-4 h-4" />{cruise.ship_name}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{cruise.duration_days} Nights</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{cruise.departure_port} → {cruise.arrival_port}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{cruise.rating} ({cruise.review_count} reviews)</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />Up to {cruise.max_passengers} guests</span>
            </div>
          </div>
        </div>
        {/* Gallery thumbnails */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {galleryImages.slice(0, 4).map((img, i) => (
            <button key={i} onClick={() => setGalleryIdx(i)} className={`w-14 h-10 rounded-sm overflow-hidden border-2 transition-colors ${i === galleryIdx ? "border-accent" : "border-primary-foreground/30"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Quick facts bar */}
      <div className="bg-primary border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-primary-foreground text-xs">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-bold text-sm">{departureDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
              <p className="opacity-70">Departs</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">{returnDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              <p className="opacity-70">Returns</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">{cruise.duration_days} Nights</p>
              <p className="opacity-70">Duration</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">{cruise.destinations?.name}</p>
              <p className="opacity-70">Destination</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cruise.discount_percent > 0 && (
              <span className="bg-red-sale text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm">{cruise.discount_percent}% OFF</span>
            )}
            <div className="text-right">
              <p className="opacity-70 text-[10px]">from</p>
              <p className="text-2xl font-heading font-black">${Math.round(discountedPrice)}<span className="text-xs font-normal opacity-70">/pp</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-secondary border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                {/* Ship info */}
                <section className="offer-card">
                  <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                    <Ship className="w-5 h-5" /> About {cruise.ship_name}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-muted rounded-sm p-3 text-center">
                      <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-heading font-bold text-foreground">{cruise.max_passengers?.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Guest Capacity</p>
                    </div>
                    <div className="bg-muted rounded-sm p-3 text-center">
                      <Layers className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-heading font-bold text-foreground">16</p>
                      <p className="text-[10px] text-muted-foreground">Passenger Decks</p>
                    </div>
                    <div className="bg-muted rounded-sm p-3 text-center">
                      <Utensils className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-heading font-bold text-foreground">12+</p>
                      <p className="text-[10px] text-muted-foreground">Dining Venues</p>
                    </div>
                    <div className="bg-muted rounded-sm p-3 text-center">
                      <Waves className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-heading font-bold text-foreground">5</p>
                      <p className="text-[10px] text-muted-foreground">Pool Areas</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Step aboard {cruise.ship_name} by {cruise.cruise_lines?.name} for an unforgettable {cruise.duration_days}-night voyage to {cruise.destinations?.name}. 
                    This magnificent vessel offers world-class amenities, award-winning dining, Broadway-caliber entertainment, and luxurious accommodations 
                    ranging from cozy interior staterooms to opulent penthouse suites with private butler service.
                  </p>
                </section>

                {/* Itinerary */}
                {cruise.itinerary && (cruise.itinerary as any[]).length > 0 && (
                  <section>
                    <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                      <Navigation className="w-5 h-5" /> Day-by-Day Itinerary
                    </h2>
                    <div className="relative">
                      <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-primary/20" />
                      <div className="space-y-3">
                        {(cruise.itinerary as Array<{day: number; port: string; description: string}>).map((stop, i) => (
                          <div key={stop.day} className="flex items-start gap-4 relative">
                            <div className="bg-primary text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-md">
                              {stop.day}
                            </div>
                            <div className="flex-1 offer-card py-3 px-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-bold text-foreground flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                    {stop.port}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{stop.description}</p>
                                </div>
                                <div className="text-right text-xs text-muted-foreground">
                                  <p>{i === 0 ? "Embark" : i === (cruise.itinerary as any[]).length - 1 ? "Disembark" : stop.port.includes("Sea") ? "At Sea" : "Port Day"}</p>
                                  <p className="text-[10px]">{i === 0 || i === (cruise.itinerary as any[]).length - 1 ? "" : "8:00 AM - 5:00 PM"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* Highlights */}
                {cruise.highlights?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" /> Cruise Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cruise.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-3 p-3 bg-muted rounded-sm">
                          <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{h}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Exclusive experience included with this sailing</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Included / Not included */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cruise.included?.length > 0 && (
                    <section className="offer-card">
                      <h3 className="font-heading font-bold text-green-deal mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5" /> What's Included
                      </h3>
                      <ul className="space-y-2">
                        {cruise.included.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-deal shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {cruise.not_included?.length > 0 && (
                    <section className="offer-card">
                      <h3 className="font-heading font-bold text-red-sale mb-3 flex items-center gap-2">
                        <X className="w-5 h-5" /> Not Included
                      </h3>
                      <ul className="space-y-2">
                        {cruise.not_included.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <X className="w-4 h-4 text-red-sale shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                        <li className="text-xs text-muted-foreground italic pt-2">
                          Many of these can be added as packages — see the Packages & Add-Ons tab
                        </li>
                      </ul>
                    </section>
                  )}
                </div>
              </>
            )}

            {/* CABINS TAB */}
            {activeTab === "cabins" && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                  <Bed className="w-5 h-5" /> Staterooms & Suites
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose from {cabins?.length || 0} carefully designed cabin categories. Every stateroom includes flat-screen TV, private bathroom, 
                  climate control, in-room safe, daily housekeeping, and 24-hour room service.
                </p>
                <div className="space-y-5">
                  {cabins?.map((cabin) => {
                    const isExpanded = expandedCabin === cabin.id;
                    const savingsPercent = cabin.original_price_usd ? Math.round((1 - cabin.base_price_usd / cabin.original_price_usd) * 100) : 0;
                    return (
                      <div key={cabin.id} className="offer-card overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative w-full md:w-56 h-40 md:h-auto shrink-0">
                            <img
                              src={cabin.image_url || categoryImages[cabin.category] || "/images/destinations/bahamas.jpg"}
                              alt={cabin.name}
                              className="w-full h-full object-cover rounded-sm"
                            />
                            <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">
                              {categoryLabels[cabin.category] || cabin.category}
                            </span>
                            {savingsPercent > 0 && (
                              <span className="absolute top-2 right-2 bg-red-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm">
                                Save {savingsPercent}%
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h3 className="font-heading font-bold text-lg text-foreground">{cabin.name}</h3>
                                <p className="text-xs text-primary font-semibold">{categoryLabels[cabin.category] || cabin.category}</p>
                              </div>
                              <div className="text-right">
                                {cabin.original_price_usd && cabin.original_price_usd > cabin.base_price_usd && (
                                  <p className="text-xs text-muted-foreground line-through">${Math.round(cabin.original_price_usd)}</p>
                                )}
                                <p className="text-2xl font-heading font-black text-primary">${Math.round(cabin.base_price_usd)}</p>
                                <p className="text-[10px] text-muted-foreground">per person</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{cabin.description}</p>

                            {/* Key specs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                <Maximize className="w-3.5 h-3.5 text-primary" />
                                <span>{cabin.size_sqft} sq ft</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                <Bed className="w-3.5 h-3.5 text-primary" />
                                <span>{cabin.beds}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                <Users className="w-3.5 h-3.5 text-primary" />
                                <span>Up to {cabin.max_occupancy} guests</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                <Layers className="w-3.5 h-3.5 text-primary" />
                                <span>{cabin.deck}</span>
                              </div>
                            </div>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {cabin.amenities?.slice(0, isExpanded ? undefined : 5).map((a) => (
                                <span key={a} className="bg-muted text-xs px-2 py-0.5 rounded-sm text-foreground">{a}</span>
                              ))}
                              {!isExpanded && cabin.amenities && cabin.amenities.length > 5 && (
                                <span className="text-xs text-primary font-semibold">+{cabin.amenities.length - 5} more</span>
                              )}
                            </div>

                            {/* Expandable details */}
                            <button
                              onClick={() => setExpandedCabin(isExpanded ? null : cabin.id)}
                              className="text-xs text-primary font-semibold flex items-center gap-1 mb-3 hover:underline"
                            >
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {isExpanded ? "Less details" : "Full cabin details"}
                            </button>

                            {isExpanded && (
                              <div className="bg-muted rounded-sm p-4 mb-3 space-y-3 text-sm animate-fade-in">
                                <div>
                                  <h4 className="font-semibold text-foreground mb-1">Cabin Features</h4>
                                  <div className="grid grid-cols-2 gap-1">
                                    {cabin.amenities?.map(a => (
                                      <p key={a} className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Check className="w-3 h-3 text-green-deal" /> {a}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground mb-1">Standard In-Room Amenities</h4>
                                  <div className="grid grid-cols-2 gap-1">
                                    {["Private bathroom with shower", "Plush bath towels & robes", "Hair dryer", "Interactive TV system", "Climate control", "In-room safe", "Mini-refrigerator", "Daily housekeeping", "Nightly turndown service", "24-hour room service"].map(a => (
                                      <p key={a} className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Check className="w-3 h-3 text-green-deal" /> {a}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground mb-1">Pricing Details</h4>
                                  <div className="space-y-1 text-xs text-muted-foreground">
                                    <p>Base fare: ${Math.round(cabin.base_price_usd)} per person (double occupancy)</p>
                                    {cabin.original_price_usd && <p>Original price: ${Math.round(cabin.original_price_usd)} per person</p>}
                                    <p>Single occupancy: ${Math.round(cabin.base_price_usd * 1.5)} (50% supplement)</p>
                                    <p>3rd/4th guest: ${Math.round(cabin.base_price_usd * 0.6)} per person</p>
                                    <p>Taxes & port fees: Included</p>
                                    <p>Gratuities: Not included (approx. $16/person/day)</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground mb-1">Availability</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {cabin.available_count} cabins remaining at this price — 
                                    <span className={cabin.available_count <= 5 ? "text-red-sale font-bold" : "text-green-deal font-bold"}>
                                      {cabin.available_count <= 5 ? " Limited availability!" : " Good availability"}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                <span className={cabin.available_count <= 5 ? "text-red-sale font-semibold" : ""}>
                                  {cabin.available_count} cabins left
                                </span>
                              </p>
                              <button
                                onClick={() => navigate(`/book/${cruise.slug}?cabin=${cabin.id}`)}
                                className="btn-book text-sm px-8 py-2.5"
                              >
                                SELECT & BOOK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* DINING TAB */}
            {activeTab === "dining" && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                  <Utensils className="w-5 h-5" /> Dining Onboard {cruise.ship_name}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  From elegant multi-course dinners to casual poolside bites, {cruise.ship_name} serves up a world of flavors. 
                  Main dining and buffet are included in your cruise fare, with specialty restaurants available at an additional charge.
                </p>
                <div className="space-y-4">
                  {shipAmenities.dining.map((venue) => (
                    <div key={venue.name} className="offer-card flex items-start gap-4">
                      <div className="bg-primary/10 rounded-sm p-3">
                        <Utensils className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{venue.name}</h3>
                        <p className="text-sm text-muted-foreground">{venue.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="offer-card mt-6">
                  <h3 className="font-heading font-bold text-primary mb-3">Dining Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted rounded-sm p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Coffee className="w-4 h-4 text-primary" />
                        <p className="font-semibold text-foreground">Breakfast</p>
                      </div>
                      <p className="text-xs text-muted-foreground">7:00 AM - 9:30 AM (Main Dining)</p>
                      <p className="text-xs text-muted-foreground">6:30 AM - 11:00 AM (Buffet)</p>
                    </div>
                    <div className="bg-muted rounded-sm p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="w-4 h-4 text-primary" />
                        <p className="font-semibold text-foreground">Lunch</p>
                      </div>
                      <p className="text-xs text-muted-foreground">12:00 PM - 2:00 PM (Main Dining)</p>
                      <p className="text-xs text-muted-foreground">11:30 AM - 3:00 PM (Buffet & Grill)</p>
                    </div>
                    <div className="bg-muted rounded-sm p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-primary" />
                        <p className="font-semibold text-foreground">Dinner</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Early: 5:30 PM | Main: 8:00 PM</p>
                      <p className="text-xs text-muted-foreground">Specialty: 6:00 PM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ENTERTAINMENT TAB */}
            {activeTab === "entertainment" && (
              <section className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                    <Music className="w-5 h-5" /> Entertainment
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">World-class shows, live music, and exciting nightlife every evening.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shipAmenities.entertainment.map((item) => (
                      <div key={item.name} className="offer-card flex items-start gap-3">
                        <Music className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" /> Spa & Wellness
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shipAmenities.wellness.map((item) => (
                      <div key={item.name} className="offer-card flex items-start gap-3">
                        <Dumbbell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-3 flex items-center gap-2">
                    <Waves className="w-5 h-5" /> Activities & Recreation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shipAmenities.activities.map((item) => (
                      <div key={item.name} className="offer-card flex items-start gap-3">
                        <Sun className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Guest Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shipAmenities.services.map((item) => (
                      <div key={item.name} className="offer-card flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* DECK TAB */}
            {activeTab === "deck" && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" /> Deck Plans — {cruise.ship_name}
                </h2>
                <div className="space-y-3">
                  {deckInfo.map((d) => (
                    <div key={d.deck} className="offer-card flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-sm w-16 h-12 flex items-center justify-center font-heading font-bold text-sm shrink-0">
                        {d.deck.replace("Deck ", "")}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{d.deck}</h3>
                        <p className="text-xs text-muted-foreground">{d.features}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="offer-card mt-6">
                  <h3 className="font-heading font-bold text-primary mb-3">Cabin Categories by Deck</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 text-muted-foreground font-semibold text-xs">Category</th>
                          <th className="text-left py-2 text-muted-foreground font-semibold text-xs">Deck Location</th>
                          <th className="text-left py-2 text-muted-foreground font-semibold text-xs">Size</th>
                          <th className="text-right py-2 text-muted-foreground font-semibold text-xs">From Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cabins?.map(cabin => (
                          <tr key={cabin.id} className="border-b border-border/50">
                            <td className="py-2 font-semibold text-foreground">{cabin.name}</td>
                            <td className="py-2 text-muted-foreground">{cabin.deck}</td>
                            <td className="py-2 text-muted-foreground">{cabin.size_sqft} sq ft</td>
                            <td className="py-2 text-right font-heading font-bold text-primary">${Math.round(cabin.base_price_usd)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* PACKAGES TAB */}
            {activeTab === "packages" && (
              <section>
                <h2 className="text-xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Packages & Add-Ons
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Enhance your cruise experience with these popular add-on packages. Save up to 30% when pre-purchased vs. buying onboard.
                </p>
                <div className="space-y-4">
                  {packageAddOns.map((pkg) => {
                    const Icon = pkg.icon;
                    return (
                      <div key={pkg.name} className="offer-card">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 rounded-sm p-3 shrink-0">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-heading font-bold text-foreground">{pkg.name}</h3>
                                <p className="text-xs text-primary font-semibold">{pkg.unit}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-heading font-black text-primary">${pkg.price}</p>
                                <p className="text-[10px] text-muted-foreground">{pkg.unit}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{pkg.desc}</p>
                            <div className="grid grid-cols-2 gap-1">
                              {pkg.includes.map(item => (
                                <p key={item} className="text-xs text-foreground flex items-center gap-1">
                                  <Check className="w-3 h-3 text-green-deal shrink-0" /> {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="offer-card mt-6 bg-muted">
                  <h3 className="font-heading font-bold text-primary mb-2">Bundle & Save</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Combine 3 or more packages and save an additional 15% off the total add-on price. 
                    Packages can be added during the booking process or contact us at 888-333-3116 for custom bundle pricing.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="tel:888-333-3116" className="btn-book text-sm px-6 py-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call for Bundle Pricing
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-14 space-y-4">
              <div className="offer-card">
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
                <div className="text-xs text-muted-foreground mb-4 space-y-1.5">
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {departureDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {cruise.duration_days} Nights / {cruise.duration_days + 1} Days</p>
                  <p className="flex items-center gap-1.5"><Ship className="w-3.5 h-3.5" /> {cruise.ship_name}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {cruise.departure_port} → {cruise.arrival_port}</p>
                  <p className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {cruise.destinations?.name} — {cruise.destinations?.region}</p>
                </div>
                <button
                  onClick={() => setActiveTab("cabins")}
                  className="btn-book w-full py-3 text-sm font-bold mb-2"
                >
                  SELECT STATEROOM
                </button>
                <a href="tel:888-333-3116" className="block text-center border border-primary text-primary py-2 rounded-sm text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                  Call 888-333-3116
                </a>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Low Price Guarantee • No Booking Fees
                </p>
              </div>

              {/* Quick cabin preview */}
              {cabins && cabins.length > 0 && (
                <div className="offer-card">
                  <h4 className="font-heading font-bold text-foreground text-sm mb-3">Starting Prices</h4>
                  <div className="space-y-2">
                    {cabins.map(cabin => (
                      <button
                        key={cabin.id}
                        onClick={() => { setActiveTab("cabins"); setExpandedCabin(cabin.id); }}
                        className="w-full flex items-center justify-between text-left p-2 rounded-sm hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-foreground">{cabin.name}</p>
                          <p className="text-[10px] text-muted-foreground">{cabin.size_sqft} sq ft • {cabin.deck}</p>
                        </div>
                        <p className="font-heading font-bold text-primary">${Math.round(cabin.base_price_usd)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="offer-card text-center">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-[10px] font-semibold text-foreground">Price Match Guarantee</p>
                  </div>
                  <div>
                    <Award className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-[10px] font-semibold text-foreground">Top Rated Agency</p>
                  </div>
                  <div>
                    <Phone className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-[10px] font-semibold text-foreground">24/7 Support</p>
                  </div>
                  <div>
                    <Check className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-[10px] font-semibold text-foreground">No Booking Fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CruiseDetail;
