import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/slideshow/msc.webp",
    fallbackImage: "/images/slideshow/hero-cruise.jpg",
    cruiseLine: "MSC Cruises",
    headline: "Presidents' Day Sale",
    discount: "40% OFF",
    discountPrefix: "Up to",
    perks: ["Up to $750 Onboard Credit", "Kids Sail FREE"],
    search: "MSC",
  },
  {
    image: "/images/slideshow/hero-cruise.jpg",
    cruiseLine: "Royal Caribbean",
    headline: "Last Chance Mega Sale",
    discount: "60% OFF",
    discountPrefix: "",
    discountSuffix: "Second Guest",
    perks: ["Up to $1,000 Instant Savings", "3rd & 4th Sail FREE"],
    search: "Royal Caribbean",
  },
  {
    image: "/images/slideshow/alaska-cruise.jpg",
    cruiseLine: "Celebrity Cruises",
    headline: "Alaska Season",
    discount: "75% OFF",
    discountPrefix: "",
    discountSuffix: "2nd Guest",
    perks: ["3rd - 5th Guests FREE", "Up to $700 Instant Savings"],
    search: "Alaska",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden group">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.cruiseLine}
            className="w-full h-full object-cover"
          />
          <div className="slide-overlay absolute inset-0" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-md animate-fade-in" key={current}>
            <p className="text-primary-foreground text-lg font-bold mb-1 drop-shadow-lg">
              {slide.cruiseLine}
            </p>
            <p className="text-primary-foreground text-sm mb-2 drop-shadow">{slide.headline}</p>
            <div className="flex items-baseline gap-2 mb-3">
              {slide.discountPrefix && (
                <span className="text-primary-foreground text-sm drop-shadow">{slide.discountPrefix}</span>
              )}
              <span className="text-5xl md:text-6xl font-heading font-black text-primary-foreground drop-shadow-lg">
                {slide.discount}
              </span>
              {slide.discountSuffix && (
                <span className="text-primary-foreground text-lg font-semibold drop-shadow">{slide.discountSuffix}</span>
              )}
            </div>
            {slide.perks.map((perk) => (
              <p key={perk} className="text-primary-foreground text-sm drop-shadow mb-0.5">
                + {perk}
              </p>
            ))}
            <button
              onClick={() => navigate(`/cruises?search=${encodeURIComponent(slide.search)}`)}
              className="btn-book mt-4 text-base px-8 py-3"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/30 hover:bg-background/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-primary-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/30 hover:bg-background/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-primary-foreground" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-accent" : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
