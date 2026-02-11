import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="hover:opacity-80 transition-opacity"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Email Signup */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Save with our weekly edeals!</h4>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-sm text-sm text-foreground bg-background border-none focus:ring-2 focus:ring-ocean"
              />
              <button className="btn-book text-xs px-4 py-2">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase mb-3">Our Partners</h4>
            <div className="flex gap-4 text-xs opacity-80">
              <span>Tour Deals</span>
              <span>Omega World Travel</span>
              <span>Luxury Travel Team</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4">
          <div className="flex flex-wrap gap-3 text-xs mb-3 justify-center">
            <a href="#" className="hover:underline">Accessibility Statement</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Become an Affiliate</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Careers</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Contact Us</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Terms of Use</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
          <div className="text-center text-xs opacity-60">
            <p>CRUISE.COM is a proud PREMIER PARTNER of CLIA</p>
            <p className="mt-1">©2026 CRUISE.COM. All Rights reserved. CST #2151626-50</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
