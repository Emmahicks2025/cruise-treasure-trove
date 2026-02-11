import { useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCruiseBySlug, fetchCabinTypes, createBooking } from "@/lib/cruiseApi";
import {
  ArrowLeft, Anchor, Check, CreditCard, User, Ship, Wine, Wifi,
  Utensils, Globe, Camera, Heart, Package, Shield, MapPin, Calendar,
  Bed, Users, Maximize, Layers, Clock, Phone, Lock, Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

// Package add-ons available during booking
const availablePackages = [
  { id: "beverage", name: "All-Inclusive Beverage Package", icon: Wine, pricePerPersonPerDay: 89, desc: "Unlimited cocktails, wines, beer, specialty coffees, water & sodas" },
  { id: "wifi", name: "Wi-Fi Package", icon: Wifi, pricePerPersonPerDay: 19, desc: "High-speed internet access for all devices" },
  { id: "dining", name: "Specialty Dining (3 meals)", icon: Utensils, priceFlat: 49, desc: "3 visits to specialty restaurants with multi-course menus" },
  { id: "excursion", name: "Shore Excursion Credit ($150)", icon: Globe, priceFlatPerCabin: 150, desc: "$150 credit toward guided shore excursions" },
  { id: "photo", name: "Unlimited Photo Package", icon: Camera, priceFlatPerCabin: 199, desc: "All professional photos in digital format" },
  { id: "spa", name: "Spa & Wellness Package", icon: Heart, priceFlat: 299, desc: "2 spa treatments, thermal suite access, fitness classes" },
];

const insuranceOptions = [
  { id: "basic", name: "Basic Travel Protection", price: 79, desc: "Trip cancellation up to $5,000, medical up to $10,000, baggage $500", perPerson: true },
  { id: "premium", name: "Premium Travel Protection", price: 149, desc: "Cancel for any reason, medical up to $50,000, baggage $2,500, evacuation", perPerson: true },
  { id: "none", name: "No Insurance", price: 0, desc: "Decline travel protection (not recommended)", perPerson: false },
];

const categoryImages: Record<string, string> = {
  interior: "/images/destinations/river-cruises.jpg",
  ocean_view: "/images/destinations/north-europe.jpg",
  balcony: "/images/destinations/mediterranean.jpg",
  suite: "/images/destinations/bahamas.jpg",
  penthouse: "/images/deals/tahiti.jpg",
};

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
    dateOfBirth: "", nationality: "", passportNumber: "", emergencyContact: "", emergencyPhone: "",
  });
  const [guestDetails, setGuestDetails] = useState<Array<{ firstName: string; lastName: string; dateOfBirth: string }>>([
    { firstName: "", lastName: "", dateOfBirth: "" },
  ]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [insuranceId, setInsuranceId] = useState("none");
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "", billingAddress: "", city: "", state: "", zip: "", country: "US" });
  const [agreedTerms, setAgreedTerms] = useState(false);

  const { data: cruise } = useQuery({ queryKey: ["cruise", slug], queryFn: () => fetchCruiseBySlug(slug!), enabled: !!slug });
  const { data: cabins } = useQuery({ queryKey: ["cabins", cruise?.id], queryFn: () => fetchCabinTypes(cruise!.id), enabled: !!cruise?.id });

  const selectedCabin = cabins?.find((c) => c.id === cabinId);

  // Calculate total price
  const priceBreakdown = useMemo(() => {
    if (!selectedCabin || !cruise) return null;
    const cabinTotal = selectedCabin.base_price_usd * numGuests;
    const gratuities = 16 * cruise.duration_days * numGuests;
    let packagesTotal = 0;
    selectedPackages.forEach(pkgId => {
      const pkg = availablePackages.find(p => p.id === pkgId);
      if (!pkg) return;
      if (pkg.pricePerPersonPerDay) packagesTotal += pkg.pricePerPersonPerDay * cruise.duration_days * numGuests;
      else if (pkg.priceFlat) packagesTotal += pkg.priceFlat * numGuests;
      else if (pkg.priceFlatPerCabin) packagesTotal += pkg.priceFlatPerCabin;
    });
    const insurance = insuranceOptions.find(i => i.id === insuranceId);
    const insuranceTotal = insurance ? (insurance.perPerson ? insurance.price * numGuests : insurance.price) : 0;
    const subtotal = cabinTotal + gratuities + packagesTotal + insuranceTotal;
    const taxes = Math.round(subtotal * 0.05); // port fees/taxes
    const total = subtotal + taxes;
    return { cabinTotal, gratuities, packagesTotal, insuranceTotal, taxes, subtotal, total };
  }, [selectedCabin, cruise, numGuests, selectedPackages, insuranceId]);

  const bookMutation = useMutation({
    mutationFn: () => createBooking({
      cruise_id: cruise!.id,
      cabin_type_id: selectedCabin!.id,
      guest_first_name: form.firstName,
      guest_last_name: form.lastName,
      guest_email: form.email,
      guest_phone: form.phone || undefined,
      num_guests: numGuests,
      guest_details: guestDetails,
      total_price_usd: priceBreakdown?.total || 0,
      special_requests: form.specialRequests || undefined,
    }),
    onSuccess: (data) => navigate(`/confirmation/${data.booking_ref}`),
    onError: () => toast({ title: "Booking Failed", description: "Please check your details and try again.", variant: "destructive" }),
  });

  if (!cruise || !selectedCabin || !priceBreakdown) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar /><Header /><MainNav />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Anchor className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const togglePackage = (id: string) => {
    setSelectedPackages(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const updateGuestDetail = (idx: number, field: string, value: string) => {
    const updated = [...guestDetails];
    updated[idx] = { ...updated[idx], [field]: value };
    setGuestDetails(updated);
  };

  // Keep guest details array in sync with numGuests
  const syncGuestDetails = (count: number) => {
    setNumGuests(count);
    const updated = [...guestDetails];
    while (updated.length < count - 1) updated.push({ firstName: "", lastName: "", dateOfBirth: "" });
    setGuestDetails(updated.slice(0, Math.max(count - 1, 0)));
  };

  const steps = [
    { n: 1, label: "Guest Details", icon: User },
    { n: 2, label: "Packages", icon: Package },
    { n: 3, label: "Payment", icon: CreditCard },
    { n: 4, label: "Confirm", icon: Check },
  ];

  const validateStep1 = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      toast({ title: "Required fields", description: "Please fill in all required fields", variant: "destructive" });
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar /><Header /><MainNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary text-sm mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to cruise
        </button>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {steps.map(({ n, label, icon: Icon }) => (
            <div key={n} className="flex items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {step > n ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step >= n ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              {n < 4 && <div className={`w-8 md:w-16 h-0.5 ${step > n ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2 space-y-6">

            {/* STEP 1: Guest Details */}
            {step === 1 && (
              <>
                {/* Selected cabin summary */}
                <div className="offer-card">
                  <h3 className="font-heading font-bold text-primary mb-3 flex items-center gap-2">
                    <Bed className="w-5 h-5" /> Selected Stateroom
                  </h3>
                  <div className="flex gap-4">
                    <img
                      src={selectedCabin.image_url || categoryImages[selectedCabin.category] || "/images/destinations/bahamas.jpg"}
                      alt={selectedCabin.name}
                      className="w-32 h-24 object-cover rounded-sm shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{selectedCabin.name}</h4>
                      <p className="text-xs text-primary font-semibold capitalize">{selectedCabin.category.replace("_", " ")}</p>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Maximize className="w-3 h-3" /> {selectedCabin.size_sqft} sq ft</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Bed className="w-3 h-3" /> {selectedCabin.beds}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> Up to {selectedCabin.max_occupancy} guests</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Layers className="w-3 h-3" /> {selectedCabin.deck}</p>
                      </div>
                      {selectedCabin.amenities && selectedCabin.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedCabin.amenities.slice(0, 4).map(a => (
                            <span key={a} className="bg-muted text-[10px] px-1.5 py-0.5 rounded-sm text-foreground">{a}</span>
                          ))}
                          {selectedCabin.amenities.length > 4 && <span className="text-[10px] text-primary">+{selectedCabin.amenities.length - 4} more</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary guest */}
                <div className="offer-card">
                  <h2 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" /> Primary Guest (Lead Traveler)
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">First Name *</label>
                        <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Last Name *</label>
                        <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Email *</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Phone</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Date of Birth</label>
                        <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Nationality</label>
                        <input type="text" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} placeholder="e.g. United States" className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Passport Number</label>
                        <input type="text" value={form.passportNumber} onChange={(e) => setForm({ ...form, passportNumber: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Number of Guests</label>
                        <select value={numGuests} onChange={(e) => syncGuestDetails(Number(e.target.value))} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background">
                          {Array.from({ length: selectedCabin.max_occupancy }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional guests */}
                {numGuests > 1 && (
                  <div className="offer-card">
                    <h3 className="font-heading font-bold text-primary mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" /> Additional Guests
                    </h3>
                    {guestDetails.map((guest, i) => (
                      <div key={i} className="mb-4 pb-4 border-b border-border last:border-0 last:mb-0 last:pb-0">
                        <p className="text-sm font-semibold text-foreground mb-2">Guest {i + 2}</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">First Name</label>
                            <input type="text" value={guest.firstName} onChange={(e) => updateGuestDetail(i, "firstName", e.target.value)} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Last Name</label>
                            <input type="text" value={guest.lastName} onChange={(e) => updateGuestDetail(i, "lastName", e.target.value)} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Date of Birth</label>
                            <input type="date" value={guest.dateOfBirth} onChange={(e) => updateGuestDetail(i, "dateOfBirth", e.target.value)} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Emergency contact */}
                <div className="offer-card">
                  <h3 className="font-heading font-bold text-foreground mb-3">Emergency Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Contact Name</label>
                      <input type="text" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Contact Phone</label>
                      <input type="tel" value={form.emergencyPhone} onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                    </div>
                  </div>
                </div>

                {/* Special requests */}
                <div className="offer-card">
                  <h3 className="font-heading font-bold text-foreground mb-3">Special Requests</h3>
                  <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" rows={3} placeholder="Dietary needs, celebrations, accessibility requirements, bed configuration preferences..." />
                </div>

                <button onClick={() => validateStep1() && setStep(2)} className="btn-search w-full py-3 rounded-sm text-sm font-bold">
                  Continue to Packages →
                </button>
              </>
            )}

            {/* STEP 2: Packages & Insurance */}
            {step === 2 && (
              <>
                <div className="offer-card">
                  <h2 className="font-heading font-bold text-primary text-lg mb-2 flex items-center gap-2">
                    <Package className="w-5 h-5" /> Enhance Your Cruise
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">Pre-purchase packages at discounted rates — save up to 30% vs. buying onboard.</p>
                  <div className="space-y-3">
                    {availablePackages.map((pkg) => {
                      const Icon = pkg.icon;
                      const isSelected = selectedPackages.includes(pkg.id);
                      let pkgPrice = 0;
                      if (pkg.pricePerPersonPerDay) pkgPrice = pkg.pricePerPersonPerDay * cruise.duration_days * numGuests;
                      else if (pkg.priceFlat) pkgPrice = pkg.priceFlat * numGuests;
                      else if (pkg.priceFlatPerCabin) pkgPrice = pkg.priceFlatPerCabin;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => togglePackage(pkg.id)}
                          className={`p-4 rounded-sm border-2 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                              {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-5 h-5 text-primary" />
                                  <h4 className="font-semibold text-sm text-foreground">{pkg.name}</h4>
                                </div>
                                <p className="font-heading font-bold text-primary">${pkgPrice}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{pkg.desc}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {pkg.pricePerPersonPerDay && `$${pkg.pricePerPersonPerDay}/person/day × ${cruise.duration_days} nights × ${numGuests} guests`}
                                {pkg.priceFlat && `$${pkg.priceFlat}/person × ${numGuests} guests`}
                                {pkg.priceFlatPerCabin && `$${pkg.priceFlatPerCabin} per cabin`}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Travel Insurance */}
                <div className="offer-card">
                  <h3 className="font-heading font-bold text-primary mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Travel Protection
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">Protect your vacation investment with comprehensive travel insurance.</p>
                  <div className="space-y-3">
                    {insuranceOptions.map((opt) => {
                      const isSelected = insuranceId === opt.id;
                      const optPrice = opt.perPerson ? opt.price * numGuests : opt.price;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setInsuranceId(opt.id)}
                          className={`p-4 rounded-sm border-2 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "border-primary" : "border-muted-foreground"}`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm text-foreground">{opt.name}</h4>
                                <p className="font-heading font-bold text-primary">{optPrice > 0 ? `$${optPrice}` : "Free"}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                              {opt.perPerson && opt.price > 0 && <p className="text-[10px] text-muted-foreground">${opt.price}/person × {numGuests} guests</p>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-border py-3 rounded-sm text-sm font-semibold hover:bg-muted transition-colors">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 btn-search py-3 rounded-sm text-sm font-bold">Continue to Payment →</button>
                </div>
              </>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <>
                <div className="offer-card">
                  <h2 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Payment Details (Demo)
                  </h2>
                  <div className="bg-muted p-3 rounded-sm mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-deal" />
                    <p className="text-xs text-muted-foreground">🔒 This is a demo checkout. No real payment will be processed. Your data is secure.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Card Number</label>
                      <input type="text" value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} placeholder="4242 4242 4242 4242" className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Expiry</label>
                        <input type="text" value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} placeholder="MM/YY" className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">CVV</label>
                        <input type="text" value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })} placeholder="123" className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">Name on Card</label>
                        <input type="text" value={cardForm.name} onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground text-sm pt-2">Billing Address</h3>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Street Address</label>
                      <input type="text" value={cardForm.billingAddress} onChange={(e) => setCardForm({ ...cardForm, billingAddress: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">City</label>
                        <input type="text" value={cardForm.city} onChange={(e) => setCardForm({ ...cardForm, city: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">State</label>
                        <input type="text" value={cardForm.state} onChange={(e) => setCardForm({ ...cardForm, state: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">ZIP Code</label>
                        <input type="text" value={cardForm.zip} onChange={(e) => setCardForm({ ...cardForm, zip: e.target.value })} className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-background" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="offer-card">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="mt-0.5 accent-primary" />
                    <p className="text-xs text-muted-foreground">
                      I agree to the <span className="text-primary font-semibold">Terms & Conditions</span>, <span className="text-primary font-semibold">Cancellation Policy</span>, 
                      and <span className="text-primary font-semibold">Privacy Policy</span>. I confirm that all guest information provided is accurate 
                      and matches travel documents. I understand that this is a demo booking and no actual charges will be made.
                    </p>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 border border-border py-3 rounded-sm text-sm font-semibold hover:bg-muted transition-colors">← Back</button>
                  <button
                    onClick={() => bookMutation.mutate()}
                    disabled={bookMutation.isPending || !agreedTerms}
                    className="flex-1 btn-search py-3 rounded-sm text-sm font-bold disabled:opacity-50"
                  >
                    {bookMutation.isPending ? "Processing..." : `Complete Booking — $${priceBreakdown.total.toLocaleString()}`}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-4 space-y-4">
              {/* Cruise summary */}
              <div className="offer-card">
                <h3 className="font-heading font-bold text-primary mb-3 flex items-center gap-2">
                  <Ship className="w-5 h-5" /> Booking Summary
                </h3>
                <img src={cruise.image_url || "/images/deals/caribbean.jpg"} alt={cruise.name} className="w-full h-32 object-cover rounded-sm mb-3" />
                <p className="text-xs text-ocean font-semibold">{cruise.cruise_lines?.name}</p>
                <p className="font-heading font-bold text-sm text-foreground mb-2">{cruise.name}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <p className="flex items-center gap-1.5"><Ship className="w-3.5 h-3.5" /> {cruise.ship_name}</p>
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(cruise.departure_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {new Date(cruise.return_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {cruise.duration_days} Nights</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {cruise.departure_port} → {cruise.arrival_port}</p>
                </div>

                {/* Cabin details */}
                <div className="border-t border-border pt-3 mb-3">
                  <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {selectedCabin.name}</p>
                  <p className="text-[10px] text-muted-foreground">{selectedCabin.size_sqft} sq ft • {selectedCabin.deck} • {selectedCabin.beds}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> {numGuests} Guest{numGuests > 1 ? "s" : ""}</p>
                </div>

                {/* Price breakdown */}
                <div className="border-t border-border pt-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Cabin ({numGuests}× ${Math.round(selectedCabin.base_price_usd)})</span>
                    <span className="text-foreground">${priceBreakdown.cabinTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Gratuities ({numGuests}× $16/day × {cruise.duration_days})</span>
                    <span className="text-foreground">${priceBreakdown.gratuities}</span>
                  </div>
                  {priceBreakdown.packagesTotal > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Add-on Packages ({selectedPackages.length})</span>
                      <span className="text-foreground">${priceBreakdown.packagesTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedPackages.map(pkgId => {
                    const pkg = availablePackages.find(p => p.id === pkgId);
                    if (!pkg) return null;
                    let p = 0;
                    if (pkg.pricePerPersonPerDay) p = pkg.pricePerPersonPerDay * cruise.duration_days * numGuests;
                    else if (pkg.priceFlat) p = pkg.priceFlat * numGuests;
                    else if (pkg.priceFlatPerCabin) p = pkg.priceFlatPerCabin;
                    return (
                      <div key={pkgId} className="flex justify-between text-[10px] pl-3">
                        <span className="text-muted-foreground">└ {pkg.name}</span>
                        <span className="text-muted-foreground">${p}</span>
                      </div>
                    );
                  })}
                  {priceBreakdown.insuranceTotal > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Travel Insurance</span>
                      <span className="text-foreground">${priceBreakdown.insuranceTotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Taxes & Port Fees</span>
                    <span className="text-foreground">${priceBreakdown.taxes}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-2xl font-heading font-black text-primary">${priceBreakdown.total.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center">All prices in USD</p>
                </div>
              </div>

              {/* Help box */}
              <div className="offer-card text-center">
                <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold text-foreground">Need Help?</p>
                <p className="text-xs text-muted-foreground mb-2">Our cruise experts are available 24/7</p>
                <a href="tel:888-333-3116" className="text-primary font-heading font-bold text-lg hover:underline">888-333-3116</a>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secured</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Price Match</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 4.9/5 Rated</span>
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
