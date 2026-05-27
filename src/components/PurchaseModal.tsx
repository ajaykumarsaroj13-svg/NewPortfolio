/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, Landmark, Check, Gift, ArrowRight, X, ShieldCheck, QrCode } from 'lucide-react';
import { Course } from '../types';

interface PurchaseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (courseId: string) => void;
}

export default function PurchaseModal({ course, isOpen, onClose, onPaymentSuccess }: PurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  
  // Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  
  // UPI states
  const [upiId, setUpiId] = useState('');
  
  // Coupon Code
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'checkout' | 'complete'>('checkout');

  if (!isOpen || !course) return null;

  const basePrice = course.fee;
  const gstAmount = Math.round(basePrice * 0.18);
  const promoDiscount = couponApplied ? discount : 0;
  const grandTotal = basePrice + gstAmount - promoDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'RANKBOOST' || coupon.toUpperCase() === 'JEE100') {
      setDiscount(500);
      setCouponApplied(true);
    } else if (coupon.toUpperCase() === 'FIRST10') {
      setDiscount(Math.round(basePrice * 0.10));
      setCouponApplied(true);
    } else {
      alert('Invalid coupon! Try RANKBOOST or FIRST10');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('complete');
      onPaymentSuccess(course.id);
    }, 1800);
  };

  return (
    <div id="purchase-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div id="purchase-modal-content" className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Side: Order breakdown */}
        <div className="w-full md:w-5/12 bg-slate-950 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-805">
          <div>
            <div className="flex items-center justify-between mb-6 [content-visibility:auto]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                Enrollment Invoice
              </span>
              <button 
                id="close-purchase-modal-left" 
                onClick={onClose}
                className="md:hidden text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mt-4">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                {course.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-100 leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400">
                Authorized Study Duration: {course.durationMonths} Months Syllabus Cycle.
              </p>
            </div>

            <div className="mt-8 space-y-3.5 border-t border-slate-800 pt-6">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Base Tuition Fee</span>
                <span className="font-mono text-slate-200">₹{basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>GST (18% Govt. Standard)</span>
                <span className="font-mono text-slate-200">+₹{gstAmount.toLocaleString()}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-xs text-emerald-400 font-medium">
                  <span>Coupon Discount Applied</span>
                  <span className="font-mono">-₹{promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-slate-100 border-t border-slate-800 pt-3.5">
                <span>Grand Total</span>
                <span className="font-mono text-cyan-400">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-3 bg-slate-900 border border-slate-800 rounded flex gap-3 text-[11px] text-slate-400 font-mono items-start">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300">Quantrex Secure Gateway</p>
              <p>256-bit encryption. Immediate study materials unlock upon authorization.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form / Confirmation */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
          <div className="hidden md:flex justify-end mb-4 [content-visibility:auto]">
            <button 
              id="close-purchase-modal-right" 
              onClick={onClose}
              className="text-slate-405 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'checkout' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  1. Apply Voucher Note
                </h4>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon: RANKBOOST or FIRST10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                    disabled={couponApplied}
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-950 rounded text-xs font-semibold text-slate-200 border border-slate-700 transition"
                    disabled={couponApplied}
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Promotion applied successfully! You saved ₹{promoDiscount}!
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  2. Select Authorized Gateway Option
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition ${paymentMethod === 'card' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition ${paymentMethod === 'upi' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI/Scan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2 px-3 rounded border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition ${paymentMethod === 'netbanking' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Sub-form */}
              <form onSubmit={handleCheckout} className="space-y-4">
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4532 9901 2341 0087"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        maxLength={19}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          maxLength={3}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="AJAY KUMAR SAROJ"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 uppercase"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-3.5 bg-slate-955 p-4 rounded-lg border border-slate-800 flex flex-col items-center">
                    <div className="p-3 bg-slate-100 rounded-lg">
                      {/* Fake QR code using basic ASCII/Styling layout, perfectly mockable */}
                      <div className="w-32 h-32 bg-slate-300 flex items-center justify-center relative">
                        <span className="text-[10px] text-slate-800 text-center font-mono font-bold leading-normal">
                          [ QUANTREX <br/>PAY QR CODE <br/> ₹{grandTotal} ]
                        </span>
                        <div className="absolute top-1 left-1 w-2 h-2 bg-black"></div>
                        <div className="absolute top-1 right-1 w-2 h-2 bg-black"></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 bg-black"></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono text-center">
                      Scan the Unified QR using BHIM, GPay, PhonePe, or Paytm.<br/> Or enter virtual payment address below:
                    </p>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="ajay@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono text-center"
                        required={paymentMethod === 'upi'}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Recognized Banking Partner
                    </label>
                    <select 
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                      defaultValue="sbi"
                    >
                      <option value="sbi">State Bank of India (SBI)</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                    <p className="text-[11px] text-slate-400">
                      You will be re-routed to your respective banking page for transaction token approval.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-100 font-bold py-2.5 rounded text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Decrypting & Securing Transaction...
                    </span>
                  ) : (
                    <>
                      <span>Authorize Payment - ₹{grandTotal.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2.5">
                <Check className="w-8 h-8 font-extrabold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Admission Process Cleared!</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  We received ₹{grandTotal.toLocaleString()} towards <strong>{course.title}</strong>. Welcome to cohort 2026.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800 text-left font-mono text-[10px] text-slate-400 space-y-1.5 w-full">
                <div className="flex justify-between">
                  <span>Receipt Token:</span>
                  <span className="text-emerald-400 uppercase">TXN-QTX-{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class Code:</span>
                  <span className="text-slate-200">MTH-{course.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Grant:</span>
                  <span className="text-slate-200">Full PDFs & Anti-Download Video Stream</span>
                </div>
              </div>
              <button
                id="continue-to-portal-button"
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 font-bold rounded text-xs text-slate-100 cursor-pointer transition shadow-lg"
              >
                Launch Learning Portal
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
