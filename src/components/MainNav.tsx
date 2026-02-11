import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Menu, X } from "lucide-react";
import { fetchDestinations, fetchCruiseLines } from "@/lib/cruiseApi";

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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start">
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <ul className="hidden md:flex items-center">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="group relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => item.action?.()}
                  className="flex items-center gap-0.5 px-3 py-3 text-sm font-semibold hover:bg-navy-dark transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
                </button>
                {item.hasDropdown && openDropdown === item.label && item.items && item.items.length > 0 && (
                  <div className="absolute top-full left-0 bg-background border border-border shadow-lg rounded-sm min-w-[220px] max-h-[400px] overflow-y-auto z-50">
                    {item.items.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => { sub.action(); setOpenDropdown(null); }}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {mobileOpen && (
          <ul className="md:hidden pb-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => { item.action?.(); setMobileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-navy-dark transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
