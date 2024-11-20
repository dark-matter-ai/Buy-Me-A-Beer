// src/app/profile/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { getUserData } from "../firebase/store";

export default function ProfileRedirect() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const redirectToUserProfile = async () => {
      if (user?.email) {
        // Search for user data in Firestore based on email
        // You'll need to implement this function
        const { userData, error } = await getUserData(user.email);
        if (userData?.userid) {
          router.push(`/profile/${userData.userid}`);
        }
      }
    };

    redirectToUserProfile();
  }, [user, router]);

  return <div>Loading...</div>;
}
