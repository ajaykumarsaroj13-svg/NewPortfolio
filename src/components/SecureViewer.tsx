/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Eye, AlertTriangle, ChevronLeft, ChevronRight, Maximize2, Lock } from 'lucide-react';
import { LectureNote, VideoLecture } from '../types';

interface SecureViewerProps {
  note?: LectureNote;
  video?: VideoLecture;
  currentUserEmail?: string;
  onClose?: () => void;
}

export default function SecureViewer({ note, video, currentUserEmail = "guest@quantrex.edu", onClose }: SecureViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Intercept right click in the container
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent key combinations like Ctrl+S, Ctrl+P, Ctrl+C, Cmd+S, Cmd+P, Cmd+C
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      if (isCmdOrCtrl) {
        // 's' = 83, 'p' = 80, 'c' = 67, 'u' = 85 (view source)
        if (e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'u' || e.keyCode === 83 || e.keyCode === 80 || e.keyCode === 67 || e.keyCode === 85) {
          e.preventDefault();
          alert("🔒 Quantrex Guard: Copy, Save, and Print capabilities are locked on this intellectual asset!");
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!note && !video) {
    return null;
  }

  const topicName = note ? note.title : video?.title;
  const chapterName = note ? note.chapter : video?.chapter;
  const textWatermark = `${currentUserEmail} | QUANTREX SECURE VAULT | ${new Date().toLocaleDateString()}`;

  return (
    <div 
      id="secure-viewer-modal" 
      className="fixed inset-0 z-50 bg-slate-900/98 backdrop-blur-sm flex flex-col text-slate-100 select-none"
      ref={containerRef}
    >
      {/* Top Secured Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 [content-visibility:auto]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/10 rounded border border-rose-500/20 text-rose-400">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                Anti-Download Mode
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {note ? note.id : video?.id}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-slate-200 mt-0.5 truncate max-w-lg">
              {topicName} ({chapterName})
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Encrypted Stream Active</span>
          </div>
          {onClose && (
            <button 
              id="close-secure-viewer" 
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 duration-150 rounded text-slate-300 hover:text-slate-100 text-xs font-semibold cursor-pointer"
            >
              Exit Viewer
            </button>
          )}
        </div>
      </div>

      {/* Main Vault Workspace */}
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-4 md:p-8 relative">
        
        {/* Anti-Screen Recording Dynamic Watermark */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 pointer-events-none overflow-hidden opacity-[0.06] select-none font-mono text-[10px] md:text-xs text-rose-300 transform -rotate-12 gap-y-24 gap-x-12 p-12">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap tracking-widest leading-none select-none">
              {textWatermark}
            </div>
          ))}
        </div>

        {/* Note Document Viewer Mode */}
        {note && (
          <div className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-lg shadow-2xl flex flex-col min-h-[70vh] relative z-10 select-none">
            
            {/* Securing Bar Info */}
            <div className="bg-stone-950/80 px-4 py-2 text-stone-400 text-xs border-b border-stone-850 flex items-center justify-between font-mono">
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> Direct printing & download buttons are disabled.
              </span>
              <span>Page {currentPage} of {note.pageCount}</span>
            </div>

            {/* Document page simulated canvas */}
            <div className="flex-1 p-6 md:p-12 text-stone-300 relative overflow-y-auto block select-none group">
              
              {/* Extra layer of print prevention - hides everything under print media queries built in CSS */}
              <div className="absolute top-2 right-4 text-[10px] text-stone-500 font-mono italic select-none">
                Confidential - Quantrex Student Copy
              </div>

              {/* The protected text representation */}
              <div className="space-y-6 select-none pointer-events-none select-none">
                <h3 className="text-xl font-bold text-stone-100 tracking-tight border-b border-stone-800 pb-3">
                  {note.title}
                </h3>
                
                <div className="font-mono text-stone-400 text-xs flex justify-between bg-stone-950 p-2.5 rounded border border-stone-850">
                  <span>Author: Quantrex R&D Mathematics</span>
                  <span>JEE Core Prep level</span>
                </div>

                <div className="text-stone-300 select-none pointer-events-none leading-relaxed font-sans mt-6 select-none select-none">
                  <div className="whitespace-pre-wrap select-none font-mono text-xs md:text-sm bg-stone-950/40 p-4 rounded-md border border-stone-850">
                    {/* Simulated pagination display */}
                    {currentPage === 1 ? (
                      <div>
                        <div className="mb-4 text-emerald-400 font-semibold uppercase tracking-wide">
                          --- Chapter: {note.chapter} (Notes Syllabus Part I) ---
                        </div>
                        {note.contentPreview.substring(0, Math.floor(note.contentPreview.length / 2))}
                      </div>
                    ) : (
                      <div>
                        <div className="mb-4 text-emerald-400 font-semibold uppercase tracking-wide">
                          --- Chapter: {note.chapter} (Notes Syllabus Part II) ---
                        </div>
                        {note.contentPreview.substring(Math.floor(note.contentPreview.length / 2))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Copyright protection brand */}
              <div className="mt-12 text-center border-t border-stone-800/60 pt-6">
                <p className="text-stone-600 text-xs font-mono select-none">
                  Quantrex Mathematical Security Systems. Registered workspace user: {currentUserEmail}
                </p>
              </div>
            </div>

            {/* Document Navigation Controls */}
            <div className="bg-stone-950 p-4 border-t border-stone-800 flex items-center justify-between min-h-[56px] [content-visibility:auto]">
              <button
                id="prev-page-button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-stone-900 hover:bg-stone-800 text-xs font-semibold flex items-center gap-2 duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Chapter
              </button>
              
              <span className="text-stone-400 font-mono text-xs">
                Syllabus Chapter Pages
              </span>

              <button
                id="next-page-button"
                onClick={() => setCurrentPage(p => Math.min(note.pageCount, p + 1))}
                disabled={currentPage === note.pageCount}
                className="px-4 py-2 rounded bg-stone-900 hover:bg-stone-800 text-xs font-semibold flex items-center gap-2 duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Chapter <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Video Lecture Player Mode */}
        {video && (
          <div className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl flex flex-col relative z-10 select-none">
            
            {/* Securing Bar Info */}
            <div className="bg-rose-950/20 px-4 py-2 text-rose-300 text-xs border-b border-rose-900/30 flex items-center justify-between font-mono">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Screen Capture Protection Mode active. No download, context menu, or share allowed.</span>
              </span>
              <span>{video.duration}</span>
            </div>

            {/* Video Canvas Layer */}
            <div className="relative aspect-video bg-black flex items-center justify-center select-none group">
              <video
                id="secure-video-element"
                ref={videoRef}
                src={video.videoUrl}
                controls
                controlsList="nodownload nofullscreen"
                onContextMenu={(e) => e.preventDefault()}
                disablePictureInPicture
                className="w-full h-full pointer-events-auto"
                poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=85&w=1200"
              />

              {/* Secure overlays on pause/hover to deter screenshotting */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-500 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 pointer-events-none">
                IP: Locked • {currentUserEmail}
              </div>

              {/* Heavy watermarking right on top of video */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-15 text-slate-300 font-mono tracking-widest font-extrabold text-sm md:text-lg uppercase text-center">
                QUANTREX PROTECTED STREAM<br/>
                {currentUserEmail}
              </div>
            </div>

            {/* Lectern Info Bar */}
            <div className="bg-slate-900 p-5 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 [content-visibility:auto]">
              <div>
                <span className="text-xs text-emerald-400 font-bold tracking-wide uppercase">
                  Class Mathematics Core
                </span>
                <h3 className="text-base font-semibold text-slate-200 mt-0.5">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instructed by: <strong className="text-slate-300">{video.faculty}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono px-2.5 py-1 bg-slate-950 rounded border border-slate-800">
                  Category: {video.category}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Safety Bottom Notice */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-500 font-mono flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5 text-rose-500" />
        <span>Quantrex Guard v2.0 - DRM Protected Content. Anyone can view resources, download capabilities are disabled.</span>
      </div>
    </div>
  );
}
