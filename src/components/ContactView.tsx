/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Landmark, Send, CheckCircle } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please populate the required fields first.");
      return;
    }
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      alert("✉️ Query Logged: Your counseling request has been synchronized with the HOD desk! We will coordinate with you shortly.");
    }, 1200);
  };

  const centers = [
    { city: 'New Delhi (Main Branch)', address: 'Building 12, Kalu Sarai, Near IIT Delhi Metro, New Delhi - 110016', phone: '+91-11-26993123' },
    { city: 'Kanpur Center', address: 'Plot 4, Kalyanpur, Opposite IIT Kalyanpur Gate, Kanpur - 208016', phone: '+91-512-2593452' },
    { city: 'Kharagpur Technical Hub', address: 'Premises 7, IIT Extension, Paschim Medinipur, Kharagpur - 721302', phone: '+91-3222-282124' }
  ];

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 [content-visibility:auto]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded border border-cyan-500/20 font-bold">
            Connect
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-2">
            Reach Out to Quantrex HOD Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Have queries regarding fee payments, scheduling, or DRM content access? Drop a message directly to Director HOD Ajay Kumar.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 p-3 rounded border border-slate-850 font-mono text-xs text-slate-400">
          <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>support@quantrex.edu</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Enquiry form */}
        <div className="flex-1 bg-slate-900 border border-slate-850 p-6 rounded-xl space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider block">
              ✉️ Student Counseling Enquiry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Submit details below. Recommended for aspirants aiming for JEE 2026/2027.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-404 text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ajay Kumar Saroj"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-404 text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Coordinates *
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-404 text-slate-400 uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9901-23410"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-404 text-slate-400 uppercase tracking-wider mb-1.5">
                Query details *
              </label>
              <textarea
                rows={4}
                placeholder="Please highlight your current JEE Mathematics target goals or syllabus doubts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-205 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSent}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 font-bold text-slate-100 rounded text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isSent ? (
                <span>Logging counseling receipt token...</span>
              ) : (
                <>
                  <span>Log Enrollment Request</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Physical Campus Address blocks */}
        <div className="w-full lg:w-96 space-y-6">
          <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider block">
            📍 Quantrex Regional Offices
          </h3>

          <div className="space-y-4">
            {centers.map((c, i) => (
              <div key={i} className="bg-slate-900 border border-slate-855 rounded-xl p-5 space-y-3 [content-visibility:auto]">
                <div className="flex items-center gap-2 text-cyan-405 text-cyan-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-xs">{c.city}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{c.address}</p>
                <p className="text-[11px] font-mono text-slate-500">Phone: {c.phone}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
