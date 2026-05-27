/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Video, FileText, ChevronRight, Play, Eye, Award, CheckCircle, Shield, History, Calendar } from 'lucide-react';
import { Course, LectureNote, VideoLecture, PYQ, User, TestAttempt } from '../types';

interface StudentDashboardProps {
  currentUser: User;
  courses: Course[];
  notes: LectureNote[];
  videos: VideoLecture[];
  pyqs: PYQ[];
  onOpenPurchase: (course: Course) => void;
  onOpenSecureNote: (note: LectureNote) => void;
  onOpenSecureVideo: (video: VideoLecture) => void;
}

export default function StudentDashboard({
  currentUser,
  courses,
  notes,
  videos,
  pyqs,
  onOpenPurchase,
  onOpenSecureNote,
  onOpenSecureVideo
}: StudentDashboardProps) {
  const [subTab, setSubTab] = useState<'study' | 'notes' | 'videos' | 'pyq' | 'history'>('study');

  const userPurchases = currentUser.purchasedCourses || [];

  const handleOpenSecureNoteCheck = (note: LectureNote) => {
    if (note.isPremium && !userPurchases.includes('c1') && !userPurchases.includes('c2') && !userPurchases.includes('c3')) {
      alert("🔒 Premium Locked: To access high-level formulas, please enroll in any Quantrex math course fee module!");
      return;
    }
    onOpenSecureNote(note);
  };

  const handleOpenSecureVideoCheck = (video: VideoLecture) => {
    if (video.isPremium && !userPurchases.includes('c1') && !userPurchases.includes('c2') && !userPurchases.includes('c3')) {
      alert("🔒 Premium Locked: Video streaming requires enrollment in Quantrex academic study modules!");
      return;
    }
    onOpenSecureVideo(video);
  };

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Student Welcome Banner */}
      <div className="bg-slate-905 bg-slate-900 border border-slate-805 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 [content-visibility:auto]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
            <Award className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Welcome back, {currentUser.name}!
              </h2>
              <span className="text-[10px] bg-cyan-600/25 border border-cyan-500/20 px-2 py-0.5 rounded font-mono font-bold text-cyan-400">
                STUDENT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enrollment ID: <strong className="font-mono text-slate-300">QTX-2026-{currentUser.email.split('@')[0]}</strong> • Registered Classes: {userPurchases.length} Class Modules
            </p>
          </div>
        </div>

        {/* Rapid Status Cards */}
        <div className="flex gap-4 font-mono text-center text-xs">
          <div className="bg-slate-950 p-2 px-3 border border-slate-805 rounded-lg">
            <span className="text-slate-500 block text-[9px]">ATTEMPTS</span>
            <span className="text-slate-205 font-bold">{currentUser.testHistory?.length || 0} Quizzes</span>
          </div>
          <div className="bg-slate-950 p-2 px-3 border border-slate-805 rounded-lg">
            <span className="text-slate-505 text-slate-500 block text-[9px]">ENROLLED</span>
            <span className="text-slate-205 font-bold">{userPurchases.length} Modules</span>
          </div>
        </div>
      </div>

      {/* Internal Sub-navigation Tabs */}
      <div className="flex border-b border-slate-805 bg-slate-950/40 p-1 rounded-lg max-w-2xl mx-auto [content-visibility:auto]">
        <button
          onClick={() => setSubTab('study')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${subTab === 'study' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Study Portal
        </button>
        <button
          onClick={() => setSubTab('notes')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${subTab === 'notes' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Notes PDFs
        </button>
        <button
          onClick={() => setSubTab('videos')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${subTab === 'videos' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Video Lectures
        </button>
        <button
          onClick={() => setSubTab('pyq')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${subTab === 'pyq' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          PYQs
        </button>
        <button
          onClick={() => setSubTab('history')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${subTab === 'history' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Test History
        </button>
      </div>

      {/* SUB PANELS */}
      
      {subTab === 'study' && (
        <div className="space-y-8">
          {/* Main Course Modules catalog info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 font-mono uppercase tracking-wider block">
              🏫 Official Academic Course Fee Modules
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => {
                const isPurchased = userPurchases.includes(course.id);

                return (
                  <div 
                    key={course.id} 
                    id={`dashboard-course-card-${course.id}`}
                    className="bg-slate-900 border border-slate-805 rounded-xl overflow-hidden flex flex-col justify-between duration-150 hover:border-slate-700 [content-visibility:auto]"
                  >
                    <img
                      src={course.bannerUrl}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-40 object-cover border-b border-slate-850"
                    />

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-wide uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {course.tag}
                          </span>
                          <span className="text-[11px] font-bold text-yellow-400 font-mono">
                            ★ {course.rating}
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-slate-150 tracking-tight leading-snug">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-405 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Syllabus parts */}
                      <div className="space-y-2 select-none bg-slate-950 p-3 rounded border border-slate-805">
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Syllabus Highlights:</span>
                        <ul className="text-slate-400 text-[10px] space-y-1 font-sans">
                          {course.syllabus.slice(0, 3).map((sy, i) => (
                            <li key={i} className="flex gap-1 items-start">
                              <span className="text-cyan-400">✓</span> {sy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 border-t border-slate-805/85 flex items-center justify-between [content-visibility:auto]">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase block font-mono">Course Fee</span>
                        <span className="text-xs font-mono font-bold text-slate-150">₹{course.fee.toLocaleString()}</span>
                      </div>

                      {isPurchased ? (
                        <span className="text-[11px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded font-mono font-bold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" /> Enrolled
                        </span>
                      ) : (
                        <button
                          id={`purchase-course-${course.id}`}
                          onClick={() => onOpenPurchase(course)}
                          className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded text-xs font-bold text-slate-100 cursor-pointer shadow-md transition duration-150"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {subTab === 'notes' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 p-4 rounded-lg flex items-center justify-between [content-visibility:auto]">
            <div>
              <h4 className="text-sm font-bold text-slate-100">🔒 Secure Lecture Notes Vault</h4>
              <p className="text-xs text-slate-400 mt-0.5">Read chapter-wise formulary PDFs. Download/print blocks are enforced on all study materials.</p>
            </div>
            <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 font-bold font-mono px-3 py-1 rounded text-rose-300 uppercase">
              DRM Restrict Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map(note => (
              <div 
                key={note.id} 
                className="bg-slate-905 bg-slate-900 border border-slate-805 rounded-xl p-5 flex items-start gap-4 hover:border-slate-700 duration-150 [content-visibility:auto]"
              >
                <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-2.5 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-950 text-indigo-400 tracking-wide font-semibold border border-slate-805">
                        {note.category}
                      </span>
                      {note.isPremium && (
                        <span className="text-[9px] font-mono text-cyan-400 font-extrabold uppercase">
                          ⭐ PREMIUM
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-202 leading-snug">
                      {note.title}
                    </h4>
                    <p className="text-[11px] text-slate-405 mt-1 leading-normal">
                      {note.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-850">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Page count: {note.pageCount} Sec-Pages
                    </span>
                    <button
                      id={`preview-note-${note.id}`}
                      onClick={() => handleOpenSecureNoteCheck(note)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-250 hover:text-slate-100 text-[10px] font-semibold rounded flex items-center gap-1 cursor-pointer duration-150"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> Secure Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'videos' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 p-4 rounded-lg flex items-center justify-between [content-visibility:auto]">
            <div>
              <h4 className="text-sm font-bold text-slate-100">🔒 DRM Video Streaming Chamber</h4>
              <p className="text-xs text-slate-400 mt-0.5">Stream high-definition concept lectures. Native downloading triggers IP watermarking overlays instantly.</p>
            </div>
            <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 font-bold font-mono px-3 py-1 rounded text-rose-300 uppercase">
              DRM Restrict Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="bg-slate-905 bg-slate-900 border border-slate-805 rounded-xl p-5 flex items-start gap-4 hover:border-slate-700 duration-150 [content-visibility:auto]"
              >
                <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg shrink-0">
                  <Video className="w-6 h-6" />
                </div>
                <div className="space-y-2.5 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-950 text-indigo-400 tracking-wide font-semibold border border-slate-805">
                        {video.category}
                      </span>
                      {video.isPremium && (
                        <span className="text-[9px] font-mono text-cyan-400 font-extrabold uppercase">
                          ⭐ PREMIUM
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-202 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-slate-405 mt-1 leading-normal">
                      {video.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-850">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Instructor: {video.faculty.split(' ')[1]} {video.faculty.split(' ')[2] || ''} ({video.duration})
                    </span>
                    <button
                      id={`preview-video-${video.id}`}
                      onClick={() => handleOpenSecureVideoCheck(video)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-250 hover:text-slate-100 text-[10px] font-semibold rounded flex items-center gap-1 cursor-pointer duration-150"
                    >
                      <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" /> Secure Stream
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'pyq' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 p-4 rounded-lg [content-visibility:auto]">
            <h4 className="text-sm font-bold text-slate-100">📖 Previous Year JEE Questions (With Derivation Solutions)</h4>
            <p className="text-xs text-slate-400 mt-0.5">Direct index of solved problems from JEE Main & Adv. Click solution tabs to view answers.</p>
          </div>

          <div className="space-y-4">
            {pyqs.map(pyq => (
              <div 
                key={pyq.id} 
                className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 space-y-4 [content-visibility:auto]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                      {pyq.exam} - {pyq.year}
                    </span>
                    <span className="text-[10px] font-mono font-semibold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-850">
                      {pyq.chapter}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Q-ID: {pyq.id}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-205">
                    {pyq.title}
                  </h4>
                  <p className="text-xs text-slate-300 bg-slate-950/65 border border-slate-850 p-4 rounded-lg leading-relaxed font-sans select-none whitespace-pre-wrap">
                    {pyq.questionText}
                  </p>
                </div>

                <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-xs text-left">
                  <span className="font-bold text-emerald-400 uppercase tracking-widest text-[9px] block mb-1">
                    🔑 Accurate IIT-Board Solution Proof:
                  </span>
                  <p className="text-slate-300 font-sans leading-normal whitespace-pre-wrap">
                    {pyq.solutionText}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 p-4 rounded-lg [content-visibility:auto]">
            <h4 className="text-sm font-bold text-slate-100">📊 My Test Attempt History</h4>
            <p className="text-xs text-slate-400 mt-0.5">Real-time grades are recorded automatically on exam quiz completion below.</p>
          </div>

          {currentUser.testHistory && currentUser.testHistory.length > 0 ? (
            <div className="space-y-4">
              {currentUser.testHistory.map((historyItem, idx) => {
                const totalQuestions = historyItem.correctCount + historyItem.incorrectCount + historyItem.unansweredCount;
                const minutesTaken = Math.floor(historyItem.timeSpentSeconds / 60);
                const secondsTaken = historyItem.timeSpentSeconds % 60;

                return (
                  <div 
                    key={historyItem.id || idx} 
                    className="bg-slate-900 border border-slate-805 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 [content-visibility:auto]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0"></span>
                        <h4 className="text-xs font-semibold text-slate-150">
                          {historyItem.quizTitle}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-505 text-slate-500 font-mono">
                        Attempt Datetime: {historyItem.date}
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center font-mono text-xs max-w-md w-full md:w-auto">
                      <div className="bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block uppercase">Score</span>
                        <span className="text-cyan-300 font-bold">{historyItem.score} / {historyItem.maxScore}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block uppercase">Correct</span>
                        <span className="text-emerald-400 font-bold">{historyItem.correctCount}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block uppercase">Wrong</span>
                        <span className="text-rose-400 font-bold">{historyItem.incorrectCount}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-500 block uppercase">Duration</span>
                        <span className="text-slate-300 font-bold">{minutesTaken}:{secondsTaken.toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-955 p-12 text-center rounded-xl border border-slate-805 space-y-3 max-w-md mx-auto">
              <History className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
              <div>
                <p className="text-xs font-bold text-slate-300">No attempts logged yet!</p>
                <p className="text-[11px] text-slate-400 mt-1">To record scores, go to \"Test Series & Quizzes\" and attempt any CBT Math challenge.</p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
