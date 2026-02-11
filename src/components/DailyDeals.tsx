const deals = [
  { image: "/images/deals/caribbean.jpg", cruiseLine: "Princess Cruises", duration: "7 Days", destination: "Caribbean", price: "$473" },
  { image: "/images/deals/mexico.jpg", cruiseLine: "Carnival Cruise Line", duration: "7 Days", destination: "Mexico", price: "$474" },
  { image: "/images/deals/bahamas.jpg", cruiseLine: "Royal Caribbean", duration: "5 Days", destination: "Bahamas", price: "$474" },
  { image: "/images/deals/alaska.jpg", cruiseLine: "Celebrity Cruises", duration: "7 Days", destination: "Alaska", price: "$616" },
  { image: "/images/deals/danube.jpg", cruiseLine: "Riviera Travel", duration: "7 Days", destination: "Danube River", price: "$2,304" },
  { image: "/images/deals/tahiti.jpg", cruiseLine: "Regent Seven Seas", duration: "10 Days", destination: "Tahiti", price: "$7,998" },
];

const DailyDeals = () => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="section-title mb-6">
        <span className="border-b-2 border-accent pb-1">Daily Cruise Deals</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {deals.map((deal) => (
          <div key={deal.destination} className="deal-card cursor-pointer">
            <div className="relative">
              <img
                src={deal.image}
                alt={`${deal.destination} Cruise`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-1 left-1 bg-background/90 rounded-sm px-1.5 py-0.5">
                <span className="text-[10px] font-semibold text-foreground">{deal.cruiseLine}</span>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-xs font-bold text-foreground">
                {deal.duration} &nbsp; {deal.destination}
              </p>
              <p className="text-sm font-bold text-foreground mt-1">
                from <span className="text-lg font-heading font-black text-primary">{deal.price}</span>
              </p>
              <button className="btn-book mt-2 text-xs px-4 py-1.5 w-full">BOOK</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DailyDeals;
