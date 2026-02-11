import { Phone, Mail, MessageCircle } from "lucide-react";

const Header = () => (
  <header className="glass-strong sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-heading font-black tracking-tight">
          <span className="bg-gradient-to-r from-primary to-ocean bg-clip-text text-transparent">CRUISE</span>
          <span className="text-accent">.</span>
          <span className="bg-gradient-to-r from-primary to-ocean bg-clip-text text-transparent">COM</span>
        </h1>
        <p className="text-[10px] text-muted-foreground leading-tight hidden md:block font-medium">
          One of the Internet's<br />Largest Cruise Specialists
        </p>
      </div>
      <div className="hidden md:flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Cruise Experts</span>
          <a href="tel:888-333-3116" className="text-xl font-heading font-bold text-primary hover:text-ocean transition-colors">
            888-333-3116
          </a>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span>
            <a href="#" className="text-ocean hover:underline font-medium">After Sales:</a>{" "}
            <a href="tel:800-217-1807" className="font-semibold text-foreground">800-217-1807</a>
          </span>
          <span className="text-border">|</span>
          <a href="#" className="text-ocean font-semibold hover:underline">Manage Booking →</a>
        </div>
      </div>
      <div className="flex items-center gap-1 md:hidden">
        <button className="p-2.5 rounded-xl hover:bg-muted transition-colors"><Mail className="w-5 h-5 text-primary" /></button>
        <button className="p-2.5 rounded-xl hover:bg-muted transition-colors"><Phone className="w-5 h-5 text-primary" /></button>
        <button className="p-2.5 rounded-xl hover:bg-muted transition-colors"><MessageCircle className="w-5 h-5 text-primary" /></button>
      </div>
    </div>
  </header>
);

export default Header;
