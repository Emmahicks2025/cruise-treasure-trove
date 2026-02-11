import { Bell, MessageCircle, Globe } from "lucide-react";

const TopBar = () => (
  <div className="bg-foreground/95 text-primary-foreground text-xs py-2">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        <Bell className="w-3.5 h-3.5 text-accent" />
        <span className="text-accent font-semibold">Member Savings</span>
      </button>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Cruise Chat</span>
        </button>
        <span className="opacity-20">|</span>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <Globe className="w-3.5 h-3.5" />
          <span>Int. Cruise Clients</span>
        </button>
        <span className="opacity-20">|</span>
        <button className="font-semibold hover:opacity-80 transition-opacity">
          Español →
        </button>
      </div>
    </div>
  </div>
);

export default TopBar;
