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
import { createUserDocument, getUserDataByEmail } from "./store";

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

    // Send verification email immediately after creating the account
    await sendEmailVerification(userCredential.user, {
      url: window.location.origin + "/login", // Redirect URL after verification
      handleCodeInApp: true,
    });

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
    const user = result.user;

    // Google accounts are already verified, but we can double-check
    if (!user.emailVerified) {
      throw new Error("Email verification required");
    }

    // Check if user exists in Firestore
    const { userData } = await getUserDataByEmail(user.email);

    if (!userData) {
      // Create new user document if doesn't exist
      const { userid, error: storeError } = await createUserDocument(
        user.email,
        user.displayName || "User"
      );

      if (storeError) throw new Error(storeError);
      return { user, userid, error: null };
    }

    return { user, userid: userData.userid, error: null };
  } catch (error) {
    return { user: null, userid: null, error: error.message };
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
