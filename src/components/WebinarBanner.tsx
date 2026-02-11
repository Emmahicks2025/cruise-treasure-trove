import { Video } from "lucide-react";

const WebinarBanner = () => (
  <section className="py-6 bg-primary">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-primary-foreground">
        <Video className="w-8 h-8" />
        <div>
          <h3 className="font-heading font-bold text-lg">FREE Cruise Webinars</h3>
          <p className="text-sm opacity-80">
            Learn all about cruising from the comfort of your own home with our live complimentary Virtual Cruise Lectures.
          </p>
        </div>
      </div>
      <button className="btn-book text-sm px-8 py-3">REGISTER</button>
    </div>
  </section>
);

export default WebinarBanner;
