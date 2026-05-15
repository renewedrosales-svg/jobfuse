"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

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

  async function handleSignin(e) {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      // Sign in directly
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      // Reload auth state
      await user.reload();

      // IMPORTANT:
      // Get fresh Firebase user
      const currentUser =
        auth.currentUser;

      console.log(
        "CURRENT USER:",
        currentUser
      );

      // Email not verified
      if (
        !currentUser?.emailVerified
      ) {

        router.push("/verify-email");

        return;
      }

      // Success
      router.push("/dashboard");

    } catch (err) {

      console.error(
        "SIGNIN ERROR:",
        err
      );

      setError(
        err.message ||
        "Failed to sign in"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Employer Sign In
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSignin}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}