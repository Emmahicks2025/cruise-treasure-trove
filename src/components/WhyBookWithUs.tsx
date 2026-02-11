import { Award, Clock, Shield, Headphones } from "lucide-react";

const reasons = [
  { icon: <Award className="w-7 h-7" />, title: "Award-Winning", desc: "Named Agency of the Year by multiple cruise lines" },
  { icon: <Clock className="w-7 h-7" />, title: "Since 1998", desc: "Decades of experience connecting travelers with perfect vacations" },
  { icon: <Shield className="w-7 h-7" />, title: "Best Price Guarantee", desc: "Exclusive discounts, onboard credits, and upgrades" },
  { icon: <Headphones className="w-7 h-7" />, title: "24/7 Support", desc: "Expert cruise agents available around the clock" },
];

const WhyBookWithUs = () => (
  <section className="py-10">
    <div className="max-w-7xl mx-auto px-6">
      <h3 className="section-title mb-2">Why Book With Cruise.com?</h3>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Award-Winning Service, Decades of Experience and Exclusive Deals
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="text-center glass rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <div className="text-accent">{r.icon}</div>
            </div>
            <h4 className="font-heading font-bold text-foreground text-sm mb-1">{r.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        <p>
          Cruise.com has been connecting travelers with the perfect cruise vacations since 1998. We pride ourselves 
          in the best service possible, an accomplishment acknowledged by the most authoritative companies in the 
          cruise industry.
        </p>
      </div>
    </div>
  </section>
);

export default WhyBookWithUs;
