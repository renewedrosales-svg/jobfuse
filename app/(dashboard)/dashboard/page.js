"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          console.log(
            "AUTH USER:",
            currentUser
          );

          // No user
          if (!currentUser) {

            router.push("/signin");

            return;
          }

          // Not verified
          if (
            !currentUser.emailVerified
          ) {

            router.push("/verify-email");

            return;
          }

          // Success
          setUser(currentUser);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [router]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <p>
          Loading dashboard...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">

      <h1 className="text-4xl font-bold">
        Employer Dashboard
      </h1>

      <p className="mt-4">
        Logged in as:
      </p>

      <p className="font-semibold">
        {user?.email}
      </p>

      <div className="mt-8">

        <a
          href="/dashboard/post"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Post New Job
        </a>

      </div>
    </main>
  );
}