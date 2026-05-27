/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Compass, Award, ShieldAlert, Sparkles, Send, ArrowRight, Star, ChevronDown, CheckCircle, ChevronUp, Lock } from 'lucide-react';
import { Course } from '../types';

interface HomeViewProps {
  courses: Course[];
  onSelectTab: (tab: string) => void;
  onOpenPurchase: (course: Course) => void;
  currentUser: any;
  onLoginOpen: () => void;
}

export default function HomeView({ courses, onSelectTab, onOpenPurchase, currentUser, onLoginOpen }: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { label: 'Top-500 IIT Ranks in 2024', value: '48+' },
    { label: 'Avg Faculty JEE Math Percentile', value: '99.98%' },
    { label: 'Class Selection Ratio in Advanced', value: '1 out of 5' },
    { label: 'Structured Lecture Hours Scheduled', value: '2500+ Hrs' }
  ];

  const highlights = [
    { title: 'Interactive CBT Simulator', desc: 'Attempt true Computer-Based test structures with real countdown timing markers and instant marking indexes.', icon: Sparkles },
    { title: 'IIT-Alumni Faculty Mentorship', desc: 'Direct study strategies, doubt remediation lectures, and syllabus schedules designed by pure IIT graduates.', icon: Award },
    { title: 'Anti-Download Document Vaults', desc: 'Full-screen previews are permitted for student reference, but strict downloading/extracting components are electronically blocked.', icon: Lock }
  ];

  const faqs = [
    {
      q: 'Who designs the mathematics syllabus and materials at Quantrex Academy?',
      a: 'All lecture sheets, exam papers, and syllabus flowcharts are curated exclusively by our Director HOD, Prof. Ajay Kumar (B.Tech, IIT Kanpur) and Dr. S.K. Verma (IIT Kharagpur PHD). We trust no third-party content mills.'
    },
    {
      q: 'Can I download the lecture notes or save the videos offline?',
      a: 'No. To protect copyrighted research materials and deter unauthorized commercial siphoning, our browser enforces active DRM (Digital Rights Management). This includes blocking standard copy-paste keys, print functions, and right-click download helpers, while preserving beautiful dynamic viewing capabilities.'
    },
    {
      q: 'How does the interactive quiz grading system work?',
      a: 'The quiz suite replicates the official computer-based IIT-JEE format. Correct marking awards you +4 marks, incorrect selections apply a -1 penalty, and unanswered items register at 0. Results sync immediately under your Test History panel.'
    },
    {
      q: 'Is there a money-back policy if I fail to clear JEE Mains?',
      a: 'Our course fees support structural cohorts, infrastructure overheads, and high-performance staff licensing. While tuition is non-refundable, our curriculum provides continuous support until the final Advanced counseling rounds.'
    }
  ];

  return (
    <div className="space-y-16 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Dynamic Immersive Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-6 pb-4 select-none [content-visibility:auto]">

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-805 rounded-full text-[10px] font-mono text-cyan-405 leading-none text-cyan-400 mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ADMISSIONS COHORT 2026 ACTIVE: CRACK THE JEE BARRIER</span>
        </div>

        <h1 className="text-3xl md:text-6xl font-sans font-extrabold text-slate-100 tracking-tight leading-none md:leading-tight">
          Conquer IIT Mathematics with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Uncompromising Rigor</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Skip generic, formula-driven tutoring. Quantrex Academy cultivates calculated logic, analytical proofs, and visual coordinate geometrical strategies engineered specifically for top-100 candidates.
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-2">
          {currentUser ? (
            <button
              id="hero-go-portal"
              onClick={() => onSelectTab('syllabus')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded text-xs font-bold text-slate-100 flex items-center gap-2 cursor-pointer shadow-lg duration-150-all"
            >
              Analyze Syllabus Timeline <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="hero-join-now"
              onClick={onLoginOpen}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded text-xs font-bold text-slate-100 flex items-center gap-2 cursor-pointer shadow-lg duration-150-all"
            >
              Access Enrollment Portal Now <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            id="hero-explore-quizzes"
            onClick={() => onSelectTab('test-series')}
            className="px-6 py-2.5 bg-slate-900 border border-slate-800 rounded text-xs font-bold text-slate-350 hover:text-slate-100 hover:bg-slate-850 duration-150 cursor-pointer"
          >
            Launch CBT Test Series
          </button>
        </div>
      </div>

      {/* Grid Bento Achievements Stats counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0 [content-visibility:auto]">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-905 bg-slate-900 p-5 rounded-xl border border-slate-805 text-center duration-150 cursor-default hover:bg-slate-900/70">
            <span className="text-2xl md:text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 block">
              {stat.value}
            </span>
            <span className="text-[10px] text-slate-405 block font-mono text-slate-400 uppercase tracking-wide mt-1.5 leading-normal">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Key Academy Highlights section */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-slate-100 tracking-wider text-center uppercase font-mono">
          🛡️ Built for High-Performance Math Preparation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((hlt, i) => {
            const Icon = hlt.icon;
            return (
              <div key={i} className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 space-y-3 hover:border-slate-700 duration-150 [content-visibility:auto]">
                <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20 max-w-max">
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <h4 className="text-sm font-bold text-slate-100 tracking-tight">{hlt.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{hlt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course catalog modules with fees previews */}
      <div className="space-y-6 border-t border-slate-805 pt-12">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h3 className="text-base font-bold text-slate-100 tracking-wide uppercase font-mono">
            🏫 Featured Academic Core Course Modules
          </h3>
          <p className="text-xs text-slate-450 text-slate-400">
            Directly select your target cohort study package. One-time fees cover deep physical assignments and complete digital access keys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            const isPurchased = currentUser?.purchasedCourses?.includes(course.id);

            return (
              <div 
                key={course.id} 
                id={`home-course-card-${course.id}`}
                className="bg-slate-900 border border-slate-805 rounded-xl overflow-hidden flex flex-col justify-between duration-150 hover:border-slate-705 [content-visibility:auto]"
              >
                <img
                  src={course.bannerUrl}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover border-b border-slate-850"
                />

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20 uppercase font-bold">
                        {course.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-yellow-405 text-yellow-500 flex items-center gap-1">
                        ★ {course.rating}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-slate-150 mt-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded border border-slate-805 font-mono text-[10px] text-slate-400 space-y-1 flex flex-col">
                    <span className="text-slate-500 uppercase font-bold mb-1 block">Course highlights:</span>
                    <span>• {course.lecturesCount} Chapter Video Lectures</span>
                    <span>• High-Protection Solved PDF Sheets</span>
                    <span>• Direct Forum Mentorship</span>
                  </div>
                </div>

                <div className="bg-slate-950 px-5 py-4 border-t border-slate-805/90 flex items-center justify-between [content-visibility:auto]">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block leading-none">Course Fee</span>
                    <span className="text-xs font-mono font-bold text-slate-202 mt-1 block">₹{course.fee.toLocaleString()}</span>
                  </div>

                  {isPurchased ? (
                    <span className="text-[11px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded font-mono font-bold">
                      ✓ Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("⚠️ Please login first to select your course module!");
                          onLoginOpen();
                          return;
                        }
                        onOpenPurchase(course);
                      }}
                      className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded text-xs font-bold text-slate-100 cursor-pointer shadow-md transition duration-150"
                    >
                      Process Fees
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quantrex DRM Shield Alert announcement block */}
      <div className="bg-slate-950 border border-slate-805 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 [content-visibility:auto]">
        <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-400">
          <Lock className="w-8 h-8 animate-pulse shrink-0" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase font-mono font-extrabold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
              Secure DRM Stream Active
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Copyright Protection Notice
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-205">
            Why are document downloads and direct saves disabled?
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Quantrex Academy has spent thousands of research hours building proprietary solved trigonometry equations, algebraic derivations, and Euler geometry templates. Anyone can preview and read full-screen documents or stream HD lectures, but downloads, copy operations, or print functions are electronically prohibited on this website to safeguard intellectual assets.
          </p>
        </div>
      </div>

      {/* Parents-Students Testimonials */}
      <div className="space-y-6 border-t border-slate-805 pt-12">
        <h3 className="text-base font-bold text-slate-100 tracking-wider text-center uppercase font-mono">
          💬 Parents & Toppers Testimonials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-905 bg-slate-900 border border-slate-805 p-5 rounded-xl space-y-4 [content-visibility:auto]">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Quantrex completely revamped how my son visualized complex geometry. He stopped memorizing ellipse equations and cracked JEE Advanced with a math score of 108/120! Truly remarkable."
            </p>
            <div className="font-mono text-xs">
              <span className="text-slate-202 font-bold block">Prof. D. K. Saroj</span>
              <span className="text-slate-500 block text-[10px]">Parent of Ajay K. (AIR 142)</span>
            </div>
          </div>

          <div className="bg-slate-905 bg-slate-900 border border-slate-805 p-5 rounded-xl space-y-4 [content-visibility:auto]">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The protective browser viewer kept me focused on studying as is, rather than cluttering my desktop with 1000s of offline PDFs. The limits class derivations here are absolute masterpieces!"
            </p>
            <div className="font-mono text-xs">
              <span className="text-slate-202 font-bold block">Kunal Singhal</span>
              <span className="text-slate-500 block text-[10px]">JEE Adv Rank 24 Topper</span>
            </div>
          </div>

          <div className="bg-slate-905 bg-slate-900 border border-slate-805 p-5 rounded-xl space-y-4 [content-visibility:auto]">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The CBT test series replicates the exact exam pressure. Taking timed tests on sequence sum metrics and seeing step-by-step math explanations helped correct my errors early."
            </p>
            <div className="font-mono text-xs">
              <span className="text-slate-202 font-bold block">Divya Sharma</span>
              <span className="text-slate-500 block text-[10px]">IIT Delhi Core Cadet</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion list */}
      <div className="space-y-6 border-t border-slate-805 pt-12 max-w-3xl mx-auto select-none">
        <h3 className="text-base font-bold text-slate-100 tracking-wider text-center uppercase font-mono">
          ❓ Frequently Asked Queries (FAQ)
        </h3>

        <div className="space-y-3 font-sans text-xs">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-slate-900 border border-slate-855 rounded-xl overflow-hidden [content-visibility:auto]"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 flex justify-between items-center bg-slate-900 duration-150 hover:bg-slate-850 cursor-pointer text-slate-200"
                >
                  <span className="font-bold pr-4">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-405 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-503 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-slate-950/60 border-t border-slate-850 text-slate-400 leading-relaxed whitespace-pre-wrap">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
