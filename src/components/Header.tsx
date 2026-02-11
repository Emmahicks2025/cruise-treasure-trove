import { Phone, Mail, MessageCircle, Waves, ChevronRight, Headphones } from "lucide-react";

const Header = () => (
  <header className="glass-strong sticky top-0 z-50 border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-ocean to-primary flex items-center justify-center shadow-lg shadow-ocean/20 group-hover:shadow-ocean/40 transition-shadow">
          <Waves className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-heading font-black tracking-tight leading-none">
            <span className="bg-gradient-to-r from-primary to-ocean bg-clip-text text-transparent">Cruise</span>
            <span className="bg-gradient-to-r from-ocean to-accent bg-clip-text text-transparent">Wave</span>
          </h1>
          <p className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase leading-none mt-0.5">
            Premium Cruise Deals
          </p>
        </div>
      </a>

      {/* Center — Quick Actions (desktop) */}
      <div className="hidden lg:flex items-center gap-1">
        {["My Trips", "Deals", "Support"].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right — Contact (desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href="tel:888-333-3116"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl glass hover:bg-muted/60 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean/20 to-primary/10 flex items-center justify-center">
            <Headphones className="w-4 h-4 text-ocean" />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-muted-foreground font-medium leading-none">Call Experts</p>
            <p className="text-sm font-heading font-bold text-foreground leading-tight">888-333-3116</p>
          </div>
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-ocean to-primary text-white text-sm font-semibold hover:shadow-lg hover:shadow-ocean/25 transition-all"
        >
          Manage Booking
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile icons */}
      <div className="flex items-center gap-1 md:hidden">
        <button className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors"><Mail className="w-5 h-5 text-ocean" /></button>
        <button className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors"><Phone className="w-5 h-5 text-ocean" /></button>
        <button className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors"><MessageCircle className="w-5 h-5 text-ocean" /></button>
      </div>
    </div>
  </header>
);

export default Header;
