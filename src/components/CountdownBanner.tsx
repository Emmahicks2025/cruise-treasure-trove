import { useState, useEffect } from "react";
import { Anchor } from "lucide-react";

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 20, minutes: 57 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0) {
          if (prev.hours === 0) return prev;
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return { ...prev, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-bar">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Anchor className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-primary text-sm">Royal Caribbean</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-red-sale font-bold text-sm">Ends Today!</span>
          <span className="font-heading font-bold text-foreground text-sm uppercase">
            LAST CHANCE MEGA SALE
          </span>
        </div>
        <div className="flex items-center gap-1 font-heading font-bold text-primary text-xl">
          <span className="text-3xl">{timeLeft.hours}</span>
          <span className="text-xs font-semibold text-muted-foreground">HRS</span>
          <span className="text-3xl ml-1">{timeLeft.minutes}</span>
          <span className="text-xs font-semibold text-muted-foreground">MINS</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
