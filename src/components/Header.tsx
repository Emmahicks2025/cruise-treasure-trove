import { Phone, Mail, MessageCircle } from "lucide-react";

const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-heading font-black tracking-tight text-primary">
          CRUISE<span className="text-accent">.</span>COM
        </h1>
        <p className="text-[10px] text-muted-foreground leading-tight hidden md:block">
          One of the Internet's<br />Largest Cruise Specialists
        </p>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Cruise Experts</span>
          <a href="tel:888-333-3116" className="text-2xl font-heading font-bold text-primary hover:text-navy-light transition-colors">
            888-333-3116
          </a>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span>
            <a href="#" className="text-ocean hover:underline">After Sales Service:</a>{" "}
            <a href="tel:800-217-1807" className="font-semibold text-foreground">800-217-1807</a>
          </span>
          <span className="text-muted-foreground">|</span>
          <a href="#" className="text-ocean font-semibold hover:underline">Manage Booking »</a>
        </div>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <button className="p-2 text-primary"><Mail className="w-5 h-5" /></button>
        <button className="p-2 text-primary"><Phone className="w-5 h-5" /></button>
        <button className="p-2 text-primary"><MessageCircle className="w-5 h-5" /></button>
      </div>
    </div>
  </header>
);

export default Header;
