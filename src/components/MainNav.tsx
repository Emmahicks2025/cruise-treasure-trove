import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Menu, X, Compass, Ship, MapPin, Anchor, Info, PhoneCall } from "lucide-react";
import { fetchDestinations, fetchCruiseLines } from "@/lib/cruiseApi";

const navIcons: Record<string, React.ElementType> = {
  "Cruise Deals": Compass,
  "Cruise Lines": Ship,
  "Destinations": MapPin,
  "Specialty Cruises": Anchor,
  "Cruise Info": Info,
  "Contact": PhoneCall,
};

const MainNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: destinations } = useQuery({ queryKey: ["destinations"], queryFn: fetchDestinations });
  const { data: cruiseLines } = useQuery({ queryKey: ["cruiseLines"], queryFn: fetchCruiseLines });

  const navItems = [
    {
      label: "Cruise Deals",
      hasDropdown: true,
      items: [
        { label: "All Cruise Deals", action: () => navigate("/cruises") },
        { label: "Last Minute Deals", action: () => navigate("/cruises?search=") },
        { label: "Featured Deals", action: () => navigate("/cruises") },
      ],
    },
    {
      label: "Cruise Lines",
      hasDropdown: true,
      items: cruiseLines?.map(cl => ({
        label: cl.name,
        action: () => navigate(`/cruises?cruiseLine=${cl.id}`),
      })) || [],
    },
    {
      label: "Destinations",
      hasDropdown: true,
      items: destinations?.map(d => ({
        label: d.name,
        action: () => navigate(`/cruises?destination=${d.id}`),
      })) || [],
    },
    { label: "Specialty Cruises", hasDropdown: false, action: () => navigate("/cruises") },
    { label: "Cruise Info", hasDropdown: false, action: () => navigate("/cruises") },
    { label: "Contact", hasDropdown: false },
  ];

  return (
    <nav className="nav-main relative z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between md:justify-start">
          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center w-full">
            {navItems.map((item) => {
              const Icon = navIcons[item.label];
              return (
                <li
                  key={item.label}
                  className="group relative"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => item.action?.()}
                    className={`
                      flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-medium
                      text-white/80 hover:text-white
                      border-b-2 border-transparent hover:border-accent
                      transition-all duration-200
                    `}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180 opacity-100" : ""}`} />
                    )}
                  </button>

                  {/* Dropdown */}
                  {item.hasDropdown && openDropdown === item.label && item.items && item.items.length > 0 && (
                    <div className="absolute top-full left-0 min-w-[260px] max-h-[420px] overflow-y-auto z-50 mt-0 py-2 rounded-2xl bg-popover border border-border shadow-xl shadow-black/10 animate-fade-in">
                      {item.items.map((sub, idx) => (
                        <button
                          key={sub.label}
                          onClick={() => { sub.action(); setOpenDropdown(null); }}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-ocean/40" />
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 animate-fade-in">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = navIcons[item.label];
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => { item.action?.(); setMobileOpen(false); }}
                      className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      {Icon && <Icon className="w-4 h-4 text-accent" />}
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
