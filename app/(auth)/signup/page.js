"use client";

import { useState } from "react";
import { signupEmployer } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [companyName, setCompanyName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signupEmployer({
        companyName,
        email,
        password,
      });

      // Force navigation
      router.replace("/verify-email");

    } catch (err) {
      console.error(err);

      setError(
        err.message || "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Employer Signup
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >
          {/* Company */}
          <div>
            <label className="block mb-1 font-medium">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="Acme Inc"
            />
          </div>

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
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="you@example.com"
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
              minLength={6}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Creating Account..."
              : "Create Employer Account"}
          </button>
        </form>
      </div>
    </main>
  );
}