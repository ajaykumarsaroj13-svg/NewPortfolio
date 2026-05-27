/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import SyllabusTimeline from './components/SyllabusTimeline';
import QuizArena from './components/QuizArena';
import StudentDashboard from './components/StudentDashboard';
import AdminPanel from './components/AdminPanel';
import ContactView from './components/ContactView';
import AuthModal from './components/AuthModal';
import PurchaseModal from './components/PurchaseModal';
import SecureViewer from './components/SecureViewer';

import { Landmark } from 'lucide-react';
import { User, UserRole, Course, LectureNote, VideoLecture, PYQ, SyllabusItem, Quiz, TestAttempt } from './types';
import { INITIAL_COURSES, INITIAL_SYLLABUS, INITIAL_NOTES, INITIAL_VIDEOS, INITIAL_PYQS, INITIAL_QUIZZES } from './data';

// Real Firebase SDK integrations
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');

  // Master databases synced with Firestore
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [notes, setNotes] = useState<LectureNote[]>(INITIAL_NOTES);
  const [videos, setVideos] = useState<VideoLecture[]>(INITIAL_VIDEOS);
  const [pyqs, setPyqs] = useState<PYQ[]>(INITIAL_PYQS);

  const [syllabusList] = useState<SyllabusItem[]>(INITIAL_SYLLABUS);
  const [quizzes] = useState<Quiz[]>(INITIAL_QUIZZES);

  // Authenticated Student/Admin Context
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal display states
  const [authOpen, setAuthOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Secure Media Viewer states
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeSecureNote, setActiveSecureNote] = useState<LectureNote | undefined>(undefined);
  const [activeSecureVideo, setActiveSecureVideo] = useState<VideoLecture | undefined>(undefined);

  // 1. Firebase Auth state change synchronization listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setCurrentUser({
              id: firebaseUser.uid,
              email: userData.email || firebaseUser.email || '',
              name: userData.name || firebaseUser.displayName || 'Aspirant',
              role: userData.role || 'student',
              purchasedCourses: userData.purchasedCourses || [],
              testHistory: userData.testHistory || [],
              avatarUrl: userData.avatarUrl || ''
            });
          } else {
            // First time registration or missing user profile document creation
            // We use the email from runtime to automatically assign local admin rights on the fly!
            const isAdminEmail = firebaseUser.email?.toLowerCase().includes('admin') || 
                               firebaseUser.email === 'ajaykumarsaroj13@gmail.com' ||
                               firebaseUser.email === 'aspirant+admin@quantrex.edu';
            const defaultUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0].toUpperCase() || 'Aspirant',
              role: isAdminEmail ? 'admin' : 'student',
              purchasedCourses: [],
              testHistory: []
            };
            await setDoc(userRef, defaultUser);
            setCurrentUser(defaultUser);
          }
        } catch (e) {
          console.error("User profile Firestore fetch failed", e);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // 2. Real-time Firestore document synchronizations for courses, notes, videos and pyqs
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), async (snap) => {
      if (snap.empty) {
        // Hydrate from initial configurations if database was newly provisioned
        for (const item of INITIAL_COURSES) {
          try {
            await setDoc(doc(db, 'courses', item.id), item);
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `courses/${item.id}`);
          }
        }
      } else {
        const list: Course[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as Course);
        });
        setCourses(list);
      }
    }, (err) => {
      console.warn("Firestore courses subscription warning:", err);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'notes'), async (snap) => {
      if (snap.empty) {
        // Hydrate notes
        for (const item of INITIAL_NOTES) {
          try {
            await setDoc(doc(db, 'notes', item.id), item);
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `notes/${item.id}`);
          }
        }
      } else {
        const list: LectureNote[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as LectureNote);
        });
        setNotes(list);
      }
    }, (err) => {
      console.warn("Firestore notes subscription warning:", err);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'videos'), async (snap) => {
      if (snap.empty) {
        // Hydrate videos
        for (const item of INITIAL_VIDEOS) {
          try {
            await setDoc(doc(db, 'videos', item.id), item);
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `videos/${item.id}`);
          }
        }
      } else {
        const list: VideoLecture[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as VideoLecture);
        });
        setVideos(list);
      }
    }, (err) => {
      console.warn("Firestore videos subscription warning:", err);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pyqs'), async (snap) => {
      if (snap.empty) {
        // Hydrate pyqs
        for (const item of INITIAL_PYQS) {
          try {
            await setDoc(doc(db, 'pyqs', item.id), item);
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `pyqs/${item.id}`);
          }
        }
      } else {
        const list: PYQ[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as PYQ);
        });
        setPyqs(list);
      }
    }, (err) => {
      console.warn("Firestore pyqs subscription warning:", err);
    });
    return unsub;
  }, []);

  // 3. Keep login modal closed as soon as currentUser state gets resolved
  useEffect(() => {
    if (currentUser) {
      setAuthOpen(false);
    }
  }, [currentUser]);

  // Auth Callbacks
  const handleLoginSuccess = (email: string, name: string, role: UserRole) => {
    // Left legacy callback as fallback compatibility
    setAuthOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setActiveTab('home');
    } catch (err) {
      console.error("Sign out fail", err);
    }
  };

  // Payment Enrollment Callback
  const handleEnrollmentGranted = async (courseId: string) => {
    if (!currentUser) return;

    const updatedPurchased = [...(currentUser.purchasedCourses || [])];
    if (!updatedPurchased.includes(courseId)) {
      updatedPurchased.push(courseId);
    }

    const updatedUser: User = {
      ...currentUser,
      purchasedCourses: updatedPurchased
    };

    setCurrentUser(updatedUser);
    
    // Persistent write to user Firestore terminal profile
    const userRef = doc(db, 'users', currentUser.id);
    try {
      await setDoc(userRef, { purchasedCourses: updatedPurchased }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.id}`);
    }
  };

  // Test Attempt record Callback
  const handleQuizAttemptGraded = async (attempt: TestAttempt) => {
    if (!currentUser) return;

    const updatedHistory = [attempt, ...(currentUser.testHistory || [])];
    const updatedUser: User = {
      ...currentUser,
      testHistory: updatedHistory
    };

    setCurrentUser(updatedUser);

    // Persistent write to user Firestore terminal profile
    const userRef = doc(db, 'users', currentUser.id);
    try {
      await setDoc(userRef, { testHistory: updatedHistory }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.id}`);
    }
  };

  // Open safe Viewer hooks
  const triggerSecureNote = (note: LectureNote) => {
    setActiveSecureNote(note);
    setActiveSecureVideo(undefined);
    setViewerOpen(true);
  };

  const triggerSecureVideo = (video: VideoLecture) => {
    setActiveSecureVideo(video);
    setActiveSecureNote(undefined);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      
      {/* Main Responsive Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onLoginOpen={() => setAuthOpen(true)} 
      />

      {/* Primary Page Workspaces */}
      <main className="flex-1 pb-16">
        
        {activeTab === 'home' && (
          <HomeView 
            courses={courses} 
            onSelectTab={setActiveTab} 
            onOpenPurchase={(course) => {
              setSelectedCourse(course);
              setPurchaseOpen(true);
            }}
            currentUser={currentUser}
            onLoginOpen={() => setAuthOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusTimeline syllabusList={syllabusList} />
        )}

        {activeTab === 'test-series' && (
          <QuizArena 
            quizzes={quizzes} 
            onQuizSubmit={handleQuizAttemptGraded} 
            currentUser={currentUser}
          />
        )}

        {activeTab === 'test-history' && currentUser && currentUser.role === 'student' && (
          <StudentDashboard 
            currentUser={currentUser} 
            courses={courses} 
            notes={notes} 
            videos={videos} 
            pyqs={pyqs} 
            onOpenPurchase={(course) => {
              setSelectedCourse(course);
              setPurchaseOpen(true);
            }}
            onOpenSecureNote={triggerSecureNote}
            onOpenSecureVideo={triggerSecureVideo}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'admin' && currentUser?.role === 'admin' && (
          <AdminPanel 
            courses={courses} 
            notes={notes} 
            videos={videos} 
            pyqs={pyqs} 
            onUpdateCourses={async (updated) => {
              for (const original of courses) {
                const upd = updated.find(c => c.id === original.id);
                if (upd && upd.fee !== original.fee) {
                  try {
                    await setDoc(doc(db, 'courses', upd.id), upd);
                  } catch (e) {
                    handleFirestoreError(e, OperationType.WRITE, `courses/${upd.id}`);
                  }
                }
              }
            }} 
            onAddNote={async (newNote) => {
              try {
                await setDoc(doc(db, 'notes', newNote.id), newNote);
              } catch (e) {
                handleFirestoreError(e, OperationType.WRITE, `notes/${newNote.id}`);
              }
            }}
            onAddVideo={async (newVideo) => {
              try {
                await setDoc(doc(db, 'videos', newVideo.id), newVideo);
              } catch (e) {
                handleFirestoreError(e, OperationType.WRITE, `videos/${newVideo.id}`);
              }
            }}
            onAddPYQ={async (newPYQ) => {
              try {
                await setDoc(doc(db, 'pyqs', newPYQ.id), newPYQ);
              } catch (e) {
                handleFirestoreError(e, OperationType.WRITE, `pyqs/${newPYQ.id}`);
              }
            }}
          />
        )}

      </main>

      {/* Footer Branding */}
      <footer className="bg-slate-950 py-10 border-t border-slate-900 select-none text-center text-xs text-slate-505 text-slate-500 [content-visibility:auto]">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center font-bold text-slate-400">
            <span className="font-sans text-sm tracking-widest uppercase">QUANTREX ACADEMY</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] leading-relaxed text-slate-500">
            Advanced Mathematics Pedagogy for Potential IIT JEE Aspirants. Authorized DRM browser security active. Standard Copying and print capabilities are prevented dynamically.
          </p>
          <div className="pt-4 text-[10px] font-mono text-slate-600">
            © {new Date().getFullYear()} Quantrex Systems. All Rights Reserved. Regional centers in New Delhi, Kanpur, and Kharagpur.
          </div>
        </div>
      </footer>

      {/* Global Modals overlay wrapper */}
      
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      <PurchaseModal 
        course={selectedCourse} 
        isOpen={purchaseOpen} 
        onClose={() => {
          setPurchaseOpen(false);
          setSelectedCourse(null);
        }} 
        onPaymentSuccess={handleEnrollmentGranted} 
      />

      {viewerOpen && (
        <SecureViewer 
          note={activeSecureNote} 
          video={activeSecureVideo} 
          currentUserEmail={currentUser?.email || "guest@quantrex.edu"} 
          onClose={() => {
            setViewerOpen(false);
            setActiveSecureNote(undefined);
            setActiveSecureVideo(undefined);
          }} 
        />
      )}

    </div>
  );
}
