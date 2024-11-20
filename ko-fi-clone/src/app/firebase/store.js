// src/app/firebase/store.js
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// Generate a unique userid
export const generateUserId = (name) => {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${normalizedName}-${randomString}`;
};

// Create or update user document in Firestore
export const createUserDocument = async (email, displayName) => {
  try {
    const userid = generateUserId(displayName);
    const userRef = doc(db, "users", userid);

    await setDoc(userRef, {
      userid,
      name: displayName,
      email,
      createdAt: new Date().toISOString(),
    });

    return { userid, error: null };
  } catch (error) {
    console.error("Error creating user document:", error);
    return { userid: null, error: error.message };
  }
};

// Fetch user data from Firestore by userid
export const getUserData = async (userid) => {
  try {
    const userRef = doc(db, "users", userid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { userData: userSnap.data(), error: null };
    } else {
      return { userData: null, error: "User not found" };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { userData: null, error: error.message };
  }
};

// Fetch user data from Firestore by email
export const getUserDataByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { userData, error: null };
    }

    return { userData: null, error: "User not found" };
  } catch (error) {
    console.error("Error fetching user data by email:", error);
    return { userData: null, error: error.message };
  }
};
