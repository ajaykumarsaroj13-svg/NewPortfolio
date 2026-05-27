/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, User as UserIcon, ShieldAlert, LogOut, Menu, X, Landmark, Compass, Award } from 'lucide-react';
import { User } from '../types';
import QuantrexLogo from './QuantrexLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  onLoginOpen: () => void;
}

export default function Navbar({ activeTab, setActiveTab, currentUser, onLogout, onLoginOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'syllabus', label: 'Syllabus Timeline' },
    { id: 'test-series', label: 'Test Series & Quizzes' },
    { id: 'test-history', label: 'My Test History', authRequired: true },
    { id: 'contact', label: 'Contact Us' },
    { id: 'admin', label: 'Admin Faculty', adminOnly: true },
  ];

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly) {
      return currentUser?.role === 'admin';
    }
    if (item.authRequired) {
      return currentUser && currentUser.role === 'student';
    }
    return true;
  });

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav id="academy-navbar" className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-805 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              {/* Photo Image Logo representation with high-fidelity fallback */}
              <div className="relative w-12 h-12 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center bg-slate-950 shrink-0 p-0.5 shadow-md">
                <img 
                  src="/image.png" 
                  alt="Quantrex Logo" 
                  className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('navbar-logo-fallback');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div 
                  id="navbar-logo-fallback" 
                  className="hidden w-full h-full"
                >
                  <QuantrexLogo className="w-full h-full" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm tracking-widest text-slate-100 uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-200 leading-none">
                  QUANTREX
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold mt-0.5">
                  ACADEMY
                </span>
              </div>
            </div>
            
            {/* Elegant Tagline for Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-805 rounded-full text-[10px] font-mono text-slate-405 leading-none">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>MATH PEDAGOGY FOR IIT-JEE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {filteredItems.map(item => (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer tracking-wide duration-150 ${activeTab === item.id ? 'bg-slate-900 text-cyan-300 border border-slate-800' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth State Panel */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold text-slate-205 truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-mono leading-none tracking-wider uppercase text-slate-400 flex items-center gap-1">
                    {currentUser.role === 'admin' ? (
                      <span className="text-rose-400 font-bold shrink-0">★ FACULTY</span>
                    ) : (
                      <span className="text-cyan-400 shrink-0">🎓 STUDENT</span>
                    )}
                  </span>
                </div>
                
                <button
                  id="navbar-logout-button"
                  onClick={onLogout}
                  title="Logout Session"
                  className="p-1 px-2 hover:bg-slate-800 rounded duration-150 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                </button>
              </div>
            ) : (
              <button
                id="navbar-login-button"
                onClick={onLoginOpen}
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 font-bold rounded text-xs text-slate-100 cursor-pointer shadow-md transition duration-150"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <span className="text-[10px] bg-slate-900 px-2 py-1 rounded font-bold border border-slate-800 text-cyan-300 truncate max-w-[80px]">
                {currentUser.name.split(' ')[0]}
              </span>
            )}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-905 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-3 space-y-2 select-none [content-visibility:auto]">
          {filteredItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold block ${activeTab === item.id ? 'bg-slate-900 text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-slate-850 pt-3 flex items-center justify-between">
            {currentUser ? (
              <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="text-slate-200">Session: {currentUser.email}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-400 font-bold flex items-center gap-1"
                >
                  Logout <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLoginOpen();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-slate-900 border border-slate-800 text-center font-bold text-slate-200 rounded text-xs"
              >
                Sign In to Platform
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
