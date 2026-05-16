"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  auth,
} from "@/lib/firebase";

import {
  MailCheck,
} from "lucide-react";

import AuthLayout
from "@/components/AuthLayout";

export default function VerifyEmailPage() {

  const router =
    useRouter();

  const [checking,
    setChecking] =
    useState(false);

  /**
   * Check verification
   */
  async function checkVerification() {

    try {

      setChecking(true);

      const user =
        auth.currentUser;

      if (!user) {

        router.push(
          "/signin"
        );

        return;
      }

      await user.reload();

      if (
        user.emailVerified
      ) {

        router.push(
          "/dashboard"
        );
      }

    } catch (err) {

      console.error(err);

    } finally {

      setChecking(false);
    }
  }

  /**
   * Auto-check
   */
  useEffect(() => {

    const interval =
      setInterval(() => {

        checkVerification();

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Confirm your email address to activate your employer dashboard."
    >

      <div className="text-center">

        <div className="mx-auto h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-8">

          <MailCheck
            size={42}
            className="text-blue-600"
          />
        </div>

        <h2 className="text-3xl font-black mb-5">

          Verification Required
        </h2>

        <p className="text-slate-600 leading-relaxed mb-8">

          We sent a verification link to your email inbox. Please verify your account before accessing the employer dashboard.
        </p>

        <button
          onClick={
            checkVerification
          }
          disabled={checking}
          className="btn-primary w-full"
        >
          {checking
            ? "Checking..."
            : "I Have Verified My Email"}
        </button>
      </div>
    </AuthLayout>
  );
}