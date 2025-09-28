// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDXS1jLlzVJblfEGn0mpNpuvfM4t-Kj7o",
  authDomain: "uacc-uacc.firebaseapp.com",
  projectId: "uacc-uacc",
  storageBucket: "uacc-uacc.firebasestorage.app",
  messagingSenderId: "295187812275",
  appId: "1:295187812275:web:26b1f23f855fbae57445c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: null,
      profileCompleted: false,
      isGoogleUser: true,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      settings: {
        autoSummarize: true,
        biometricsEnabled: false
      }
    }, { merge: true });
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update last login time
    await updateDoc(doc(db, 'users', user.uid), {
      lastLoginAt: Date.now()
    });
    
    return user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email, password, firstName, lastName) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update the user's display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      photoURL: user.photoURL || null,
      phoneNumber: '',
      dateOfBirth: null,
      profileCompleted: false,
      isGoogleUser: false,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      lastPhotoUpdate: null,
      settings: {
        autoSummarize: true,
        biometricsEnabled: false
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await updateDoc(doc(db, 'users', uid), data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Subcollection functions
export const getCallTranscripts = async (uid) => {
  try {
    const transcriptsRef = collection(db, 'users', uid, 'call_transcripts');
    const snapshot = await getDocs(transcriptsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting call transcripts:', error);
    return [];
  }
};

export const getEvents = async (uid) => {
  try {
    const eventsRef = collection(db, 'users', uid, 'events');
    const snapshot = await getDocs(eventsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

export const getTasks = async (uid) => {
  try {
    const tasksRef = collection(db, 'users', uid, 'tasks');
    const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const getUserMetadata = async (uid) => {
  try {
    const metadataRef = collection(db, 'users', uid, 'user_metadata');
    const snapshot = await getDocs(metadataRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user metadata:', error);
    return [];
  }
};

export const getNotifications = async (uid) => {
  try {
    const notificationsRef = collection(db, 'users', uid, 'notifications');
    const q = query(notificationsRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default app;