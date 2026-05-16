"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { signinEmployer } from "@/lib/auth";

import AuthLayout from "@/components/AuthLayout";

export default function SigninPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /**
   * Handle signin
   */
  async function handleSignin(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const user =
        await signinEmployer({
          email,
          password,
        });

      // Refresh Firebase user
      await user.reload();

      const refreshedUser =
        user.auth.currentUser;

      // Email not verified
      if (
        !refreshedUser?.emailVerified
      ) {

        router.push(
          "/verify-email"
        );

        return;
      }

      // Success
      router.push(
        "/dashboard"
      );

    } catch (err) {

      console.error(err);

      // Better Firebase errors
      switch (err.code) {

        case "auth/invalid-credential":
          setError(
            "Invalid email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        default:
          setError(
            err.message ||
            "Signin failed."
          );
      }

    } finally {

      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage your job listings and opportunities."
    >

      {/* Error Message */}
      {error && (

        <div className="mb-6 rounded-2xl border border-red-200 bg-red-100 px-5 py-4 text-red-700">

          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSignin}
        className="space-y-6"
      >

        {/* Email */}
        <div>

          <label className="mb-3 block font-semibold">

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

        {/* Password */}
        <div>

          <label className="mb-3 block font-semibold">

            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="input-modern"
            placeholder="••••••••"
          />

          {/* Forgot Password */}
          <div className="mt-3 flex justify-end">

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-70"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        {/* Signup Link */}
        <p className="text-center text-slate-600">

          Don’t have an account?{" "}

          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create One
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}