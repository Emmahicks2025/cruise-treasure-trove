import { Anchor, Ship, Crown, Star, Gem, Waves } from "lucide-react";

const offers = [
  {
    icon: <Anchor className="w-8 h-8" />,
    name: "Royal Caribbean",
    headline: "60% OFF 2nd Guest + Kids Sail FREE + Up to $1,000 Instant Savings",
    subline: "FREE Gratuities or Up to $1,700 Onboard Credit",
    perks: ["Airfare Savings: Up to $250 per person", "FREE Specialty Dining for 2", "Special Resident Rates", "Military, Police & Firefighter Rates"],
    color: "text-ocean",
  },
  {
    icon: <Star className="w-8 h-8" />,
    name: "Celebrity Cruises",
    headline: "Up to $700 Instant Savings + Up to 75% OFF 2nd Guest + 3rd-5th Guest FREE",
    subline: "All Included: Classic Beverage Package + Basic Wi-Fi",
    perks: ["Exclusive: Up to $1,700 Onboard Credit", "Back to Back Cruises: Save up to $200", "Call in Sale: Save up to $500"],
    color: "text-primary",
  },
  {
    icon: <Crown className="w-8 h-8" />,
    name: "Princess Cruises",
    headline: "Up to $500 Instant Savings + Up to 40% OFF + 3rd & 4th Guest FREE",
    subline: "Early Booking: Up to $2,000 Onboard Credit",
    perks: ["Exclusive: Up to $1,785 Onboard Credit", "Alaska Cruisetours: Up to $400 Savings", "Military: FREE Onboard Spending up to $250"],
    color: "text-primary",
  },
  {
    icon: <Ship className="w-8 h-8" />,
    name: "Holland America",
    headline: "FREE Balcony Upgrades + Save up to 30% + FREE Kids Fares",
    subline: "Have it All: Beverage Package + Specialty Dining + Premium Wi-Fi + Shore Excursion Credit",
    perks: ["Exclusive: Up to $1,700 Additional Savings", "Up to 50% OFF + FREE or Reduced Kids Fares", "Early Booking Bonus"],
    color: "text-primary",
  },
  {
    icon: <Gem className="w-8 h-8" />,
    name: "Norwegian Cruise Line",
    headline: "2nd Guest FREE + Kids Sail FREE + FREE at Sea + BOGO Airfare",
    subline: "FREE Unlimited Open Bar + Specialty Dining + Wi-Fi Package + Shore Excursion Credit",
    perks: ["Exclusive: Up to $1,700 Cash Back", "50% Reduced Deposits", "Reduced Rates for Singles"],
    color: "text-primary",
  },
  {
    icon: <Waves className="w-8 h-8" />,
    name: "Cunard",
    headline: "Up to $600 Onboard Credit",
    subline: "Grills Suites: Drink Package, Hotel & Dining service charges included",
    perks: ["Military: Up to $250 in FREE Onboard Spending", "AMEX Cardholder Benefit"],
    color: "text-primary",
  },
];

const ExclusiveOffers = () => (
  <section className="py-8 bg-muted">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="section-title mb-6">
        <span className="border-b-2 border-accent pb-1">Exclusive Cruise Offers</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.name} className="offer-card">
            <div className="flex items-center gap-3 mb-3">
              <div className={offer.color}>{offer.icon}</div>
              <h3 className="font-heading font-bold text-primary text-lg">{offer.name}</h3>
            </div>
            <p className="font-bold text-sm text-foreground mb-1">{offer.headline}</p>
            <p className="text-sm text-accent font-semibold mb-3">{offer.subline}</p>
            <ul className="space-y-1 mb-4">
              {offer.perks.map((perk) => (
                <li key={perk} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-green-deal font-bold mt-0.5">•</span>
                  {perk}
                </li>
              ))}
            </ul>
            <button className="btn-book w-full text-center">BOOK</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExclusiveOffers;
