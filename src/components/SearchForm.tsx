import { useState } from "react";
import { Search } from "lucide-react";

const destinations = [
  "Caribbean/Bahamas", "Alaska", "Mediterranean", "Northern Europe", "Panama Canal",
  "Bermuda", "Hawaii/Tahiti", "Mexico", "South America", "Transatlantic", "World Cruises"
];

const cruiseLines = [
  "All Cruise Lines", "Carnival Cruise Line", "Celebrity Cruises", "Costa Cruises",
  "Disney Cruise Line", "Holland America", "MSC Cruises", "Norwegian Cruise Line",
  "Princess Cruises", "Royal Caribbean", "Viking Cruises"
];

const months = [
  "All Months", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026",
  "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026"
];

const lengths = ["All Lengths", "1-2 Days", "3-5 Days", "6-9 Days", "10+ Days"];

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState<"cruises" | "tours">("cruises");

  return (
    <div className="bg-secondary py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex mb-3">
          <button
            onClick={() => setActiveTab("cruises")}
            className={`px-6 py-2 font-bold text-sm uppercase tracking-wide transition-colors ${
              activeTab === "cruises"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            Cruises
          </button>
          <button
            onClick={() => setActiveTab("tours")}
            className={`px-6 py-2 font-bold text-sm uppercase tracking-wide transition-colors ${
              activeTab === "tours"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            Tours
          </button>
        </div>

        {activeTab === "cruises" && (
          <div>
            <h2 className="text-lg font-heading font-bold text-primary text-center mb-3">
              Cruise Deals on All Major Cruise Lines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                {destinations.map(d => <option key={d}>{d}</option>)}
              </select>
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                {cruiseLines.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                <option>All Ships</option>
              </select>
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                <option>All Ports</option>
              </select>
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
              <select className="border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:ring-2 focus:ring-ocean focus:outline-none">
                {lengths.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="accent-ocean" />
                  <span>Senior Discounts</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="accent-ocean" />
                  <span>Military Discounts</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="accent-ocean" />
                  <span>Show Non-Refundable Fares</span>
                </label>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-red-sale uppercase">Residency Discounts</span>
                  <select className="border border-border rounded-sm px-2 py-1.5 text-sm bg-background">
                    <option>State/Province</option>
                  </select>
                </div>
                <button className="btn-search px-8 py-2.5 rounded-sm flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  SEARCH
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <a href="#" className="text-ocean hover:underline">Cruise Port Search »</a>
              <a href="#" className="text-ocean hover:underline">Advanced Search »</a>
            </div>
          </div>
        )}

        {activeTab === "tours" && (
          <div className="text-center py-8">
            <h2 className="text-lg font-heading font-bold text-primary mb-3">Tour Search</h2>
            <p className="text-muted-foreground">Search available land tour packages</p>
            <button className="btn-search px-8 py-2.5 rounded-sm mt-4">SEARCH TOURS</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
