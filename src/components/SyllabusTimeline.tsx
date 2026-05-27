/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Calendar, BookOpen, Clock, Award, Compass } from 'lucide-react';
import { SyllabusItem } from '../types';

interface SyllabusTimelineProps {
  syllabusList: SyllabusItem[];
}

export default function SyllabusTimeline({ syllabusList }: SyllabusTimelineProps) {
  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Syllabus Header */}
      <div className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 [content-visibility:auto]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded border border-cyan-500/20 font-bold">
            Academic Schedule
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-2">
            IIT-JEE Mathematics Syllabus Timeline
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            A precise topic-wise roadmap covering the entirety of the JEE Main & Advanced core algebra, coordinate, vector geometry, and calculus sequences.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 p-3 rounded border border-slate-850 font-mono text-xs text-slate-400">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
          <span>Active Batch Cycle: Year 2026</span>
        </div>
      </div>

      {/* Chapters list layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {syllabusList.map((item, idx) => (
          <div 
            key={item.id} 
            className="bg-slate-900 border border-slate-805 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 duration-150 [content-visibility:auto]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-wider font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/15 px-2 py-0.5 rounded uppercase">
                  {item.category} Module
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : item.status === 'In Progress' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-slate-950 border-slate-850 text-slate-500'}`}>
                  {item.status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-150 leading-snug">
                  {item.topic}
                </h3>
                <span className="text-[10px] font-mono text-slate-500 block">
                  CBT Weightage trend: <strong className="text-cyan-400">{item.weightage}</strong> of total marks
                </span>
              </div>

              {/* Concepts breakdown */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-850">
                <span className="text-[9px] uppercase font-mono text-slate-500 font-bold block">Syllabus Key Concepts:</span>
                <ul className="text-slate-400 text-[10px] space-y-1.5 font-sans">
                  {item.keyConcepts.map((kc, i) => (
                    <li key={i} className="flex gap-1.5 items-start">
                      <span className="text-cyan-405 text-cyan-400 shrink-0 font-bold">✓</span>
                      <span>{kc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended literature links */}
            <div className="mt-5 pt-3.5 border-t border-slate-850 bg-slate-950/40 p-2.5 rounded border border-slate-850 text-[10px] font-mono text-slate-450 text-slate-400 space-y-1">
              <span className="text-indigo-300 uppercase font-semibold text-[9px] block">Recommended Literature:</span>
              {item.recommendedBooks.map((b, i) => (
                <div key={i} className="truncate">
                  • {b}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
