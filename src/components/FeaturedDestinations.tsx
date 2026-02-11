const destinations = [
  { image: "/images/destinations/bahamas.jpg", name: "Bahamas", price: "from $237" },
  { image: "/images/destinations/alaska.jpg", name: "Alaska", price: "from $616" },
  { image: "/images/destinations/mediterranean.jpg", name: "Mediterranean", price: "Call" },
  { image: "/images/destinations/north-europe.jpg", name: "North Europe", price: "from $526" },
  { image: "/images/destinations/panama-canal.jpg", name: "Panama Canal", price: "from $1,008" },
  { image: "/images/destinations/river-cruises.jpg", name: "River Cruises", price: "from $3,544" },
  { image: "/images/destinations/land-tours.jpg", name: "Land Tours", price: "from $2,609" },
];

const FeaturedDestinations = () => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-xl font-heading font-bold text-primary text-center mb-6">
        Featured Destinations
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {destinations.map((dest) => (
          <div key={dest.name} className="deal-card cursor-pointer text-center">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-28 object-cover"
            />
            <div className="p-2">
              <h4 className="font-bold text-sm text-foreground">{dest.name}</h4>
              <p className="text-xs text-primary font-semibold">{dest.price}</p>
              <button className="btn-book mt-1.5 text-[10px] px-3 py-1 w-full">BOOK</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedDestinations;
