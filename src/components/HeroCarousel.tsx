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
    <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden group">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
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
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-lg animate-fade-in" key={current}>
            <div className="glass-dark inline-block rounded-2xl px-8 py-6">
              <p className="text-primary-foreground/80 text-sm font-medium mb-1 tracking-wide uppercase">
                {slide.cruiseLine}
              </p>
              <p className="text-primary-foreground text-sm mb-3">{slide.headline}</p>
              <div className="flex items-baseline gap-2 mb-4">
                {slide.discountPrefix && (
                  <span className="text-primary-foreground/70 text-sm">{slide.discountPrefix}</span>
                )}
                <span className="text-5xl md:text-6xl font-heading font-black text-primary-foreground">
                  {slide.discount}
                </span>
                {slide.discountSuffix && (
                  <span className="text-primary-foreground/80 text-base font-medium">{slide.discountSuffix}</span>
                )}
              </div>
              {slide.perks.map((perk) => (
                <p key={perk} className="text-primary-foreground/70 text-sm mb-0.5">
                  + {perk}
                </p>
              ))}
              <button
                onClick={() => navigate(`/cruises?search=${encodeURIComponent(slide.search)}`)}
                className="btn-book mt-5 text-base px-10 py-3.5"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-accent w-8" : "bg-primary-foreground/40 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
