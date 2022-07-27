import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  Firestore,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkZIZgnOzWkTxQLXsToJ8HtisGTGInqeU",
  authDomain: "clothing-website-reactjs.firebaseapp.com",
  projectId: "clothing-website-reactjs",
  storageBucket: "clothing-website-reactjs.appspot.com",
  messagingSenderId: "986989616581",
  appId: "1:986989616581:web:11179a7b39e628f712bfac",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const db = getFirestore();
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const createUserDocumentFromAuth = async (userAuth,additionalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = ()=> signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback)