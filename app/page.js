"use client";

import { auth } from "@/lib/firebase";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        JobFuse
      </h1>

      <p className="text-gray-600">
        Firebase Connected Successfully
      </p>

      <p className="text-sm text-gray-500">
        Auth Ready: {auth ? "YES" : "NO"}
      </p>
    </main>
  );
}