import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "Cruise Deals", hasDropdown: true },
  { label: "Cruise Lines", hasDropdown: true },
  { label: "Destinations", hasDropdown: true },
  { label: "Specialty Cruises", hasDropdown: true },
  { label: "Ports", hasDropdown: true },
  { label: "Land Tours", hasDropdown: true },
  { label: "Cruise Info", hasDropdown: true },
  { label: "Contact", hasDropdown: true },
  { label: "Login", hasDropdown: false },
];

const MainNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav-main">
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
              <li key={item.label} className="group relative">
                <button className="flex items-center gap-0.5 px-3 py-3 text-sm font-semibold hover:bg-navy-dark transition-colors">
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {mobileOpen && (
          <ul className="md:hidden pb-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <button className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-navy-dark transition-colors">
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
