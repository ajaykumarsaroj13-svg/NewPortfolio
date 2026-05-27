/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ShieldAlert, CheckCircle, X } from 'lucide-react';
import { UserRole } from '../types';

// Import Firebase Authentication and doc storage controls
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, name: string, role: UserRole) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all standard credentials.');
      return;
    }

    if (isSignUp && !name) {
      setError('Please provide your legal name for student enrollment.');
      return;
    }

    if (isSignUp) {
      try {
        setSuccess('Authorizing with secure DRM cloud...');
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = credentials.user;
        
        // Update user display name
        await updateProfile(firebaseUser, { displayName: name });

        // Save metadata fields into users col
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: name,
          role: selectedRole,
          purchasedCourses: [],
          testHistory: []
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);

        setSuccess('Account provisioned successfully under Quantrex Board! Logging in...');
        setTimeout(() => {
          onLoginSuccess(userData.email, userData.name, userData.role);
          onClose();
          // Reset
          setEmail('');
          setPassword('');
          setName('');
          setIsSignUp(false);
          setSuccess('');
        }, 1200);
      } catch (err: any) {
        setError(err.message || String(err));
        setSuccess('');
      }
    } else {
      try {
        setSuccess('Authenticating with Cloud directory...');
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = credentials.user;

        // Retrieve extra metadata from Firestore to verify correct custom parameters
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        let finalRole: UserRole = 'student';
        let finalName = firebaseUser.displayName || name || email.split('@')[0].toUpperCase();

        if (userSnap.exists()) {
          const uData = userSnap.data();
          finalRole = uData.role || 'student';
          finalName = uData.name || finalName;
        } else {
          // Fallback create user profile document
          const isLocalAdmin = email.toLowerCase().includes('admin') || email === 'ajaykumarsaroj13@gmail.com';
          finalRole = isLocalAdmin ? 'admin' : 'student';
          const newDoc = {
            id: firebaseUser.uid,
            email: email,
            name: finalName,
            role: finalRole,
            purchasedCourses: [],
            testHistory: []
          };
          await setDoc(userRef, newDoc);
        }

        setSuccess(`Clean clearance unlocked. Welcome ${finalName}!`);
        setTimeout(() => {
          onLoginSuccess(email, finalName, finalRole);
          onClose();
          setEmail('');
          setPassword('');
          setSuccess('');
        }, 1000);
      } catch (err: any) {
        setError(err.message || String(err));
        setSuccess('');
      }
    }
  };

  const handleShortcutAdmin = async () => {
    const emailStr = 'admin@quantrex.edu';
    const passStr = 'admin123';
    const nameStr = 'Prof. Ajay Kumar (Admin)';
    const roleStr: UserRole = 'admin';

    setEmail(emailStr);
    setPassword(passStr);
    setName(nameStr);
    setSelectedRole(roleStr);
    setIsSignUp(false);

    try {
      setSuccess('Bypassing standard route via faculty terminal...');
      await signInWithEmailAndPassword(auth, emailStr, passStr);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || String(err).includes('notfound') || String(err).includes('invalid')) {
        // Silently register the bypass profile on the fly
        try {
          const credentials = await createUserWithEmailAndPassword(auth, emailStr, passStr);
          await updateProfile(credentials.user, { displayName: nameStr });
          const userDoc = {
            id: credentials.user.uid,
            email: emailStr,
            name: nameStr,
            role: roleStr,
            purchasedCourses: [],
            testHistory: []
          };
          await setDoc(doc(db, 'users', credentials.user.uid), userDoc);
        } catch (signupErr: any) {
          setError(signupErr.message || String(signupErr));
        }
      } else {
        setError(err.message || String(err));
      }
    }
  };

  const handleShortcutStudent = async () => {
    const emailStr = 'aspirant@quantrex.edu';
    const passStr = 'student123';
    const nameStr = 'Ajay Kumar Saroj';
    const roleStr: UserRole = 'student';

    setEmail(emailStr);
    setPassword(passStr);
    setName(nameStr);
    setSelectedRole(roleStr);
    setIsSignUp(false);

    try {
      setSuccess('Bypassing standard route via student terminal...');
      await signInWithEmailAndPassword(auth, emailStr, passStr);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || String(err).includes('notfound') || String(err).includes('invalid')) {
        try {
          const credentials = await createUserWithEmailAndPassword(auth, emailStr, passStr);
          await updateProfile(credentials.user, { displayName: nameStr });
          const userDoc = {
            id: credentials.user.uid,
            email: emailStr,
            name: nameStr,
            role: roleStr,
            purchasedCourses: [],
            testHistory: []
          };
          await setDoc(doc(db, 'users', credentials.user.uid), userDoc);
        } catch (signupErr: any) {
          setError(signupErr.message || String(signupErr));
        }
      } else {
        setError(err.message || String(err));
      }
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div id="auth-modal-content" className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-slate-805 [content-visibility:auto]">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              {isSignUp ? 'Register Enrollment' : 'Quantrex Portal Access'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">IIT-JEE Mathematics System Gateway</p>
          </div>
          <button 
            id="close-auth-modal" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 duration-150 cursor-pointer p-1 rounded hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-400 rounded text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 animate-bounce" />
              <span>{success}</span>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Full Name (Student)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  id="auth-name-input"
                  type="text"
                  placeholder="e.g. Ajay Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded px-3 py-2 pl-10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-650"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="auth-email-input"
                type="email"
                placeholder="aspirant@quantrex.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded px-3 py-2 pl-10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-650"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="auth-password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded px-3 py-2 pl-10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-650"
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Register Clearance
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`py-1.5 rounded text-xs font-semibold cursor-pointer border ${selectedRole === 'student' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Student Aspirant
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-1.5 rounded text-xs font-semibold cursor-pointer border ${selectedRole === 'admin' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Faculty Admin
                </button>
              </div>
            </div>
          )}

          <button
            id="auth-submit-button"
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 active:from-cyan-700 active:to-indigo-700 font-semibold py-2.5 rounded text-xs text-slate-100 transition-all cursor-pointer shadow-md"
          >
            {isSignUp ? 'Enroll New Account' : 'Verify & Sign In'}
          </button>
        </form>

        {/* Separator / Sandbox helper credentials */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{isSignUp ? 'Already enrolled?' : 'First time?'}</span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-cyan-400 hover:text-cyan-300 duration-150 font-semibold cursor-pointer"
            >
              {isSignUp ? 'Log in with existing ID' : 'Create new enrollment'}
            </button>
          </div>

          <div className="bg-slate-900 p-2.5 rounded border border-slate-805 space-y-2 select-none">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              💻 Demo Direct Entry (Save Time):
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleShortcutStudent}
                className="flex-1 py-1 px-2 text-[10px] font-medium bg-slate-950 hover:bg-slate-800 hover:border-slate-700 border border-slate-805 text-slate-300 hover:text-slate-200 rounded text-center cursor-pointer"
              >
                🎓 Student Bypass
              </button>
              <button
                type="button"
                onClick={handleShortcutAdmin}
                className="flex-1 py-1 px-2 text-[10px] font-medium bg-slate-950 hover:bg-slate-800 hover:border-slate-700 border border-slate-805 text-slate-300 hover:text-slate-200 rounded text-center cursor-pointer"
              >
                🛠️ Admin Bypass
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
