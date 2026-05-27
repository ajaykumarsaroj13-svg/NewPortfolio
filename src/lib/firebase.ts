/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// We import initial data to hydrate our local database!
import { INITIAL_COURSES, INITIAL_NOTES, INITIAL_VIDEOS, INITIAL_PYQS } from '../data';

// Keep OperationType enum and type schemas the same so other files compile perfectly!
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.error('Firestore Local Cache Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Ensure local storage contains hydrated default values if empty
const initCollection = (key: string, defaultData: any[]) => {
  if (!localStorage.getItem(`quantrex_db_${key}`)) {
    localStorage.setItem(`quantrex_db_${key}`, JSON.stringify(defaultData));
  }
};

// Hydrate on load
initCollection('courses', INITIAL_COURSES);
initCollection('notes', INITIAL_NOTES);
initCollection('videos', INITIAL_VIDEOS);
initCollection('pyqs', INITIAL_PYQS);
initCollection('users', []);

// Memory store for subscription listeners
type Listener = (snapshot: any) => void;
const listeners = new Map<string, Set<Listener>>();

function triggerListeners(collectionName: string) {
  const colListeners = listeners.get(collectionName);
  if (colListeners) {
    const data = getLocalCollection(collectionName);
    const mockSnap = {
      empty: data.length === 0,
      forEach: (cb: (doc: any) => void) => {
        data.forEach((item: any) => {
          cb({
            data: () => item,
            id: item.id
          });
        });
      }
    };
    colListeners.forEach(listener => {
      try {
        listener(mockSnap);
      } catch (err) {
        console.error("Local snapshot listener execution error:", err);
      }
    });
  }
}

function getLocalCollection(key: string): any[] {
  try {
    const raw = localStorage.getItem(`quantrex_db_${key}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalCollection(key: string, data: any[]) {
  localStorage.setItem(`quantrex_db_${key}`, JSON.stringify(data));
  triggerListeners(key);
}

// Mock Firestore references
export interface MockDocRef {
  path: string;
  collectionName: string;
  id: string;
}

export interface MockColRef {
  collectionName: string;
}

export function collection(db: any, path: string): MockColRef {
  return { collectionName: path };
}

export function doc(db: any, val1: string | MockColRef, val2?: string): MockDocRef {
  if (typeof val1 === 'object' && val1 !== null) {
    return {
      path: `${val1.collectionName}/${val2}`,
      collectionName: val1.collectionName,
      id: val2 || ''
    };
  }
  return {
    path: `${val1}/${val2}`,
    collectionName: val1 as string,
    id: val2 || ''
  };
}

export async function getDoc(docRef: MockDocRef) {
  const collectionData = getLocalCollection(docRef.collectionName);
  const found = collectionData.find((item: any) => item.id === docRef.id);
  return {
    exists: () => !!found,
    data: () => found || null,
    id: docRef.id
  };
}

export async function setDoc(docRef: MockDocRef, data: any, options?: { merge?: boolean }) {
  const collectionData = getLocalCollection(docRef.collectionName);
  const idx = collectionData.findIndex((item: any) => item.id === docRef.id);
  
  let updatedItem = { ...data };
  if (idx > -1) {
    if (options?.merge) {
      updatedItem = { ...collectionData[idx], ...data };
    } else {
      updatedItem = { ...data };
    }
    collectionData[idx] = updatedItem;
  } else {
    updatedItem.id = docRef.id;
    collectionData.push(updatedItem);
  }
  
  setLocalCollection(docRef.collectionName, collectionData);
}

export function onSnapshot(
  colRef: MockColRef,
  callback: (snap: any) => void,
  errorCallback?: (err: any) => void
) {
  const set = listeners.get(colRef.collectionName) || new Set<Listener>();
  set.add(callback);
  listeners.set(colRef.collectionName, set);

  // Trigger once immediately
  const data = getLocalCollection(colRef.collectionName);
  const mockSnap = {
    empty: data.length === 0,
    forEach: (cb: (doc: any) => void) => {
      data.forEach((item: any) => {
        cb({
          data: () => item,
          id: item.id
        });
      });
    }
  };
  
  setTimeout(() => {
    try {
      callback(mockSnap);
    } catch (e) {
      if (errorCallback) errorCallback(e);
    }
  }, 0);

  return () => {
    const list = listeners.get(colRef.collectionName);
    if (list) {
      list.delete(callback);
    }
  };
}

// User active state persistence helper
const getStoredActiveUserId = () => localStorage.getItem('quantrex_active_user_id');
const setStoredActiveUserId = (id: string | null) => {
  if (id) {
    localStorage.setItem('quantrex_active_user_id', id);
  } else {
    localStorage.removeItem('quantrex_active_user_id');
  }
  triggerAuthListeners();
};

const authListeners = new Set<(user: any) => void>();
function triggerAuthListeners() {
  const uid = getStoredActiveUserId();
  if (uid) {
    const users = getLocalCollection('users');
    const u = users.find((item: any) => item.id === uid);
    if (u) {
      auth.currentUser = {
        uid: u.id,
        email: u.email,
        displayName: u.name,
        emailVerified: true,
        isAnonymous: false,
        tenantId: null,
        providerData: [],
        signOut: async () => {
          setStoredActiveUserId(null);
        }
      };
    } else {
      auth.currentUser = null;
    }
  } else {
    auth.currentUser = null;
  }
  authListeners.forEach(cb => cb(auth.currentUser));
}

// Mock Firebase Authentication
export const auth = {
  currentUser: null as any,
  signOut: async () => {
    setStoredActiveUserId(null);
  }
};

export function onAuthStateChanged(authInstance: any, callback: (user: any) => void) {
  authListeners.add(callback);
  // Fire immediately
  triggerAuthListeners();
  return () => {
    authListeners.delete(callback);
  };
}

export async function signInWithEmailAndPassword(authInstance: any, email: string, pass: string) {
  const users = getLocalCollection('users');
  let user = users.find((item: any) => item.email?.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    if (email === 'admin@quantrex.edu') {
      user = {
        id: 'admin-uid',
        email: 'admin@quantrex.edu',
        name: 'Prof. Ajay Kumar (Admin)',
        role: 'admin',
        purchasedCourses: [],
        testHistory: []
      };
      users.push(user);
      setLocalCollection('users', users);
    } else if (email === 'aspirant@quantrex.edu') {
      user = {
        id: 'student-uid',
        email: 'aspirant@quantrex.edu',
        name: 'Ajay Kumar Saroj',
        role: 'student',
        purchasedCourses: [],
        testHistory: []
      };
      users.push(user);
      setLocalCollection('users', users);
    } else {
      throw new Error("Invalid credentials. Please register or tap bypass standard route shortcuts.");
    }
  }

  setStoredActiveUserId(user.id);
  return { user: { uid: user.id, email: user.email, displayName: user.name } };
}

export async function createUserWithEmailAndPassword(authInstance: any, email: string, pass: string) {
  const users = getLocalCollection('users');
  const path = email.toLowerCase();
  if (users.some((item: any) => item.email?.toLowerCase() === path)) {
    throw new Error("User already enrolled under this email.");
  }
  
  const id = `user-${Math.random().toString(36).substr(2, 9)}`;
  const newUser = {
    id,
    email,
    name: email.split('@')[0].toUpperCase(),
    role: 'student',
    purchasedCourses: [],
    testHistory: []
  };

  users.push(newUser);
  setLocalCollection('users', users);
  setStoredActiveUserId(id);
  return { user: { uid: id, email: email, displayName: newUser.name } };
}

export async function updateProfile(userInstance: any, { displayName }: { displayName?: string }) {
  const uid = getStoredActiveUserId();
  if (uid) {
    const users = getLocalCollection('users');
    const idx = users.findIndex((item: any) => item.id === uid);
    if (idx > -1) {
      if (displayName) users[idx].name = displayName;
      setLocalCollection('users', users);
      triggerAuthListeners();
    }
  }
}

// Connection test mimic
console.log("Quantrex Secure DRM Cloud Connection: local offline cache active.");
export const db = {};
