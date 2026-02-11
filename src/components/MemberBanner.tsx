import { useState } from "react";
import { Bell, X } from "lucide-react";

const MemberBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-strong rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 animate-slide-in">
      <div className="p-2 rounded-xl bg-accent/10">
        <Bell className="w-5 h-5 text-accent" />
      </div>
      <span className="text-sm font-medium text-foreground">
        <span className="text-accent font-bold">Join</span> for Exclusive Member Savings!
      </span>
      <button onClick={() => setVisible(false)} className="ml-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default MemberBanner;
