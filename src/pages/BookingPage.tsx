import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCruiseBySlug, fetchCabinTypes, createBooking, CabinType } from "@/lib/cruiseApi";
import { ArrowLeft, Anchor, Check, CreditCard, User, Ship } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const BookingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const cabinId = searchParams.get("cabin");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [numGuests, setNumGuests] = useState(2);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", specialRequests: "",
  });
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const { data: cruise } = useQuery({ queryKey: ["cruise", slug], queryFn: () => fetchCruiseBySlug(slug!), enabled: !!slug });
  const { data: cabins } = useQuery({ queryKey: ["cabins", cruise?.id], queryFn: () => fetchCabinTypes(cruise!.id), enabled: !!cruise?.id });

  const selectedCabin = cabins?.find((c) => c.id === cabinId);
  const totalPrice = selectedCabin ? selectedCabin.base_price_usd * numGuests : 0;

  const bookMutation = useMutation({
    mutationFn: () => createBooking({
      cruise_id: cruise!.id,
      cabin_type_id: selectedCabin!.id,
      guest_first_name: form.firstName,
      guest_last_name: form.lastName,
      guest_email: form.email,
      guest_phone: form.phone || undefined,
      num_guests: numGuests,
      total_price_usd: totalPrice,
      special_requests: form.specialRequests || undefined,
    }),
    onSuccess: (data) => {
      navigate(`/confirmation/${data.booking_ref}`);
    },
    onError: () => {
      toast({ title: "Booking Failed", description: "Please check your details and try again.", variant: "destructive" });
    },
  });

  if (!cruise || !selectedCabin) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar /><Header /><MainNav />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Anchor className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar /><Header /><MainNav />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary text-sm mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to cruise
        </button>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[{ n: 1, label: "Guest Info", icon: User }, { n: 2, label: "Payment", icon: CreditCard }, { n: 3, label: "Confirm", icon: Check }].map(({ n, label, icon: Icon }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {step > n ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step >= n ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              {n < 3 && <div className={`w-12 h-0.5 ${step > n ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="offer-card">
                <h2 className="font-heading font-bold text-primary text-lg mb-4">Guest Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">First Name *</label>
                      <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" required />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Last Name *</label>
                      <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Number of Guests</label>
                    <select value={numGuests} onChange={(e) => setNumGuests(Number(e.target.value))} className="w-full border border-border rounded-sm px-3 py-2 text-sm">
                      {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Special Requests</label>
                    <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" rows={3} placeholder="Dietary needs, celebrations, accessibility..." />
                  </div>
                  <button
                    onClick={() => { if (form.firstName && form.lastName && form.email) setStep(2); else toast({ title: "Required fields", description: "Please fill in all required fields", variant: "destructive" }); }}
                    className="btn-search w-full py-3 rounded-sm"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="offer-card">
                <h2 className="font-heading font-bold text-primary text-lg mb-4">Payment Details (Demo)</h2>
                <p className="text-xs text-muted-foreground mb-4 bg-muted p-3 rounded-sm">🔒 This is a demo checkout. No real payment will be processed.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Card Number</label>
                    <input type="text" value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} placeholder="4242 4242 4242 4242" className="w-full border border-border rounded-sm px-3 py-2 text-sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Expiry</label>
                      <input type="text" value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} placeholder="MM/YY" className="w-full border border-border rounded-sm px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">CVV</label>
                      <input type="text" value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })} placeholder="123" className="w-full border border-border rounded-sm px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Name on Card</label>
                      <input type="text" value={cardForm.name} onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 border border-border py-3 rounded-sm text-sm font-semibold hover:bg-muted transition-colors">Back</button>
                    <button onClick={() => bookMutation.mutate()} disabled={bookMutation.isPending} className="flex-1 btn-search py-3 rounded-sm">
                      {bookMutation.isPending ? "Processing..." : `Pay $${totalPrice.toLocaleString()}`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="offer-card sticky top-4">
              <h3 className="font-heading font-bold text-primary mb-3">Booking Summary</h3>
              <img src={cruise.image_url || "/images/deals/caribbean.jpg"} alt={cruise.name} className="w-full h-32 object-cover rounded-sm mb-3" />
              <p className="text-xs text-ocean font-semibold">{cruise.cruise_lines?.name}</p>
              <p className="font-heading font-bold text-sm text-foreground mb-2">{cruise.name}</p>
              <div className="space-y-1 text-xs text-muted-foreground mb-3">
                <p>🚢 {cruise.ship_name}</p>
                <p>📅 {new Date(cruise.departure_date).toLocaleDateString()} - {new Date(cruise.return_date).toLocaleDateString()}</p>
                <p>📍 {cruise.departure_port} → {cruise.arrival_port}</p>
                <p>🛏️ {selectedCabin.name}</p>
                <p>👥 {numGuests} Guest{numGuests > 1 ? "s" : ""}</p>
              </div>
              <div className="border-t border-border pt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Cabin ({numGuests}x ${Math.round(selectedCabin.base_price_usd)})</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-green-deal">
                  <span>Taxes & fees</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl font-heading font-black text-primary">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
