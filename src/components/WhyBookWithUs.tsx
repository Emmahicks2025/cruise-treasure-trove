import { Award, Clock, Shield, Headphones } from "lucide-react";

const reasons = [
  { icon: <Award className="w-8 h-8" />, title: "Award-Winning", desc: "Named Agency of the Year by multiple cruise lines" },
  { icon: <Clock className="w-8 h-8" />, title: "Since 1998", desc: "Decades of experience connecting travelers with perfect vacations" },
  { icon: <Shield className="w-8 h-8" />, title: "Best Price Guarantee", desc: "Exclusive discounts, onboard credits, and upgrades" },
  { icon: <Headphones className="w-8 h-8" />, title: "24/7 Support", desc: "Expert cruise agents available around the clock" },
];

const WhyBookWithUs = () => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-xl font-heading font-bold text-primary text-center mb-2">
        Why Book With Cruise.com?
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Award-Winning Service, Decades of Experience and Exclusive Deals
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="text-center">
            <div className="text-accent mx-auto mb-2 flex justify-center">{r.icon}</div>
            <h4 className="font-heading font-bold text-primary text-sm mb-1">{r.title}</h4>
            <p className="text-xs text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
        <p>
          Cruise.com has been connecting travelers with the perfect cruise vacations since 1998. We pride ourselves 
          in the best service possible, an accomplishment acknowledged by the most authoritative companies in the 
          cruise industry. Cruise.com offers cruises on all cruise lines, including Carnival Cruises, Celebrity 
          Cruises, Princess Cruises and a host of others.
        </p>
      </div>
    </div>
  </section>
);

export default WhyBookWithUs;
