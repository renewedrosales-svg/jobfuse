"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

import AuthLayout
from "@/components/AuthLayout";

export default function ForgotPasswordPage() {

  const [email,
    setEmail] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [success,
    setSuccess] =
    useState("");

  const [error,
    setError] =
    useState("");

  /**
   * Send reset email
   */
  async function handleReset(e) {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      setSuccess(
        "Password reset email sent successfully."
      );

      setEmail("");

    } catch (err) {

/*     console.error(err); */
        console.error(
          "Password Reset Error:",
          err.code,
          err.message
        );

      setError(
        err.message ||
        "Failed to send reset email."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email address and we'll send you a password reset link."
    >

      {/* Success */}
      {success && (

        <div className="bg-green-100 border border-green-200 text-green-700 rounded-2xl px-5 py-4 mb-6">

          {success}
        </div>
      )}

      {/* Error */}
      {error && (

        <div className="bg-red-100 border border-red-200 text-red-700 rounded-2xl px-5 py-4 mb-6">

          {error}
        </div>
      )}

      <form
        onSubmit={
          handleReset
        }
        className="space-y-6"
      >

        {/* Email */}
        <div>

          <label className="block font-semibold mb-3">

            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="input-modern"
            placeholder="you@example.com"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {/* Back */}
        <p className="text-center text-slate-600">

          Remember your password?{" "}

          <Link
            href="/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}