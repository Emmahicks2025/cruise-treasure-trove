import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide uppercase text-primary-foreground/60">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Email Signup */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide uppercase text-primary-foreground/60">Weekly eDeals</h4>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-foreground bg-primary-foreground/90 border-none focus:ring-2 focus:ring-accent focus:outline-none"
              />
              <button className="btn-book text-xs px-4 py-2.5">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide uppercase text-primary-foreground/60">Our Partners</h4>
            <div className="flex gap-4 text-xs text-primary-foreground/50">
              <span>Tour Deals</span>
              <span>Omega World Travel</span>
              <span>Luxury Travel Team</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-wrap gap-3 text-xs mb-4 justify-center text-primary-foreground/50">
            {["Accessibility", "Affiliate", "Careers", "Contact", "Terms", "Privacy", "Cookies"].map((link, i) => (
              <span key={link}>
                {i > 0 && <span className="mr-3">·</span>}
                <a href="#" className="hover:text-primary-foreground transition-colors">{link}</a>
              </span>
            ))}
          </div>
          <div className="text-center text-xs text-primary-foreground/30">
            <p>CRUISE.COM is a proud PREMIER PARTNER of CLIA</p>
            <p className="mt-1">©2026 CRUISE.COM. All Rights reserved. CST #2151626-50</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
