import { useState } from "react";
import { Ship, Waves, MapPin, Star, Crown, Gem, Anchor, Sailboat, Globe, Compass, Navigation } from "lucide-react";

const bestCruiseOffers = [
  { name: "MSC Cruises", tag: "Presidents' Day", headline: "Up to 40% OFF + Up to $750 Onboard Credit", subline: "Kids Sail FREE", perks: ["Flash Sale: Cruises from $179", "Epic Europe Sale: Up to $600 OFF", "Exclusive Rates - Must Call to Book"] },
  { name: "Azamara Cruises", headline: "Up to $1,000 Onboard Credit", subline: "Early Booking Bonus: 30% OFF Cruise Fare", perks: ["FREE Gratuities", "Loyalty Guest: Additional 10% OFF", "Back to Back: Up to $400 OBC"] },
  { name: "Oceania Cruises", tag: "Presidents' Day", headline: "Up to 2 Category Upgrade", subline: "Up to 40% OFF + Upgraded Beverage Package", perks: ["Exclusive: Up to $1,700 OBC", "Your World Included™", "Past Guests: 10% Savings"] },
  { name: "Virgin Voyages", headline: "80% OFF 2nd Guest + Up to $350 in FREE Drinks", subline: "Up to $300 Onboard Credit", perks: ["Florida Residents: Up to 15% Savings", "FREE Gratuities", "Unlimited Wi-Fi"] },
  { name: "Seabourn", headline: "Up to 15% Savings + Up to $1,000 Shipboard Credit", subline: "Reduced Deposit", perks: ["Exclusive: Up to $1,700 OBC", "FREE Gratuities", "FREE Specialty Dining"] },
  { name: "Viking Ocean Cruises", headline: "Up to 35% OFF + FREE Airfare + $25 Deposit", subline: "$100 Onboard Credit", perks: ["FREE Shore Excursions", "FREE Wi-Fi", "FREE Beer & Wine"] },
  { name: "Regent Seven Seas", headline: "FREE 2-Category Suite Upgrade", subline: "$500 Shipboard Credit per Suite", perks: ["Exclusive: Up to $1,700 Cash Back", "Kids Sail from $999", "2 For 1 Fares + FREE Gratuities"] },
  { name: "Carnival Cruises", headline: "FREE 2-Category Upgrade", subline: "Great Reduced Rates on select staterooms", perks: ["Exclusive: Up to $1,700 Additional Savings", "Special Military Rates", "Senior Rates"] },
  { name: "Disney Cruise Line", headline: "Exclusive: Up to $2,800 OFF", subline: "Limited Time - Save up to 35%", perks: ["Florida Residents: Save up to 35%", "Special Military Rates", "Castaway Club Rewards"] },
  { name: "Silversea Cruises", headline: "Save up to 40% + Reduced Deposit", subline: "25% Single Supplement", perks: ["Exclusive: Up to $1,700 OBC", "FREE Gratuities", "Complimentary Beverages"] },
  { name: "Windstar Cruises", headline: "Complimentary All-Inclusive Package", subline: "Up to $2,000 Onboard Credit per stateroom", perks: ["Exclusive: Up to $1,700 OBC", "Reduced Single Supplements", "Tahiti Package"] },
  { name: "Crystal Cruises", headline: "Save up to $5,000 per Suite", subline: "Up to $500 As You Wish Credit", perks: ["Exclusive: Up to $1,700 OBC", "Complimentary Gratuities", "Open bars, Unlimited Wi-Fi"] },
];

const riverOffers = [
  { name: "AmaWaterways", headline: "Up to $2,000 Savings + FREE Upgrade + OBC", subline: "FREE Land Package", perks: ["Exclusive: Up to $1,700 OBC", "Military Savings", "FREE Shore Excursions"] },
  { name: "Avalon Waterways", headline: "FREE Air or Save up to $3,000 per couple", subline: "Single Supplement Waived", perks: ["Complimentary Excursions", "Complimentary Wine", "Complimentary Wi-Fi"] },
  { name: "Scenic Cruises", headline: "2 For 1 Fares + FREE Air", subline: "Up to $4,000 Savings per suite", perks: ["Exclusive Rates", "Unlimited Drinks", "FREE Wi-Fi & Excursions"] },
  { name: "Viking River Cruises", headline: "Up to 35% OFF + FREE Airfare + $25 Deposit", subline: "All Inclusive Cruising", perks: ["FREE Shore Excursions", "FREE Unlimited Beverages", "FREE Wi-Fi"] },
  { name: "Uniworld River Cruises", headline: "Up to 30% Savings per person", subline: "River Heritage: Save up to $500 per stateroom", perks: ["Exclusive: Up to $1,700 OBC", "Reduced Single Supplements", "FREE Gratuities"] },
  { name: "Emerald Cruises", headline: "2 for 1 Fares + FREE Airfare", subline: "Up to $2,000 Bonus Savings", perks: ["Exclusive Rates", "FREE Gratuities", "FREE Shore Excursions"] },
];

const landTourOffers = [
  { name: "Adventures by Disney", headline: "Exclusive Adult Only Departures", subline: "Two Adventure Guides", perks: ["Outstanding Accommodations", "Most meals during trip", "Gratuities Included"] },
  { name: "CIE Tours International", headline: "Save up to $150 per person", subline: "Travel With Friends: Save 5%", perks: ["Solo Traveler Savings", "Group Discounts on 10+", "Military Discounts"] },
  { name: "Cosmos Tours", headline: "EXCLUSIVE: Up to $1700 Tour Credit", subline: "Small-Group Discovery", perks: ["Worldwide Destinations", "Most meals during trip", "Guided Sightseeing Tours"] },
  { name: "Tauck Tours", headline: "TAUCK BRIDGES: Family Discovery Tours", subline: "Small Group Departures", perks: ["Ken Burns American Journeys", "Most meals during trip", "Gratuities Included"] },
  { name: "Globus Tours", headline: "Independent City Stay", subline: "Choice Touring by Globus", perks: ["Worldwide Destinations", "Small Group Discovery Tour"] },
  { name: "Trafalgar Tours", headline: "EXCLUSIVE: Up to $1700 Tour Credit", subline: "VIP entry to many sights", perks: ["All Hotel tips & charges", "Airport Transfers", "Expert Travel Director"] },
];

const icons = [Ship, Anchor, Crown, Star, Gem, Waves, Sailboat, Globe, Compass, Navigation, Ship, Anchor];

const tabs = [
  { label: "Best Cruise Offers", data: bestCruiseOffers },
  { label: "River Cruise Offers", data: riverOffers },
  { label: "Land Tour Offers", data: landTourOffers },
];

const SpecialOffers = () => {
  const [activeTab, setActiveTab] = useState(0);
  const data = tabs[activeTab].data;

  return (
    <section className="py-8 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title mb-4">View Special Offers</h2>
        <div className="flex gap-1 mb-5 justify-center">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 text-sm font-bold rounded-t transition-colors ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((offer, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={offer.name} className="offer-card">
                <div className="flex items-start gap-3">
                  <Icon className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading font-bold text-primary">{offer.name}</h4>
                      {"tag" in offer && typeof offer.tag === "string" && offer.tag && (
                        <span className="bg-red-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm">
                          {offer.tag}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-foreground mb-0.5">{offer.headline}</p>
                    <p className="text-sm text-accent font-semibold mb-2">{offer.subline}</p>
                    <ul className="space-y-0.5">
                      {offer.perks.map((perk) => (
                        <li key={perk} className="text-xs text-muted-foreground">• {perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          All offers are based on select sailings and categories and are subject to availability at time of booking.
        </p>
      </div>
    </section>
  );
};

export default SpecialOffers;
