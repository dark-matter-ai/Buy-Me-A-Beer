"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { getUserDataByEmail } from "../firebase/store";
import EmailVerificationNotice from "./EmailVerificationNotice";

export default function ProtectedRoute({
  children,
  requireVerification = true,
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      if (!user) {
        router.push("/login");
      } else {
        // Get user's profile page
        const { userData } = await getUserDataByEmail(user.email);
        if (userData?.userid) {
          router.push(`/profile/${userData.userid}`);
        }
      }
    };

    redirectUser();
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      {children}
      {requireVerification && <EmailVerificationNotice user={user} />}
    </>
  );
}
