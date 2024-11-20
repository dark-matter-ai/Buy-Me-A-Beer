// src/app/firebase/auth.js
import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { createUserDocument } from "./store";

const googleProvider = new GoogleAuthProvider();

export const validatePassword = (password) => {
  const minLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);

  return minLength && hasNumber && hasSpecial && hasUpper && hasLower;
};

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);

    // Create user document in Firestore
    const { userid, error: storeError } = await createUserDocument(
      email,
      displayName
    );

    if (storeError) {
      throw new Error(storeError);
    }

    return { user: userCredential.user, userid, error: null };
  } catch (error) {
    return { user: null, userid: null, error: error.message };
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const resendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
