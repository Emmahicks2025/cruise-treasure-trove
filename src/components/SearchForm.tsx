import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { fetchDestinations, fetchCruiseLines, fetchPorts, fetchShips } from "@/lib/cruiseApi";

const months = [
  "All Months", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026",
  "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026"
];

const lengths = ["All Lengths", "1-2 Days", "3-5 Days", "6-9 Days", "10+ Days"];

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState<"cruises" | "tours">("cruises");
  const [destinationId, setDestinationId] = useState("");
  const [cruiseLineId, setCruiseLineId] = useState("");
  const [port, setPort] = useState("");
  const [ship, setShip] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const { data: destinations } = useQuery({ queryKey: ["destinations"], queryFn: fetchDestinations });
  const { data: cruiseLines } = useQuery({ queryKey: ["cruiseLines"], queryFn: fetchCruiseLines });

  const { data: ports } = useQuery({
    queryKey: ["ports", destinationId, cruiseLineId],
    queryFn: () => fetchPorts({ destination: destinationId || undefined, cruiseLine: cruiseLineId || undefined }),
  });

  const { data: ships } = useQuery({
    queryKey: ["ships", destinationId, cruiseLineId],
    queryFn: () => fetchShips({ destination: destinationId || undefined, cruiseLine: cruiseLineId || undefined }),
  });

  const handleDestinationChange = (value: string) => {
    setDestinationId(value);
    setPort("");
    setShip("");
  };

  const handleCruiseLineChange = (value: string) => {
    setCruiseLineId(value);
    setPort("");
    setShip("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destinationId) params.set("destination", destinationId);
    if (cruiseLineId) params.set("cruiseLine", cruiseLineId);
    if (port) params.set("port", port);
    if (ship) params.set("ship", ship);
    if (duration) params.set("duration", duration);
    navigate(`/cruises?${params.toString()}`);
  };

  const selectClass = "glass border-0 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none appearance-none cursor-pointer transition-all hover:shadow-md";

  return (
    <div className="py-6 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1 mb-4">
          {["cruises", "tours"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "cruises" | "tours")}
              className={`px-6 py-2.5 font-semibold text-sm uppercase tracking-wide rounded-xl transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "cruises" && (
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground text-center mb-4">
              Cruise Deals on All Major Cruise Lines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              <select value={destinationId} onChange={(e) => handleDestinationChange(e.target.value)} className={selectClass}>
                <option value="">All Destinations</option>
                {destinations?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <select value={cruiseLineId} onChange={(e) => handleCruiseLineChange(e.target.value)} className={selectClass}>
                <option value="">All Cruise Lines</option>
                {cruiseLines?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select value={ship} onChange={(e) => setShip(e.target.value)} className={selectClass}>
                <option value="">All Ships</option>
                {ships?.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={port} onChange={(e) => setPort(e.target.value)} className={selectClass}>
                <option value="">All Ports</option>
                {ports?.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select className={selectClass}>
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className={selectClass}>
                {lengths.map(l => {
                  const val = l === "All Lengths" ? "" : l === "1-2 Days" ? "1-5" : l === "3-5 Days" ? "1-5" : l === "6-9 Days" ? "6-9" : "10+";
                  return <option key={l} value={val}>{l}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 text-sm">
                {["Senior Discounts", "Military Discounts", "Non-Refundable Fares"].map((label) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-red-sale uppercase">Residency</span>
                  <select className={`${selectClass} py-2`}><option>State/Province</option></select>
                </div>
                <button onClick={handleSearch} className="btn-search px-8 py-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  SEARCH
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <button onClick={() => navigate("/cruises")} className="text-primary font-medium hover:underline">Cruise Port Search →</button>
              <button onClick={() => navigate("/cruises")} className="text-primary font-medium hover:underline">Advanced Search →</button>
            </div>
          </div>
        )}

        {activeTab === "tours" && (
          <div className="text-center py-10">
            <h2 className="text-lg font-heading font-bold text-foreground mb-3">Tour Search</h2>
            <p className="text-muted-foreground mb-4">Search available land tour packages</p>
            <button onClick={() => navigate("/cruises")} className="btn-search px-8 py-3">SEARCH TOURS</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
