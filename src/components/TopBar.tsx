import { Bell, MessageCircle, Globe, Sparkles } from "lucide-react";

const TopBar = () => (
  <div className="bg-gradient-to-r from-primary via-primary/95 to-ocean text-white text-xs py-1.5">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <button className="flex items-center gap-1.5 hover:opacity-90 transition-opacity group">
        <Sparkles className="w-3 h-3 text-accent animate-pulse" />
        <span className="font-semibold text-accent group-hover:underline">Exclusive Member Savings</span>
      </button>
      <div className="hidden sm:flex items-center gap-1">
        {[
          { icon: MessageCircle, label: "Live Chat" },
          { icon: Globe, label: "International" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-white/10 transition-all"
          >
            <Icon className="w-3 h-3 opacity-70" />
            <span className="opacity-90">{label}</span>
          </button>
        ))}
        <button className="ml-1 px-2.5 py-1 rounded-full bg-white/10 font-semibold hover:bg-white/20 transition-all">
          ES
        </button>
      </div>
    </div>
  </div>
);

export default TopBar;
