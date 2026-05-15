"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function VerifyEmailPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [userEmail, setUserEmail] =
    useState("");

  useEffect(() => {

    // Listen for auth state
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {

          try {

            // No logged in user
            if (!currentUser) {

              router.push("/signin");

              return;
            }

            // Save email
            setUserEmail(currentUser.email);

            // Refresh Firebase user
            await currentUser.reload();

            // Get updated user
            const updatedUser =
              auth.currentUser;

            // Already verified
            if (
              updatedUser?.emailVerified
            ) {

              router.push("/dashboard");

              return;
            }

          } catch (error) {

            console.error(
              "Verification Error:",
              error
            );

          } finally {

            setLoading(false);
          }
        }
      );

    return () => unsubscribe();

  }, [router]);

  /**
   * Resend verification email
   */
  async function handleResendEmail() {

    try {

      setSending(true);
      setMessage("");

      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        setMessage(
          "No authenticated user found."
        );

        return;
      }

      await sendEmailVerification(
        currentUser
      );

      setMessage(
        "Verification email resent successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to resend email."
      );

    } finally {

      setSending(false);
    }
  }

  /**
   * Manual refresh button
   */
  async function handleRefreshStatus() {

    try {

      setLoading(true);

      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        router.push("/signin");
        return;
      }

      // Refresh Firebase state
      await currentUser.reload();

      // Verified?
      if (currentUser.emailVerified) {

        router.push("/dashboard");

      } else {

        setMessage(
          "Email not verified yet."
        );
      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to refresh verification status."
      );

    } finally {

      setLoading(false);
    }
  }

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-lg">
          Checking verification status...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-100">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8 text-center">

        <h1 className="text-4xl font-bold mb-4">
          Verify Your Email
        </h1>

        <p className="text-gray-600 text-lg">
          A verification email was sent to:
        </p>

        <p className="font-semibold mt-2 break-all">
          {userEmail}
        </p>

        <p className="text-gray-500 mt-4">
          Please verify your email before accessing the employer dashboard.
        </p>

        {/* Success / Error Message */}
        {message && (
          <div className="mt-6 bg-gray-100 text-gray-700 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4">

          {/* Refresh Status */}
          <button
            onClick={handleRefreshStatus}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            I Have Verified My Email
          </button>

          {/* Resend Email */}
          <button
            onClick={handleResendEmail}
            disabled={sending}
            className="w-full border border-black py-3 rounded-lg hover:bg-gray-100 transition"
          >
            {sending
              ? "Sending..."
              : "Resend Verification Email"}
          </button>
        </div>
      </div>
    </main>
  );
}