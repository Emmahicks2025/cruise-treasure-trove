import { Video } from "lucide-react";

const WebinarBanner = () => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="glass-dark rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-primary-foreground">
          <div className="p-3 rounded-2xl bg-primary-foreground/10">
            <Video className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg">FREE Cruise Webinars</h3>
            <p className="text-sm text-primary-foreground/60">
              Learn all about cruising from the comfort of your home with our live complimentary Virtual Cruise Lectures.
            </p>
          </div>
        </div>
        <button className="btn-book text-sm px-8 py-3 shrink-0">REGISTER</button>
      </div>
    </div>
  </section>
);

export default WebinarBanner;
