import { useState } from "react";
import { Bell, X } from "lucide-react";

const MemberBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 bg-primary text-primary-foreground rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 animate-slide-in">
      <Bell className="w-5 h-5 text-gold" />
      <span className="text-sm font-semibold">
        <span className="text-gold font-bold">Join</span> for Exclusive Member Savings!
      </span>
      <button onClick={() => setVisible(false)} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MemberBanner;
