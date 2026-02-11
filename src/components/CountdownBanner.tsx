import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor } from "lucide-react";

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 20, minutes: 57 });
  const navigate = useNavigate();

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
    <div className="countdown-bar cursor-pointer" onClick={() => navigate("/cruises?search=Royal Caribbean")}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Anchor className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-primary text-sm">Royal Caribbean</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-red-sale font-bold text-xs bg-red-sale/10 px-3 py-1 rounded-full">Ends Today!</span>
          <span className="font-heading font-bold text-foreground text-sm uppercase tracking-wide">
            LAST CHANCE MEGA SALE
          </span>
        </div>
        <div className="flex items-center gap-2 font-heading font-bold text-primary text-xl">
          <div className="bg-primary/10 rounded-xl px-3 py-1.5">
            <span className="text-2xl">{timeLeft.hours}</span>
            <span className="text-[10px] font-medium text-muted-foreground ml-0.5">HRS</span>
          </div>
          <div className="bg-primary/10 rounded-xl px-3 py-1.5">
            <span className="text-2xl">{timeLeft.minutes}</span>
            <span className="text-[10px] font-medium text-muted-foreground ml-0.5">MIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
