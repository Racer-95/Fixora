import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CreditCard, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const STEPS = ['Schedule', 'Details', 'Payment'];

const BookingFlowPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
          <h1 className="text-4xl font-black text-ink-1 mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-ink-2 mb-10 leading-relaxed">
            Your service has been scheduled successfully. You'll receive a confirmation email shortly with the expert details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">View Dashboard</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-line -z-10 -translate-y-1/2"></div>
          {STEPS.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                  i <= currentStep ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-white border-2 border-line text-ink-2'
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Wizard */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-8 rounded-[2.5rem] shadow-premium"
              >
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <Calendar className="text-brand-500" />
                      Select Date & Time
                    </h2>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {['Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19'].map((date) => (
                        <button 
                          key={date} 
                          className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                            date === 'Apr 14' ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-line text-ink-2 hover:border-brand-200'
                          }`}
                        >
                          <div className="text-xs uppercase opacity-60 mb-1">Tue</div>
                          {date}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((time) => (
                        <button 
                          key={time} 
                          className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all ${
                            time === '11:00 AM' ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-line text-ink-2 hover:border-brand-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <MapPin className="text-brand-500" />
                      Service Details
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-black text-ink-2 uppercase tracking-wider mb-2">Service Address</label>
                        <textarea 
                          className="w-full p-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold"
                          rows={3}
                          placeholder="Enter your detailed address here..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-ink-2 uppercase tracking-wider mb-2">Additional Notes</label>
                        <textarea 
                          className="w-full p-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold"
                          rows={2}
                          placeholder="Any specific instructions for the pro?"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-black text-ink-1 mb-8 flex items-center gap-3">
                      <CreditCard className="text-brand-500" />
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      {['Credit / Debit Card', 'UPI / Apple Pay', 'Cash after service'].map((method) => (
                        <button 
                          key={method} 
                          className={`w-full p-6 rounded-2xl border-2 text-left font-bold flex items-center justify-between transition-all ${
                            method === 'Credit / Debit Card' ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-line text-ink-2 hover:border-brand-200'
                          }`}
                        >
                          {method}
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'Credit / Debit Card' ? 'border-brand-500 bg-brand-500' : 'border-line'}`}>
                            {method === 'Credit / Debit Card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 flex gap-4">
                  {currentStep > 0 && (
                    <Button variant="secondary" size="lg" className="flex-1" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  <Button variant="primary" size="lg" className="flex-1 shadow-brand-500/30" onClick={nextStep}>
                    {currentStep === STEPS.length - 1 ? 'Confirm & Book' : 'Continue'}
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-[2.5rem] bg-brand-50/30">
              <h3 className="text-xl font-black text-ink-1 mb-6">Order Summary</h3>
              <div className="flex gap-4 mb-6 pb-6 border-b border-line">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200" 
                  alt="Service" 
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-ink-1">Deep Cleaning</h4>
                  <div className="text-sm text-ink-2 font-medium">Home & Living</div>
                  <div className="text-brand-600 font-bold mt-1">$85.00</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-medium text-ink-2">
                  <span>Service Fee</span>
                  <span>$85.00</span>
                </div>
                <div className="flex justify-between font-medium text-ink-2">
                  <span>Booking Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-medium text-ink-2">
                  <span>Tax</span>
                  <span>$2.50</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-line pt-6">
                <div>
                  <div className="text-sm font-black text-ink-2 uppercase tracking-wider mb-1">Total</div>
                  <div className="text-3xl font-black text-brand-600">$92.50</div>
                </div>
                <div className="mb-1">
                  <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-black">SAVE10 ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlowPage;
