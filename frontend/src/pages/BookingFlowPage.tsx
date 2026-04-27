import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, CreditCard, ChevronRight, CheckCircle2, MapPin,
  Loader2, Clock, AlertCircle, Smartphone, Banknote
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

// ── Step definitions ────────────────────────────────────────────
const STEPS = ['Schedule', 'Details', 'Payment'];

// Generate next 7 days dynamically
function getNextDays(count: number) {
  const days: { label: string; dayName: string; iso: string }[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      iso: d.toISOString().split('T')[0]!,
    });
  }
  return days;
}

const TIME_SLOTS = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

const PAYMENT_METHODS = [
  { id: 'card',    label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi',     label: 'UPI',                 icon: Smartphone },
  { id: 'cash',    label: 'Cash after service',   icon: Banknote  },
];

// ── Component ───────────────────────────────────────────────────
const BookingFlowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Service data
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Step state
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const DAYS = getNextDays(7);
  const [selectedDay, setSelectedDay]  = useState(DAYS[0]!.iso);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]!);
  const [address, setAddress]          = useState('');
  const [notes, setNotes]              = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  // Fetch service
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        if (res.data.success) setService(res.data.data);
        else setError('Service not found.');
      } catch {
        setError('Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  // ── Navigation ──────────────────────────────────────────────
  const validateCurrentStep = (): string | null => {
    if (currentStep === 0 && (!selectedDay || !selectedTime)) return 'Please select a date and time.';
    if (currentStep === 1 && !address.trim()) return 'Please enter your service address.';
    return null;
  };

  const nextStep = async () => {
    setError(null);
    const validationErr = validateCurrentStep();
    if (validationErr) { setError(validationErr); return; }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
      return;
    }

    // Final step — submit booking
    setIsSubmitting(true);
    try {
      // Build ISO scheduledTime from selected day + time
      const [hourMinPeriod] = selectedTime.split(' ');
      const [hourStr, minStr] = (hourMinPeriod ?? '').split(':');
      let hour = parseInt(hourStr ?? '9', 10);
      const min = parseInt(minStr ?? '0', 10);
      if (selectedTime.includes('PM') && hour !== 12) hour += 12;
      if (selectedTime.includes('AM') && hour === 12) hour = 0;
      const scheduledDate = new Date(`${selectedDay}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`);

      const providerId =
        typeof service.providerId === 'object' && service.providerId
          ? service.providerId._id
          : service.providerId;

      // Guard: service has no provider assigned
      if (!providerId) {
        setError('This service has no provider assigned yet and cannot be booked. Please choose another service.');
        setIsSubmitting(false);
        return;
      }

      const res = await api.post('/bookings', {
        providerId,
        serviceId: service._id,
        scheduledTime: scheduledDate.toISOString(),
      });

      if (res.data.success) {
        setBookingId(res.data.data._id ?? null);
        setIsCompleted(true);
      } else {
        setError(res.data.error || res.data.message || 'Booking failed. Please try again.');
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Booking failed. Please try again.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(s => Math.max(0, s - 1));
  };

  // ── Screens ─────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-brand-500" />
      </div>
    );
  }

  if (!service && !loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center glass-panel p-12 rounded-3xl max-w-md">
          <h2 className="text-2xl font-black text-ink-1 mb-3">Service Not Found</h2>
          <p className="text-ink-2 mb-6">The service you are trying to book does not exist.</p>
          <Link to="/services"><Button variant="primary" size="lg">Browse Services</Button></Link>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-[3rem] text-center max-w-xl shadow-premium"
        >
          <div className="w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-brand-500/40">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-black text-ink-1 mb-3">Booking Confirmed!</h1>
          {bookingId && (
            <p className="text-xs font-mono text-ink-2 mb-4 bg-surface-muted px-3 py-1 rounded-lg inline-block">
              #{bookingId}
            </p>
          )}
          <p className="text-lg text-ink-2 mb-4 leading-relaxed">
            Your <span className="font-bold text-ink-1">{service.name}</span> has been scheduled for{' '}
            <span className="font-bold text-ink-1">
              {DAYS.find(d => d.iso === selectedDay)?.label} at {selectedTime}
            </span>.
          </p>
          <p className="text-sm text-ink-2 mb-10">
            The provider will confirm shortly. You can track your booking from the dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">View Dashboard</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Book Another</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main Wizard ─────────────────────────────────────────────
  const categoryImages: Record<string, string> = {
    Cleaning:   'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200',
    Electrical: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200',
    Plumbing:   'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=200',
    Painting:   'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=200',
    Gardening:  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=200',
    Repair:     'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=200',
    Barber:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200',
    Beauty:     'https://images.unsplash.com/photo-1560066984-138daaa4e5d7?auto=format&fit=crop&q=80&w=200',
  };
  const serviceImg = service.imageUrl || categoryImages[service.category] || categoryImages['Repair'];

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-line -z-10" />
          {STEPS.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                  i < currentStep
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : i === currentStep
                    ? 'bg-brand-500 text-white ring-4 ring-brand-500/20 shadow-lg shadow-brand-500/30'
                    : 'bg-white border-2 border-line text-ink-2'
                }`}
              >
                {i < currentStep ? <CheckCircle2 size={20} /> : i + 1}
              </div>
              <span className={`text-sm font-black ${i <= currentStep ? 'text-brand-600' : 'text-ink-2'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-bold"
          >
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Wizard Panel ── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-8 rounded-[2.5rem] shadow-premium"
              >

                {/* ── Step 0: Schedule ── */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <Calendar className="text-brand-500" /> Select Date & Time
                    </h2>

                    {/* Date picker */}
                    <p className="text-xs font-black uppercase tracking-wider text-ink-2 mb-3">Choose a Date</p>
                    <div className="grid grid-cols-4 gap-2 mb-8">
                      {DAYS.map(day => (
                        <button
                          key={day.iso}
                          onClick={() => setSelectedDay(day.iso)}
                          className={`p-3 rounded-2xl border-2 transition-all font-bold text-center ${
                            selectedDay === day.iso
                              ? 'bg-brand-50 border-brand-500 text-brand-600'
                              : 'bg-white border-line text-ink-2 hover:border-brand-200'
                          }`}
                        >
                          <div className="text-xs uppercase opacity-60 mb-1">{day.dayName}</div>
                          <div className="text-sm">{day.label}</div>
                        </button>
                      ))}
                    </div>

                    {/* Time slots */}
                    <p className="text-xs font-black uppercase tracking-wider text-ink-2 mb-3">Choose a Time</p>
                    <div className="grid grid-cols-2 gap-3">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-4 rounded-2xl border-2 text-left font-bold flex items-center gap-3 transition-all ${
                            selectedTime === time
                              ? 'bg-brand-50 border-brand-500 text-brand-600'
                              : 'bg-white border-line text-ink-2 hover:border-brand-200'
                          }`}
                        >
                          <Clock size={16} className="shrink-0" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 1: Details ── */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <MapPin className="text-brand-500" /> Service Details
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-black text-ink-2 uppercase tracking-wider mb-2">
                          Service Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          className="w-full p-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-ink-1 resize-none"
                          rows={3}
                          placeholder="Enter your complete address (house no., street, city, pincode)..."
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-ink-2 uppercase tracking-wider mb-2">
                          Additional Notes <span className="text-ink-2 normal-case font-medium">(optional)</span>
                        </label>
                        <textarea
                          className="w-full p-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium text-ink-1 resize-none"
                          rows={3}
                          placeholder="Any specific instructions for the professional? (e.g., bring own tools, prefer female provider, etc.)"
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Payment ── */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <CreditCard className="text-brand-500" /> Payment Method
                    </h2>
                    <div className="space-y-4">
                      {PAYMENT_METHODS.map(method => {
                        const Icon = method.icon;
                        const isSelected = paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`w-full p-5 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-brand-50 border-brand-500 text-brand-600'
                                : 'bg-white border-line text-ink-2 hover:border-brand-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-brand-500 text-white' : 'bg-surface-muted text-ink-2'}`}>
                                <Icon size={18} />
                              </div>
                              {method.label}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-brand-500 bg-brand-500' : 'border-line'}`}>
                              {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {paymentMethod === 'cash' && (
                      <p className="mt-4 text-sm text-ink-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                        💡 You'll pay ₹{service.basePrice} in cash directly to the provider after service completion.
                      </p>
                    )}
                    {paymentMethod !== 'cash' && (
                      <p className="mt-4 text-sm text-ink-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                        🔒 Payment of ₹{service.basePrice} will be processed securely at the time of booking.
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-10 flex gap-4">
                  {currentStep > 0 && (
                    <Button variant="secondary" size="lg" className="flex-1" onClick={prevStep} disabled={isSubmitting}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 shadow-brand-500/30"
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 size={18} className="mr-2 animate-spin" /> Processing...</>
                    ) : currentStep === STEPS.length - 1 ? (
                      <>Confirm & Book <CheckCircle2 size={18} className="ml-2" /></>
                    ) : (
                      <>Continue <ChevronRight size={18} className="ml-2" /></>
                    )}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-[2.5rem] bg-brand-50/30 sticky top-28">
              <h3 className="text-xl font-black text-ink-1 mb-6">Order Summary</h3>

              {/* Service card */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-line">
                <img
                  src={serviceImg}
                  alt={service.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-ink-1 leading-tight">{service.name}</h4>
                  <div className="text-sm text-ink-2 font-medium mt-1">{service.category}</div>
                  <div className="text-brand-600 font-black mt-1">₹{service.basePrice}</div>
                </div>
              </div>

              {/* Selected date/time (shown after step 0) */}
              {selectedDay && selectedTime && (
                <div className="mb-4 p-3 bg-white border border-line rounded-xl text-sm">
                  <div className="font-black text-ink-2 text-xs uppercase tracking-wider mb-1">Scheduled</div>
                  <div className="font-bold text-ink-1">
                    {DAYS.find(d => d.iso === selectedDay)?.label} · {selectedTime}
                  </div>
                </div>
              )}

              {/* Address (shown after step 1) */}
              {address.trim() && (
                <div className="mb-4 p-3 bg-white border border-line rounded-xl text-sm">
                  <div className="font-black text-ink-2 text-xs uppercase tracking-wider mb-1">Address</div>
                  <div className="font-bold text-ink-1 line-clamp-2">{address}</div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-medium text-ink-2">
                  <span>Service Fee</span>
                  <span>₹{service.basePrice}</span>
                </div>
                <div className="flex justify-between font-medium text-ink-2">
                  <span>Platform Fee</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-line pt-5">
                <div>
                  <div className="text-sm font-black text-ink-2 uppercase tracking-wider mb-1">Total</div>
                  <div className="text-3xl font-black text-brand-600">₹{service.basePrice}</div>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlowPage;
