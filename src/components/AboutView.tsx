/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldAlert, GraduationCap, Flame, ArrowUpRight, BookOpen } from 'lucide-react';

export default function AboutView() {
  const leadership = [
    {
      name: 'Prof. Ajay Kumar',
      role: 'Director & HOD Mathematics',
      credentials: 'B.Tech & M.Tech, IIT Kanpur (AIR 142)',
      bio: 'Over 14+ years of training JEE Advanced aspirants. Specialized in Real Analysis, Differential Equations and Coordinate Calculus Geometry.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    {
      name: 'Dr. S. K. Verma',
      role: 'Senior Faculty Geometry',
      credentials: 'Ph.D in Pure Mathematics, IIT Kharagpur',
      bio: 'Author of several renowned Algebra textbooks. Famous for his visual rotational vectors operator paradigm.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
    }
  ];

  const milestones = [
    { year: '2023', milestone: 'IIT-JEE Advanced AIR 8, AIR 24, and 76 selections in top 500' },
    { year: '2024', milestone: '136+ students scored 99.8+ percentile in JEE Main Mathematics' },
    { year: '2025', milestone: 'Pioneered custom Anti-Download Secure Lecture Room to safeguard proprietary study models' }
  ];

  return (
    <div className="space-y-12 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Intro Hero banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-805 px-6 md:px-12 py-12 md:py-20 flex flex-col justify-center select-none [content-visibility:auto]">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded">
            Our Legacy
          </span>
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-slate-100 tracking-tight">
            Redefining Mathematics Pedagogy for Potential IITians
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Quantrex Academy is not just a commercial tutoring portal. We are an intensive training lab founded by IIT Alumni. Our mission is strictly centered around developing logical rigor, eliminating formula memorization, and exposing the elegant geometry animating algebra.
          </p>
        </div>
      </div>

      {/* Core Philosophies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-805 hover:border-slate-750 duration-150 [content-visibility:auto]">
          <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20 max-w-max mb-4">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
            Rigor Over Shortcuts
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Shortcuts fail when JEE Advanced modifies the boundary conditions. We build core theories from first principles, preparing aspirants for unexpected problems.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-805 hover:border-slate-750 duration-150 [content-visibility:auto]">
          <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20 max-w-max mb-4">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
            IIT-Alumni Guidance
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Learn from faculty members who have cracked the exam themselves. Benefit from calculated exam strategies, time management templates, and rank-building mental shifts.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-805 hover:border-slate-750 duration-150 [content-visibility:auto]">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 max-w-max mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
            Anti-Siphoning Vault
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Secure browser digital rights management controls. Anyone can review high-end PDFs, video lectures, and syllabus schedules, but downloads are strictly disabled to protect source content security.
          </p>
        </div>
      </div>

      {/* Faculty bios */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-slate-100 font-mono uppercase tracking-wider block">
          Meet Our Distinguished Faculty HODs
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map(teacher => (
            <div 
              key={teacher.name} 
              className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center duration-150 hover:bg-slate-900/80 [content-visibility:auto]"
            >
              <img
                src={teacher.avatarUrl}
                alt={teacher.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover border border-slate-850 shrink-0"
              />
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 tracking-tight">
                    {teacher.name}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1 inline-block">
                    {teacher.role}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 font-semibold leading-normal">
                  {teacher.credentials}
                </p>
                <p className="text-xs text-slate-405 leading-relaxed">
                  {teacher.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones timeline */}
      <div className="bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-805 space-y-6">
        <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-widest flex items-center gap-2">
          <span>🏆 Proven Milestones Trend</span>
        </h3>
        
        <div className="space-y-4 font-mono text-xs">
          {milestones.map((ms, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-slate-900 border border-slate-850 rounded-lg">
              <span className="text-cyan-400 font-bold shrink-0">{ms.year}</span>
              <div className="border-l border-slate-800 pl-4 text-slate-300">
                {ms.milestone}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
