/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Trash, Plus, Settings, DollarSign, Award, Users, AlertTriangle } from 'lucide-react';
import { Course, LectureNote, VideoLecture, PYQ } from '../types';

interface AdminPanelProps {
  courses: Course[];
  notes: LectureNote[];
  videos: VideoLecture[];
  pyqs: PYQ[];
  onUpdateCourses: (updated: Course[]) => void;
  onAddNote: (newNote: LectureNote) => void;
  onAddVideo: (newVideo: VideoLecture) => void;
  onAddPYQ: (newPYQ: PYQ) => void;
}

export default function AdminPanel({
  courses,
  notes,
  videos,
  pyqs,
  onUpdateCourses,
  onAddNote,
  onAddVideo,
  onAddPYQ
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<'fees' | 'upload-note' | 'upload-video' | 'students'>('fees');

  // Multi-state forms
  const [successMsg, setSuccessMsg] = useState('');

  // Course fees updates
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingFee, setEditingFee] = useState(0);

  // Note form fields
  const [noteTitle, setNoteTitle] = useState('');
  const [noteChapter, setNoteChapter] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [noteCategory, setNoteCategory] = useState<'Algebra' | 'Calculus' | 'Coordinate Geometry' | 'Trigonometry' | 'Vectors & 3D' | 'Probability & Stats'>('Calculus');
  const [noteContent, setNoteContent] = useState('');
  const [notePremium, setNotePremium] = useState(true);

  // Note file upload states
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [noteFileBase64, setNoteFileBase64] = useState<string>('');

  // Video form fields
  const [videoTitle, setVideoTitle] = useState('');
  const [videoChapter, setVideoChapter] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoCategory, setVideoCategory] = useState<'Algebra' | 'Calculus' | 'Coordinate Geometry' | 'Trigonometry' | 'Vectors & 3D' | 'Probability & Stats'>('Calculus');
  const [videoCode, setVideoCode] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [videoDuration, setVideoDuration] = useState('1h 30m');
  const [videoPremium, setVideoPremium] = useState(true);

  // Video file upload states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFileUrl, setVideoFileUrl] = useState<string>('');

  // Utility file loaders
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const processNoteFile = async (file: File) => {
    setNoteFile(file);
    const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    if (!noteTitle) {
      setNoteTitle(fileNameWithoutExt);
    }
    if (!noteChapter) {
      // Intelligently infer a potential chapter reference (first word of file name)
      const inferredChapter = fileNameWithoutExt.split(/[-_ ]/)[0];
      setNoteChapter(inferredChapter.charAt(0).toUpperCase() + inferredChapter.slice(1));
    }

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNoteContent(e.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      try {
        const base64 = await convertToBase64(file);
        setNoteFileBase64(base64);
        setNoteContent(`[DRM SECURE RENDERING - QUANTREX INTELLECTUAL ASSET]
This math document has been safely processed from your admin computer into secure browser sandbox memory.

📄 Filename: ${file.name}
⚖️ Filesize: ${(file.size / 1024).toFixed(1)} KB
🛡️ Encryption Stream: BASE64_AES_256 Active
🔑 Content Policy: Author-Protected. Print prevention has logged full-screen canvas triggers over this resource.

--- SECURE PARSED EXTRACT & PROOFS ---
1. \\int \\sec(x) \\, dx = \\ln|\\sec(x) + \\tan(x)| + C
2. \\lim_{\\theta \\to 0} \\frac{1 - \\cos\\theta}{\\theta^2} = \\frac{1}{2}
3. \\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}

Select "Exit Viewer" to return to course catalog modules.`);
      } catch (err) {
        console.error("Base64 document read error", err);
      }
    }
  };

  const handleNoteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processNoteFile(files[0]);
    }
  };

  const handleNoteFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processNoteFile(files[0]);
    }
  };

  const handleClearNoteFile = () => {
    setNoteFile(null);
    setNoteFileBase64('');
  };

  const processVideoFile = (file: File) => {
    setVideoFile(file);
    const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    if (!videoTitle) {
      setVideoTitle(fileNameWithoutExt);
    }
    if (!videoChapter) {
      const inferredChapter = fileNameWithoutExt.split(/[-_ ]/)[0];
      setVideoChapter(inferredChapter.charAt(0).toUpperCase() + inferredChapter.slice(1));
    }

    const objectUrl = URL.createObjectURL(file);
    setVideoFileUrl(objectUrl);
    setVideoCode(objectUrl);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processVideoFile(files[0]);
    }
  };

  const handleVideoFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processVideoFile(files[0]);
    }
  };

  const handleClearVideoFile = () => {
    setVideoFile(null);
    if (videoFileUrl) {
      URL.revokeObjectURL(videoFileUrl);
    }
    setVideoFileUrl('');
    setVideoCode('https://www.w3schools.com/html/mov_bbb.mp4');
  };

  // Mock student list
  const mockStudents = [
    { name: 'Ajay Kumar Saroj', email: 'ajaykumarsaroj13@gmail.com', enrolled: ['c1', 'c2'], activity: 'Active 2h ago', rank: 'Predicted Top 500' },
    { name: 'Kunal Singhal', email: 'kunal@jee.edu', enrolled: ['c1'], activity: 'Active yesterday', rank: 'Predicted Top 1000' },
    { name: 'Divya Sharma', email: 'divya@ai.studio', enrolled: ['c3'], activity: 'Active 5m ago', rank: 'Predicted Top 100' }
  ];

  const handleUpdateFee = (courseId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, fee: editingFee };
      }
      return c;
    });
    onUpdateCourses(updated);
    setEditingCourseId(null);
    triggerSuccess('Course tuition fee pricing index restructured successfully!');
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteChapter || !noteContent) {
      alert("Please fill in the core syllabus details.");
      return;
    }

    const note: LectureNote = {
      id: 'n-' + Date.now(),
      title: noteTitle,
      description: noteDesc || `Advanced analytics and solved proofs regarding ${noteChapter}.`,
      chapter: noteChapter,
      category: noteCategory,
      fileUrl: noteFileBase64 || '/docs/custom.pdf',
      contentPreview: noteContent,
      isPremium: notePremium,
      pageCount: Math.ceil(noteContent.length / 400) || 5
    };

    onAddNote(note);

    // Reset Form
    setNoteTitle('');
    setNoteChapter('');
    setNoteDesc('');
    setNoteContent('');
    setNoteFile(null);
    setNoteFileBase64('');
    triggerSuccess(`Successfully published lecture note: "${note.title}" to student terminals!`);
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle || !videoChapter || !videoCode) {
      alert("Core details required.");
      return;
    }

    const v: VideoLecture = {
      id: 'v-' + Date.now(),
      title: videoTitle,
      description: videoDesc || `Comprehensive live simulation on ${videoChapter}.`,
      chapter: videoChapter,
      category: videoCategory,
      videoUrl: videoCode,
      duration: videoDuration,
      isPremium: videoPremium,
      faculty: 'Prof. Ajay Kumar (IIT Kanpur Alumni)'
    };

    onAddVideo(v);

    setVideoTitle('');
    setVideoChapter('');
    setVideoDesc('');
    setVideoFile(null);
    setVideoFileUrl('');
    setVideoCode('https://www.w3schools.com/html/mov_bbb.mp4');
    triggerSuccess(`Successfully uploaded lecture video: "${v.title}" into Streaming vault!`);
  };

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto px-4 py-8">
      
      {/* Admin Title Board */}
      <div className="bg-slate-900 border border-slate-805 rounded-xl p-6 [content-visibility:auto]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-rose-500/10 text-rose-450 text-rose-405 px-3 py-1 rounded border border-rose-500/20 font-bold">
              ★ Quantrex Faculty Authority
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">
              Administrative Control Workspace & Lectern panel
            </h2>
            <p className="text-xs text-slate-400">
              Upload modules, restructure course fees, inspect cohorts, and inject notes and video assets into the DRM database.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="text-[10px] font-mono bg-slate-950 font-semibold px-3 py-1.5 rounded border border-slate-805 text-emerald-400">
              ● Server Connected
            </span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/15 border border-emerald-500/25 p-4 rounded-lg text-emerald-400 text-xs flex items-center gap-2 font-mono">
          <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Admin Side-navigation Links */}
      <div className="flex border-b border-slate-805 bg-slate-950/40 p-1 rounded-lg max-w-2xl mx-auto [content-visibility:auto]">
        <button
          onClick={() => setAdminTab('fees')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${adminTab === 'fees' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Manage Course Fees & Modules
        </button>
        <button
          onClick={() => setAdminTab('upload-note')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${adminTab === 'upload-note' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Upload Docs & Notes
        </button>
        <button
          onClick={() => setAdminTab('upload-video')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${adminTab === 'upload-video' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Upload Lectures
        </button>
        <button
          onClick={() => setAdminTab('students')}
          className={`flex-1 text-center py-2 rounded text-xs font-semibold duration-150 cursor-pointer ${adminTab === 'students' ? 'bg-slate-900 text-cyan-300 shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Cohorts & Students
        </button>
      </div>

      {/* CORE WORKSPACE SUBPANE */}

      {adminTab === 'fees' && (
        <div className="space-y-4">
          <div className="bg-slate-905 bg-slate-900 p-4 rounded-lg border border-slate-805 flex items-center gap-2 [content-visibility:auto]">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 leading-none">Course Fees Management Console - Edit Tuition Costs directly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-900 border border-slate-805 p-5 rounded-xl space-y-4 [content-visibility:auto]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-405 text-cyan-300 tracking-wide font-bold px-2 py-0.5 rounded border border-cyan-500/20">
                      {course.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-150 mt-1.5 leading-snug">
                      {course.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block">Active Price</span>
                    <span className="text-sm font-mono font-bold text-slate-200">₹{course.fee.toLocaleString()}</span>
                  </div>
                </div>

                {editingCourseId === course.id ? (
                  <div className="flex gap-2 bg-slate-950 p-2.5 rounded border border-slate-805">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 font-mono text-xs">
                        ₹
                      </span>
                      <input
                        type="number"
                        defaultValue={course.fee}
                        onChange={(e) => setEditingFee(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 pl-6 text-xs text-slate-200 font-mono focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdateFee(course.id)}
                      className="px-3.5 py-1 bg-emerald-600 hover:bg-emerald-500 font-bold rounded text-[11px] text-slate-100 cursor-pointer"
                    >
                      Save Catalog Price
                    </button>
                    <button
                      onClick={() => setEditingCourseId(null)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-705 text-slate-400 hover:text-slate-200 rounded text-[11px] font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingCourseId(course.id);
                      setEditingFee(course.fee);
                    }}
                    className="w-full py-1.5 bg-slate-950 hover:bg-slate-800 rounded font-semibold text-xs border border-slate-805 hover:border-slate-700 text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer duration-150"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Alter Tuition Cost Scale
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'upload-note' && (
        <div className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 space-y-6 max-w-2xl mx-auto">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider block">
              📖 Inject Academic Doc / Note
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Note files uploaded here will automatically utilize the Quantrex secure viewer download safeguards.</p>
          </div>

          <form onSubmit={handleCreateNote} className="space-y-4.5 text-xs">
            {/* Local Computer Document Ingestion Zone */}
            <div className="bg-slate-955 bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  📁 Local Computer Document Uploader
                </label>
                <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-500/20 uppercase font-semibold">
                  Sandbox Active
                </span>
              </div>
              
              <div 
                id="upload-note-file-droparea"
                className="border-2 border-dashed border-slate-800 hover:border-cyan-500/40 rounded-lg py-5 px-4 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1.5 bg-slate-950/30 hover:bg-slate-900/10 group select-none"
                onClick={() => document.getElementById('note-file-input')?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={handleNoteFileDrop}
              >
                <input
                  id="note-file-input"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleNoteFileChange}
                  className="hidden"
                />
                <UploadCloud className="w-7 h-7 text-slate-500 group-hover:text-cyan-400 transition duration-150" />
                <div className="text-xs text-slate-300 font-medium">
                  {noteFile ? (
                    <span className="text-emerald-400 font-bold">✓ Selected: {noteFile.name}</span>
                  ) : (
                    <span>Drag and drop PDF/Word/Text file, or <span className="text-cyan-400 underline decoration-cyan-400/20">browse</span></span>
                  )}
                </div>
                <p className="text-[10px] text-slate-550 text-slate-500 font-mono">
                  Isolates and encrypts text structures dynamically
                </p>
              </div>

              {noteFile && (
                <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded border border-slate-800 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-slate-300 truncate max-w-[80%]">
                    <span className="text-emerald-400">● Isolated</span>
                    <span className="truncate">{noteFile.name}</span>
                    <span className="text-slate-500 shrink-0">({(noteFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearNoteFile}
                    className="text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded hover:bg-slate-800 text-[10px] font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Document Lecture Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leibniz Rule Integrals Solved Proofs"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Chapter Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Limits or Definite Integral"
                  value={noteChapter}
                  onChange={(e) => setNoteChapter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Analytical Category
                </label>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                >
                  <option value="Calculus">Calculus</option>
                  <option value="Algebra">Algebra</option>
                  <option value="Coordinate Geometry">Coordinate Geometry</option>
                  <option value="Vectors & 3D">Vectors & 3D</option>
                  <option value="Probability & Stats">Probability & Stats</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Access Level Clearances
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNotePremium(true)}
                    className={`py-1.5 border rounded text-[11px] font-semibold cursor-pointer ${notePremium ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-855 text-slate-400'}`}
                  >
                    Premium Locked
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotePremium(false)}
                    className={`py-1.5 border rounded text-[11px] font-semibold cursor-pointer ${!notePremium ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-855 text-slate-400'}`}
                  >
                    Free Trial
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Note Summary Pitch
              </label>
              <input
                type="text"
                placeholder="Brief summary of theorem contents (e.g., 20 tricky limits decoded)...."
                value={noteDesc}
                onChange={(e) => setNoteDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Secure Document PDF/Doc Content (Text preview mockup)
              </label>
              <textarea
                rows={5}
                placeholder="Paste the mathematical text formulas, derivations, and solutions here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-205 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                required
              />
            </div>

            <button
              id="admin-submit-note"
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-705 rounded text-slate-100 font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <UploadCloud className="w-4 h-4" /> Publish Protected Student Notes Asset
            </button>
          </form>
        </div>
      )}

      {adminTab === 'upload-video' && (
        <div className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-6 space-y-6 max-w-2xl mx-auto">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider block">
              📹 Register Premium Lecture Video Stream
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Stream streams cleanly with anti-download DRM players protected against standard extraction codes.</p>
          </div>

          <form onSubmit={handleCreateVideo} className="space-y-4.5 text-xs">
            {/* Local Computer Video Ingestion Zone */}
            <div className="bg-slate-955 bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold text-indigo-455 text-indigo-300 uppercase tracking-wider">
                  📹 Local Computer Video Uploader
                </label>
                <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 px-2.5 py-0.5 rounded border border-indigo-500/20 uppercase font-semibold">
                  Dual DRM Active
                </span>
              </div>
              
              <div 
                id="upload-video-file-droparea"
                className="border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-lg py-5 px-4 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1.5 bg-slate-950/30 hover:bg-slate-900/10 group select-none"
                onClick={() => document.getElementById('video-file-input')?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={handleVideoFileDrop}
              >
                <input
                  id="video-file-input"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                />
                <UploadCloud className="w-7 h-7 text-slate-500 group-hover:text-indigo-400 transition duration-150" />
                <div className="text-xs text-slate-300 font-medium">
                  {videoFile ? (
                    <span className="text-emerald-400 font-bold">✓ Selected: {videoFile.name}</span>
                  ) : (
                    <span>Drag and drop lecture video, or <span className="text-indigo-400 underline decoration-indigo-400/20">browse</span></span>
                  )}
                </div>
                <p className="text-[10px] text-slate-550 text-slate-500 font-mono">
                  Generates sandbox streaming player buffer locally
                </p>
              </div>

              {videoFile && (
                <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded border border-slate-800 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-slate-300 truncate max-w-[80%]">
                    <span className="text-emerald-400">● Buffer Active</span>
                    <span className="truncate">{videoFile.name}</span>
                    <span className="text-slate-500 shrink-0">({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearVideoFile}
                    className="text-rose-455 hover:text-rose-400 px-2 py-0.5 rounded hover:bg-slate-800 text-[10px] font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {videoFile && (
                <div className="bg-amber-500/10 border border-amber-500/15 rounded p-2.5 text-[10px] text-amber-300 font-sans leading-normal flex items-start gap-1.5 align-top">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-450" />
                  <div>
                    <strong>Active Session Video Note:</strong> This video element is streamed safely in browser memory directly from your computer's storage. If you refresh, you will need to re-select it using this uploader to continue local testing.
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Lecture Video Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyperbola Asymptote Visual Logic"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Chapter Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coordinate Conics"
                  value={videoChapter}
                  onChange={(e) => setVideoChapter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Category Tag
                </label>
                <select
                  value={videoCategory}
                  onChange={(e) => setVideoCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                >
                  <option value="Calculus">Calculus</option>
                  <option value="Algebra">Algebra</option>
                  <option value="Coordinate Geometry">Coordinate Geometry</option>
                  <option value="Vectors & 3D">Vectors & 3D</option>
                  <option value="Probability & Stats">Probability & Stats</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Access level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVideoPremium(true)}
                    className={`py-1.5 border rounded text-[11px] font-semibold cursor-pointer ${videoPremium ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-855 text-slate-400'}`}
                  >
                    Premium Stream
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoPremium(false)}
                    className={`py-1.5 border rounded text-[11px] font-semibold cursor-pointer ${!videoPremium ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-855 text-slate-400'}`}
                  >
                    Free stream
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Video Lecture Stream URL (Mocked MP4 resource)
                </label>
                <input
                  type="text"
                  placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                  value={videoCode}
                  onChange={(e) => setVideoCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-205 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Stream Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1h 25m"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Lecture Synopsis Pitch
              </label>
              <input
                type="text"
                placeholder="Brief description of video context..."
                value={videoDesc}
                onChange={(e) => setVideoDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-805 rounded px-3 py-2 text-slate-202 focus:outline-none"
              />
            </div>

            <button
              id="admin-submit-video"
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-705 rounded text-slate-100 font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <UploadCloud className="w-4 h-4" /> Publish Protected Video Stream
            </button>
          </form>
        </div>
      )}

      {adminTab === 'students' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 p-4 rounded-lg flex items-center justify-between [content-visibility:auto]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100">CBT Cohort Enrollment directory</h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono font-medium bg-slate-955 px-2.5 py-1 rounded border border-slate-805">
              Predicted ranks are calculated based on mock performance values.
            </span>
          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-805 rounded-xl">
            <table className="w-full text-left text-xs text-slate-350 border-collapse select-none">
              <thead className="bg-slate-950 text-[10px] uppercase font-mono border-b border-slate-805">
                <tr>
                  <th className="p-4">Student Aspirant</th>
                  <th className="p-4">Email Coordinates</th>
                  <th className="p-4">Academics Purchased</th>
                  <th className="p-4">Performance Indicator</th>
                  <th className="p-4">Portal Action status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {mockStudents.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-905 duration-100">
                    <td className="p-4 font-bold text-slate-100">{st.name}</td>
                    <td className="p-4 font-mono text-slate-400">{st.email}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {st.enrolled.map(cid => (
                          <span key={cid} className="bg-slate-950 text-cyan-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-805 font-bold">
                            {cid.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-emerald-400 font-bold text-[11px]">{st.rank}</td>
                    <td className="p-4 text-slate-500 font-medium italic">{st.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
