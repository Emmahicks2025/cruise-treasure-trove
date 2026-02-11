import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBookingByRef } from "@/lib/cruiseApi";
import { Check, Anchor, Printer, Home } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const ConfirmationPage = () => {
  const { ref } = useParams<{ ref: string }>();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", ref],
    queryFn: () => fetchBookingByRef(ref!),
    enabled: !!ref,
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Anchor className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <TopBar /><Header /><MainNav />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-deal rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-black text-primary mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your cruise reservation has been successfully processed.</p>
        </div>

        {booking && (
          <div className="offer-card mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-t-sm -m-5 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs opacity-80">Booking Reference</p>
                  <p className="text-2xl font-heading font-black">{booking.booking_ref}</p>
                </div>
                <p className="text-xs opacity-80">Status: <span className="font-bold capitalize">{booking.status}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-heading font-bold text-primary mb-2">Cruise Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Cruise:</strong> {(booking as any).cruises?.name}</p>
                  <p><strong className="text-foreground">Ship:</strong> {(booking as any).cruises?.ship_name}</p>
                  <p><strong className="text-foreground">Cabin:</strong> {(booking as any).cabin_types?.name}</p>
                  <p><strong className="text-foreground">Guests:</strong> {booking.num_guests}</p>
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary mb-2">Guest Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Name:</strong> {booking.guest_first_name} {booking.guest_last_name}</p>
                  <p><strong className="text-foreground">Email:</strong> {booking.guest_email}</p>
                  {booking.guest_phone && <p><strong className="text-foreground">Phone:</strong> {booking.guest_phone}</p>}
                  <p><strong className="text-foreground">Total Paid:</strong> <span className="text-xl font-heading font-black text-primary">${Number(booking.total_price_usd).toLocaleString()}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button onClick={() => window.print()} className="flex items-center gap-2 border border-border px-6 py-2 rounded-sm text-sm font-semibold hover:bg-muted transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
          <Link to="/" className="flex items-center gap-2 btn-book px-6 py-2">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
